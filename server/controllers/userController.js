import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import * as userService from "../services/userService.js";

export const getUserData = async (req, res) => {
  try {
    const userData = await userService.getUserData(req.userId);

    res.json({
      success: true,
      userData,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsersService();
    return res.json({ success: true, users });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id, name, email, password, isAccountVerified } = req.body;

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Id User tidak ditemukan" });
    }

    await userService.updateUserService(id, {
      name,
      email,
      password,
      isAccountVerified,
    });

    return res.json({ success: true, message: "Data User berhasil diupdate" });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.body;
    const requesterId = req.userId;

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Id User tidak ditemukan" });
    }

    await userService.deleteUserService(id, requesterId);

    return res.json({ success: true, message: "User berhasil dihapus" });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};
