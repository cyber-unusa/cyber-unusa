import express from "express";
import {
  addKegiatan,
  deleteKegiatan,
  getAllKegiatan,
} from "../controllers/kegiatanController.js";
import upload from "../config/uploud.js";

const kegiatanRouter = express.Router();

kegiatanRouter.post("/add", upload.single("image"), addKegiatan);
kegiatanRouter.delete("/delete/:id", deleteKegiatan);
kegiatanRouter.get("/get", getAllKegiatan);

export default kegiatanRouter;
