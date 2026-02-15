import * as authService from "../services/authService.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Data tidak lengkap" });
  }

  try {
    const { token, user } = await authService.registerService({
      name,
      email,
      password,
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res
      .status(200)
      .json({ success: true, message: "Register Berhasil", user });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email dan Passwordnya wajib di isi broo",
    });
  }

  try {
    const result = await authService.loginService({ email, password });

    if (result.status === "UNVERIFIED") {
      return res.status(403).json({
        success: false,
        isVerified: false,
        userId: result.userId,
        message: result.message,
      });
    }

    const { token, user } = result;

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: `Selamat Datang ${user.name}`,
      user,
    });
  } catch (error) {
    const statusCode = error.message.includes("salah") ? 401 : 500;
    return res
      .status(statusCode)
      .json({ success: false, message: error.message });
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

    return res
      .status(200)
      .json({ success: true, message: "Anda telah keluar" });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const sendVerifyOtp = async (req, res) => {
  try {
    const userId = req.userId;

    const message = await authService.sendVerifyEmailOtpService(userId);

    res.status(200).json({
      success: true,
      message,
    });
  } catch (error) {
    console.error("Gagal kirim email:", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  const userId = req.userId || req.body.userId;
  const { otp } = req.body;

  if (!userId || !otp) {
    return res.status(400).json({
      success: false,
      message: "Input Kurang Lengkap Brooo",
    });
  }

  try {
    const { token, user } = await authService.verifyEmailService(userId, otp);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Email berhasil diverifikasi dan Anda telah login otomatis",
      user,
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

//* Pengecekkan authentikasi user
export const isAuthenticated = async (req, res) => {
  try {
    return res.status(200).json({ success: true });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//* Pengiriman kode otp reset password
export const sendResetOtp = async (req, res) => {
  const { email } = req.body;
  try {
    const message = await authService.sendResetOtpService(email);
    res.status(200).json({
      success: true,
      message,
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const verifyResetOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const message = await authService.verifyResetOtpService(email, otp);

    res.status(200).json({
      success: true,
      message,
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

//* Reset user Password
export const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const message = await authService.resetPasswordService(email, newPassword);

    return res.status(200).json({
      success: true,
      message,
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};
