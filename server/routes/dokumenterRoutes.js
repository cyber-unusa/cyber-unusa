import express from "express";
import {
  addDokumenter,
  deleteDokumenter,
  getAllDokumenter,
  updateDokumenter,
} from "../controllers/dokumenterController.js";
import upload from "../config/uploud.js";

const dokumenterRouter = express.Router();

dokumenterRouter.post("/add", upload.single("image"), addDokumenter);
dokumenterRouter.put("/update/:id", upload.single("image"), updateDokumenter);
dokumenterRouter.delete("/delete/:id", deleteDokumenter);
dokumenterRouter.get("/get", getAllDokumenter);

export default dokumenterRouter;
