import express from "express";
import userAuth from "../middleware/userAuth.js";
import adminAuth from "../middleware/adminAuth.js";
import {
  deleteUser,
  getAllUsers,
  getUserData,
  updateUser,
} from "../controllers/userController.js";

const userRouter = express.Router();

//? Route user
userRouter.get("/data", userAuth, getUserData);
// userRouter.put("/change-password", userAuth, changePassword);

//? Route admin
userRouter.get("/all-users", adminAuth, getAllUsers);
userRouter.post("/delete-user", adminAuth, deleteUser);
userRouter.put("/update-user", adminAuth, updateUser);

export default userRouter;
