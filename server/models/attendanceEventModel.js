import mongoose from "mongoose";

//? Absensi acara
const attendanceEventSchema = new mongoose.Schema({
  eventName: { type: String, required: true },
  date: { type: Date, required: true },
  isLocked: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const attendanceEventModel =
  mongoose.models.attendanceEvent ||
  mongoose.model("attendanceEvent", attendanceEventSchema);

export default attendanceEventModel;
