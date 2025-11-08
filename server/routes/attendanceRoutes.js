import express from "express";
import {
  createAttendanceEvent,
  getAllAttendanceEvents,
  getAttendanceRecordsByEvent,
  updateAttendanceRecord,
  deleteAttendanceEvent,
} from "../controllers/attendanceController.js";
import adminAuth from "../middleware/adminAuth.js";

const attendanceRouter = express.Router();

//? Rute untuk Acara Absensi
attendanceRouter.post("/event/create", adminAuth, createAttendanceEvent);
attendanceRouter.get("/events/get", adminAuth, getAllAttendanceEvents);
attendanceRouter.delete(
  "/event/delete/:eventId",
  adminAuth,
  deleteAttendanceEvent
);

//? Rute untuk Record Absensi Spesifik
attendanceRouter.get(
  "/records/:eventId",
  adminAuth,
  getAttendanceRecordsByEvent
);
attendanceRouter.put(
  "/record/update/:recordId",
  adminAuth,
  updateAttendanceRecord
);

export default attendanceRouter;
