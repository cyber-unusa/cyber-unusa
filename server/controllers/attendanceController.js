import memberModel from "../models/memberModel.js";
import attendanceEventModel from "../models/attendanceEventModel.js";
import attendanceRecordModel from "../models/attendanceRecordModel.js";

//? Membuat Acara Absensi baru
export const createAttendanceEvent = async (req, res) => {
  const { eventName, date } = req.body;
  if (!eventName || !date) {
    return res.json({
      success: false,
      message: "Nama Acara dan Tanggal wajib diisi",
    });
  }

  try {
    //Todo 1. Buat Acara Absensinya
    const newEvent = new attendanceEventModel({ eventName, date });
    await newEvent.save();

    //Todo 2. Ambil semua anggota dari master list
    const allMembers = await memberModel.find({});

    //Todo 3. Filter anggota yang tidak valid (tidak punya nama)
    const validMembers = allMembers.filter((member) => member && member.name);

    //? Jika tidak ada anggota sama sekali di database, tetap buat acaranya
    if (validMembers.length === 0) {
      console.warn(
        "Acara absensi dibuat, tetapi tidak ada anggota di database untuk diabsen."
      );
      return res.json({
        success: true,
        message: "Acara berhasil dibuat (tidak ada anggota terdaftar)",
      });
    }

    //Todo 4. Buat record absensi HANYA untuk anggota yang valid
    const records = validMembers.map((member) => ({
      eventId: newEvent._id,
      memberId: member._id,
      memberName: member.name,
      status: "Belum Diisi",
    }));

    if (records.length > 0) {
      await attendanceRecordModel.insertMany(records);
    }

    res.json({ success: true, message: "Acara absensi berhasil dibuat" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//? Dapatkan semua Acara Absensi (list-nya saja)
export const getAllAttendanceEvents = async (req, res) => {
  try {
    const allEvents = await attendanceEventModel.find({}).sort({ date: -1 }); //! Urut dari terbaru dulu
    res.json({ success: true, allEvents });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//? Dapatkan detail absensi untuk SATU acara (list anggota & status)
export const getAttendanceRecordsByEvent = async (req, res) => {
  const { eventId } = req.params;
  try {
    const records = await attendanceRecordModel
      .find({ eventId })
      .sort({ memberName: 1 });
    res.json({ success: true, records });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//? Admin meng-update status kehadiran satu anggota
export const updateAttendanceRecord = async (req, res) => {
  const { recordId } = req.params;
  const { status } = req.body; //* status harus "Hadir", "Izin", atau "Alpa"

  if (!status || !["Hadir", "Izin", "Alpa"].includes(status)) {
    return res.json({ success: false, message: "Status tidak valid" });
  }

  try {
    await attendanceRecordModel.findByIdAndUpdate(recordId, { status });
    res.json({ success: true, message: "Status diperbarui" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//? Hapus Acara Absensi (termasuk semua recordnya)
export const deleteAttendanceEvent = async (req, res) => {
  const { eventId } = req.params;
  try {
    //Todo Hapus acaranya
    await attendanceEventModel.findByIdAndDelete(eventId);
    //Todo Hapus semua record absensi yang terkait
    await attendanceRecordModel.deleteMany({ eventId });

    res.json({ success: true, message: "Acara absensi berhasil dihapus" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
