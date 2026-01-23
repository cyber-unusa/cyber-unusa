import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";

export const getUserData = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await userModel.findById(userId);

    if (!user) {
      return res.json({
        success: false,
        message: "User nggak ada broo",
      });
    }

    res.json({
      success: true,
      userData: {
        name: user.name,
        email: user.email,
        isAccountVerified: user.isAccountVerified,
        role: user.role,
        _id: user._id,
      },
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({}).select("-password");
    return res.json({ success: true, users });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id)
      return res.json({ success: false, message: "Id User tidak ditemukan" });

    // Mencegah admin menghapus dirinya sendiri (Opsional tapi disarankan)
    if (id === req.userId) {
      return res.json({
        success: false,
        message: "Jangan hapus akun sendiri bro!",
      });
    }

    await userModel.findByIdAndDelete(id);

    return res.json({ success: true, message: "User berhasil dihapus" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id, name, email, password, isAccountVerified } = req.body;

    if (!id)
      return res.json({ success: false, message: "Id User tidak ditemukan" });

    const user = await userModel.findById(id);

    if (!user)
      return res.json({ success: false, message: "User tidak ditemukan" });

    if (name) user.name = name;
    if (email) user.email = email;

    //! Update Password hanya jika diisi
    if (password && password.length > 0) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    // Update Status Verifikasi (Boolean)
    if (typeof isAccountVerified !== "undefined") {
      user.isAccountVerified = isAccountVerified;
    }

    await user.save();

    return res.json({ success: true, message: "Data User berhasil diupdate" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
