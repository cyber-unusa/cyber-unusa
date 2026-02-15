import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const adminAuth = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Tidak ada akses. Silakan login kembali.",
    });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    if (tokenDecode.id) {
      const user = await userModel.findById(tokenDecode.id);

      if (!user || user.role !== "admin") {
        return res.status(403).json({
          success: false,
          message: "Akses ditolak! Area ini khusus untuk Admin broo.",
        });
      }

      req.userId = tokenDecode.id;
      next();
    } else {
      return res.status(401).json({
        success: false,
        message: "Token tidak valid. Silakan login kembali.",
      });
    }
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Sesi login telah habis. Silakan login kembali.",
      });
    }

    //? Jika token diubah secara ilegal atau error lainnya (403 Forbidden)
    return res.status(403).json({
      success: false,
      message: "Autentikasi gagal: " + error.message,
    });
  }
};

export default adminAuth;
