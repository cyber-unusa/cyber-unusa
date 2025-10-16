import express from "express";
import adminAuth from "../middleware/adminAuth.js";
import {
  addDokumenter,
  deleteDokumenter,
  getAllDokumenter,
} from "../controllers/dokumenterController.js";
import upload from "../config/uploud.js";

const dokumenterRouter = express.Router();

dokumenterRouter.post("/add", upload.single("image"), addDokumenter);
dokumenterRouter.post("/delete/:id", deleteDokumenter);
dokumenterRouter.get("/get", getAllDokumenter);

export default dokumenterRouter;
