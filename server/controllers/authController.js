import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import transporter from "../config/nodemailer.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.json({ success: false, message: "Input kurang Lengkap Brooo" });
  }

  try {
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.json({
        success: false,
        message: "User udah Kedaftar Brooo!",
      });
    }

    //* enkripsi password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new userModel({ name, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    //* Sending Welcome Email
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Selamat Datang di Cyber",
      text: `Selamat Datang ${name} di Website Kami, akun kamu terdaftar dengan email id: ${email}`, // plain‑text body
      messageId: `<${Date.now()}@${process.env.SENDER_EMAIL}>`, // properti messageId for debug
    };

    await transporter.sendMail(mailOptions);
    console.log("Message sent:", mailOptions.messageId);

    return res.json({ success: true, message: `Selamat Datang ${user.name}` });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      success: false,
      message: "Email dan Passwordnya wajib di isi broo",
    });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "Emailnya salah Broo",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({
        success: false,
        message: "Passwordnya salah Broo",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ success: true, message: `Selamat Datang ${user.name}` });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ success: true, message: "Anda telah keluar" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

//* Pengiriman Kode Otp verifikasi Email
export const sendVerifyOtp = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await userModel.findById(userId);

    if (user.isAccountVerified) {
      return res.json({
        success: false,
        message: "Akunmu udah terverifikasi broo",
      });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));
    user.verifyOtp = otp;
    user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;

    await user.save();

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Kode Otp buat verify",
      text: `Halo ${user.name}, Kode Otpmu adalah: ${otp}. verifikasi segera yaah!`, // plain‑text body
      messageId: `<${Date.now()}@${process.env.SENDER_EMAIL}>`, // properti messageId for debug
    };

    await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: "Kode verifikasi Otp udah terkirim broo",
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  const userId = req.userId;
  const { otp } = req.body;

  if (!userId || !otp) {
    return res.json({
      success: false,
      message: "Input Kurang Lengkap Brooo",
    });
  }

  try {
    const user = await userModel.findById(userId);

    if (!user) {
      return res.json({ success: false, message: "User nggak ada broo" });
    }

    if (user.verifyOtp === "" || user.verifyOtp !== otp) {
      return res.json({ success: false, message: "Kode otpmu salah broo" });
    }

    if (user.verifyOtpExpireAt < Date.now()) {
      return res.json({ success: false, message: "Kode otpmu udah expired" });
    }

    user.isAccountVerified = true;
    user.verifyOtp = "";
    user.verifyOtpExpireAt = 0;

    await user.save();
    return res.json({
      success: true,
      message: "Emailmu udah terverifikasi broo",
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

//* Pengecekkan authentikasi user
export const isAuthenticated = async (req, res) => {
  try {
    return res.json({ success: true });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//* Pengiriman kode otp reset password
export const sendResetOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.json({ success: false, message: "Masukkin emailnya dulu broo" });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User nggak ada broo" });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));
    user.resetOtp = otp;
    user.resetOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;

    await user.save();

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Kode Otp buat Reset Password",
      text: `Halo ${user.name}, Kode Otpmu adalah: ${otp}. verifikasi segera yaah!`, // plain‑text body
      messageId: `<${Date.now()}@${process.env.SENDER_EMAIL}>`, // properti messageId for debug
    };

    await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: "Kode verifikasi Otp udah terkirim broo",
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

//* Reset user Password
export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (!email || !otp || !newPassword) {
    return res.json({ success: false, message: "Input Kurang Lengkap Brooo" });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User nggak ada broo" });
    }

    if (user.resetOtp === "" || user.resetOtp !== otp) {
      return res.json({ success: false, message: "Kode otpmu salah broo" });
    }

    if (user.resetOtpExpireAt < Date.now()) {
      return res.json({ success: false, message: "Kode otpmu udah expired" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.resetOtp = "";
    user.resetOtpExpireAt = 0;

    await user.save();

    return res.json({
      success: true,
      message: "Perubahan Password udah berhasil Broo",
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
