import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

//? koleksi absensi yang dibuat
const attendanceRecordSchema = new mongoose.Schema({
  eventId: { type: ObjectId, ref: "attendanceEvent", required: true },
  memberId: { type: ObjectId, ref: "member", required: true },
  memberName: { type: String, required: true }, //! Denormalisasi untuk query lebih mudah
  status: {
    type: String,
    enum: ["Belum Diisi", "Hadir", "Izin", "Alpa"],
    default: "Belum Diisi",
  },
});

//? Indeks untuk memastikan satu anggota hanya punya satu data per acara
attendanceRecordSchema.index({ eventId: 1, memberId: 1 }, { unique: true });

const attendanceRecordModel =
  mongoose.models.attendanceRecord ||
  mongoose.model("attendanceRecord", attendanceRecordSchema);

export default attendanceRecordModel;
