import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
// import mongoSanitize from "express-mongo-sanitize"; //! tidak mendukung express v5.1.0

import connectDB from "./config/mongodb.js";
import authRoter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import dokumenRouter from "./routes/dokumenterRoutes.js";
import kegiatanRouter from "./routes/kegiatanRoutes.js";
import productRouter from "./routes/productRoutes.js";
import attendanceRouter from "./routes/attendanceRoutes.js";
import memberRouter from "./routes/memberRoutes.js";
import aiRouter from "./routes/aiRoutes.js";
import errorHandler from "./middleware/errorHandler.js";

import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = process.env.PORT || 4000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

connectDB();

const allowedOrigins = [
  // "http://localhost:3000", //! untuk dev
  // "https://cyber-unusa.netlify.app", //? untuk deploy
  process.env.WEB_URL,
];

//? Security Point
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(helmet());
// app.use(mongoSanitize());

//! Batasi 100 request per 15 menit dari IP yang sama
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: "Terlalu banyak request, coba lagi nanti.",
  },
});

app.use("/api", limiter);

//* API Endpoints
app.get("/", (req, res) =>
  res.send({
    activeStatus: true,
    error: false,
  }),
);

app.use("/api/auth", authRoter);
app.use("/api/user", userRouter);
app.use("/api/dokumenter", dokumenRouter);
app.use("/api/kegiatan", kegiatanRouter);
app.use("/api/product", productRouter);
app.use("/api/member", memberRouter);
app.use("/api/attendance", attendanceRouter);
app.use("/api/ai", aiRouter);

app.use(errorHandler);

if (process.env.NODE_ENV !== "production") {
  app.listen(port, () => console.log(`Server Started on PORT: ${port}`));
}

export default app;
