import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";

export const getUserData = async (userId) => {
  const user = await userModel.findById(userId);
  if (!user) throw new Error("User nggak ada broo");

  return {
    name: user.name,
    email: user.email,
    isAccountVerified: user.isAccountVerified,
    role: user.role,
    _id: user._id,
  };
};

export const getAllUsersService = async () => {
  return await userModel.find({}).select("-password");
};

export const updateUserService = async (id, data) => {
  const user = await userModel.findById(id);
  if (!user) throw new Error("User tidak ditemukan");

  //? Logic Update field
  if (data.name) user.name = data.name;
  if (data.email) user.email = data.email;

  //? Logic Update password
  if (data.password && data.password.trim().length > 0) {
    user.password = await bcrypt.hash(data.password, 10);
  }

  if (typeof data.isAccountVerified !== "undefined") {
    user.isAccountVerified = data.isAccountVerified;
  }

  return await user.save();
};

export const deleteUserService = async (id, requesterId) => {
  if (id === requesterId) throw new Error("Gak bisa hapus akun sendiri bro");

  const user = await userModel.findByIdAndDelete(id);
  if (!user) throw new Error("User tidak ditemukan");

  return user;
};
