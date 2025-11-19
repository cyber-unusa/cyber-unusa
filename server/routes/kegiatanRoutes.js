import express from "express";
import {
  addKegiatan,
  deleteKegiatan,
  getAllKegiatan,
  updateKegiatan,
} from "../controllers/kegiatanController.js";
import upload from "../config/uploud.js";

const kegiatanRouter = express.Router();

kegiatanRouter.post("/add", upload.single("image"), addKegiatan);
kegiatanRouter.put("/update/:id", upload.single("image"), updateKegiatan);
kegiatanRouter.delete("/delete/:id", deleteKegiatan);
kegiatanRouter.get("/get", getAllKegiatan);

export default kegiatanRouter;
