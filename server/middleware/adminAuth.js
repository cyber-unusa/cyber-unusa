import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const adminAuth = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.json({
      success: false,
      message: "Not Authorized. Login again.",
    });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(tokenDecode.id);

    if (user && user.role === "admin") {
      req.userId = tokenDecode.id;
      next();
    } else {
      return res.json({
        success: false,
        message: "Not Authorized as Admin.",
      });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export default adminAuth;
