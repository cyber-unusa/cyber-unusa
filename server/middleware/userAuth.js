import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Tidak ada akses. Silakan login kembali",
    });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

    if (tokenDecode.id) {
      req.userId = tokenDecode.id;
      next();
    } else {
      return res.status(401).json({
        success: false,
        message: "Tidak ada akses. Silakan login kembali",
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

export default userAuth;
