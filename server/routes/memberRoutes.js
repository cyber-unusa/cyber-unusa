import express from "express";
import {
  addMember,
  deleteMember,
  getAllMembers,
  updateMember,
} from "../controllers/memberController.js";
import adminAuth from "../middleware/adminAuth.js";
import upload from "../config/uploud.js";

const memberRouter = express.Router();

memberRouter.post("/add", upload.single("image"), adminAuth, addMember);
memberRouter.put(
  "/update/:id",
  upload.single("image"),
  adminAuth,
  updateMember,
);
memberRouter.delete("/delete/:id", adminAuth, deleteMember);
memberRouter.get("/get", adminAuth, getAllMembers);

export default memberRouter;
