import {
  getAllAttendanceEventsService,
  getAttendanceRecordsByEventService,
  updateAttendanceRecordService,
  toggleEventLockService,
  createAttendanceEventService,
  deleteAttendanceEventService,
} from "../services/attendanceService.js";

//? Dapatkan semua Acara Presensi (list-nya saja)
export const getAllAttendanceEvents = async (req, res) => {
  try {
    const allAttendances = await getAllAttendanceEventsService();
    res.json({ success: true, allAttendances });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//? Dapatkan detail Presensi untuk SATU acara (list anggota & status)
export const getAttendanceRecordsByEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const records = await getAttendanceRecordsByEventService(eventId);
    res.json({ success: true, records });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//? Membuat Acara Presensi baru
export const createAttendanceEvent = async (req, res) => {
  try {
    await createAttendanceEventService(req.body);
    res.json({ success: true, message: "Presensi berhasil dibuat" || message });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//? Admin meng-update status kehadiran satu anggota
export const updateAttendanceRecord = async (req, res) => {
  const { recordId } = req.params;
  const { status } = req.body;

  //* status harus "Hadir", "Izin", atau "Alpa"
  if (!status || !["Hadir", "Izin", "Alpa"].includes(status)) {
    return res.json({ success: false, message: "Status tidak valid" });
  }
  try {
    const record = await updateAttendanceRecordService(recordId, status);
    if (!record) {
      return res.json({
        success: false,
        message: "Gagal mengupdate data presensi",
      });
    }
    res.json({ success: true, message: `${record.memberName} ${status}` });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//? Kunci atau Buka Kunci Presensi
export const toggleEventLock = async (req, res) => {
  try {
    const { eventId } = req.params;

    const event = await toggleEventLockService(eventId);
    res.json({
      success: true,
      message: `Presensi berhasil ${event.statusMsg} ${event.messageAddon}`,
      isLocked: event.isLocked, //! Kirim status terbaru ke frontend
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//? Hapus Acara Presensi (termasuk semua recordnya)
export const deleteAttendanceEvent = async (req, res) => {
  try {
    const { eventId } = req.params;

    await deleteAttendanceEventService(eventId);
    res.json({ success: true, message: "Acara Presensi berhasil dihapus" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
