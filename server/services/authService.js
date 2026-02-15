import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import transporter from "../config/nodemailer.js";
import {
  EMAIL_VERIFY_TEMPLATE,
  PASSWORD_RESET_TEMPLATE,
  WELCOME_TEMPLATE,
} from "../config/emailTemplate.js";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

export const registerService = async ({ name, email, password }) => {
  const existingUser = await userModel.findOne({ email });
  if (existingUser) throw new Error("Email sudah terdaftar");

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new userModel({ name, email, password: hashedPassword });
  await user.save();

  const token = generateToken(user._id);

  if (!user.isAccountVerified) {
    const isOtpInvalid = !user.verifyOtp || user.verifyOtpExpireAt < Date.now();

    if (isOtpInvalid) {
      await sendVerifyEmailOtpService(user._id);
    }
  }

  return { token, user: { _id: user._id, name: user.name, email: user.email } };
};

export const loginService = async ({ email, password }) => {
  const user = await userModel.findOne({ email });
  if (!user) throw new Error("Email tidak ditemukan");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Password salah");

  const token = generateToken(user._id);

  if (!user.isAccountVerified) {
    const isOtpInvalid = !user.verifyOtp || user.verifyOtpExpireAt < Date.now();

    if (isOtpInvalid) {
      await sendVerifyEmailOtpService(user._id);
    }

    return {
      status: "UNVERIFIED",
      userId: user._id,
      message: isOtpInvalid
        ? "Akun belum aktif. Kode OTP baru telah dikirim ke email Anda."
        : "Akun belum aktif. Silakan masukkan kode OTP yang telah dikirim.",
    };
  }

  return {
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  }; // Sesuaikan data user yg dikembalikan
};

//? Verify Email
export const sendVerifyEmailOtpService = async (userId) => {
  const user = await userModel.findById(userId);
  if (!user) throw new Error("User tidak ditemukan");
  if (user.isAccountVerified) throw new Error("Akun sudah terverifikasi");

  const otp = String(Math.floor(100000 + Math.random() * 900000));
  user.verifyOtp = otp;
  user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;
  await user.save();

  const mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: user.email,
    subject: "Verifikasi Akun Cyber Unusa",
    html: EMAIL_VERIFY_TEMPLATE(otp),
  };

  await transporter.sendMail(mailOptions);
  return "OTP Verifikasi terkirim ke Email anda";
};

export const verifyEmailService = async (userId, otp) => {
  if (!userId || !otp) throw new Error("Data tidak lengkap");
  const user = await userModel.findById(userId);

  if (!user) throw new Error("User tidak ditemukan");
  if (user.isAccountVerified) throw new Error("Akun sudah terverifikasi");

  if (user.verifyOtp !== otp || user.verifyOtp === "")
    throw new Error("OTP Salah");

  if (user.verifyOtpExpireAt < Date.now()) throw new Error("OTP Kadaluarsa");

  user.isAccountVerified = true;
  user.verifyOtp = "";
  user.verifyOtpExpireAt = 0;
  await user.save();

  const token = generateToken(user._id);

  const mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: user.email,
    subject: "Selamat Datang di Cyber Unusa",
    html: WELCOME_TEMPLATE(user.name),
  };
  try {
    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.error("Email welcome error (ignored):", err);
  }

  return {
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};

//? Reset Password
export const sendResetOtpService = async (email) => {
  const user = await userModel.findOne({ email });
  if (!user) throw new Error("Email tidak terdaftar");

  const otp = String(Math.floor(100000 + Math.random() * 900000));

  user.resetOtp = otp;
  user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000;
  await user.save();

  const mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: user.email,
    subject: "Reset Password - Cyber Unusa",
    html: PASSWORD_RESET_TEMPLATE(otp),
  };

  await transporter.sendMail(mailOptions);
  return "OTP Reset Password terkirim ke email Anda";
};

export const verifyResetOtpService = async (email, otp) => {
  if (!email || !otp) throw new Error("Email dan OTP wajib diisi");

  const user = await userModel.findOne({ email });
  if (!user) throw new Error("User tidak ditemukan");

  if (user.resetOtp === "" || user.resetOtp !== otp) {
    throw new Error("OTP Salah atau Tidak Valid");
  }

  if (user.resetOtpExpireAt < Date.now()) {
    throw new Error("OTP Kadaluarsa");
  }

  user.resetOtp = "";
  user.resetOtpExpireAt = 0;
  await user.save();

  return "OTP Valid, silakan masukkan password baru";
};

export const resetPasswordService = async (email, newPassword) => {
  if (!email || !newPassword) throw new Error("Data tidak lengkap");

  const user = await userModel.findOne({ email });
  if (!user) throw new Error("User tidak ditemukan");

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;

  await user.save();

  return "Password berhasil diperbarui. Silakan login.";
};
