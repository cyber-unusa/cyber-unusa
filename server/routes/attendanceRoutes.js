import express from "express";
import {
  createAttendanceEvent,
  getAllAttendanceEvents,
  getAttendanceRecordsByEvent,
  updateAttendanceRecord,
  deleteAttendanceEvent,
  toggleEventLock,
} from "../controllers/attendanceController.js";
import adminAuth from "../middleware/adminAuth.js";

const attendanceRouter = express.Router();

//? Rute untuk Acara Presensi
attendanceRouter.post("/event/create", adminAuth, createAttendanceEvent);
attendanceRouter.get("/events/get", adminAuth, getAllAttendanceEvents);
attendanceRouter.delete(
  "/event/delete/:eventId",
  adminAuth,
  deleteAttendanceEvent,
);

//? Rute untuk Record Presensi Spesifik
attendanceRouter.get(
  "/records/:eventId",
  adminAuth,
  getAttendanceRecordsByEvent,
);
attendanceRouter.put(
  "/record/update/:recordId",
  adminAuth,
  updateAttendanceRecord,
);
attendanceRouter.put(
  "/records/toggle-lock/:eventId",
  adminAuth,
  toggleEventLock,
);

export default attendanceRouter;
