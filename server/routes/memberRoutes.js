import express from "express";
import {
  addMember,
  deleteMember,
  getAllMembers,
} from "../controllers/memberController.js";
import adminAuth from "../middleware/adminAuth.js";

const memberRouter = express.Router();

memberRouter.post("/add", adminAuth, addMember);
memberRouter.delete("/delete/:id", adminAuth, deleteMember);
memberRouter.get("/get", adminAuth, getAllMembers);

export default memberRouter;
