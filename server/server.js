import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";

import connectDB from "./config/mongodb.js";
import authRoter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();
const port = process.env.PORT || 4000;
connectDB();

const allowedOrigins = [
  "http://localhost:5173",
  "https://server-cyber-unusa.vercel.app",
];

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));

//* API Endpoints
app.get("/", (req, res) =>
  res.send({
    activeStatus: true,
    error: false,
  })
);
app.use("/api/auth", authRoter);
app.use("/api/user", userRouter);

export default app;
