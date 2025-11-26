import express from "express";
import { getAiRespons } from "../controllers/aiController.js";
import { get } from "mongoose";

const aiRouter = express.Router();

aiRouter.post("/chat", getAiRespons);

export default aiRouter;
