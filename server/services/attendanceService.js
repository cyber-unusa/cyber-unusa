import memberModel from "../models/memberModel.js";
import attendanceEventModel from "../models/attendanceEventModel.js";
import attendanceRecordModel from "../models/attendanceRecordModel.js";

//? Dapatkan semua Acara Presensi (list-nya saja)
export const getAllAttendanceEventsService = async () => {
  return await attendanceEventModel.find({}).sort({ date: -1 });
};

//? Dapatkan detail Presensi unuk SATU acara (list anggota & status)
export const getAttendanceRecordsByEventService = async (eventId) => {
  return await attendanceRecordModel.find({ eventId }).sort({ memberName: 1 });
};

//? Membuat Acara Presensi baru
export const createAttendanceEventService = async (data) => {
  const { eventName, date } = data;
  if (!eventName || !date) {
    throw new Error("Nama Acara dan Tanggal wajib diisi");
  }

  //Todo 1. Buat Acara Presensinya
  const newEvent = new attendanceEventModel({ eventName, date });
  await newEvent.save();

  //Todo 2. Ambil semua anggota dari master list
  const allMembers = await memberModel.find({});

  //Todo 3. Filter anggota yang tidak valid (tidak punya nama)
  const validMembers = allMembers.filter((member) => member && member.name);

  //? Jika tidak ada anggota sama sekali di database, tetap buat acaranya
  if (validMembers.length === 0) {
    console.warn(
      "Acara Presensi dibuat, tetapi tidak ada anggota di database untuk diabsen.",
    );
    return { message: "Acara berhasil dibuat (tidak ada anggota terdaftar)" };
  }

  //Todo 4. Buat record Presensi HANYA untuk anggota yang valid
  const records = validMembers.map((member) => ({
    eventId: newEvent._id,
    memberId: member._id,
    memberName: member.name,
    status: "Belum Diisi",
  }));

  if (records.length > 0) {
    await attendanceRecordModel.insertMany(records);
  }
};

//? Admin meng-update status kehadiran satu anggota
export const updateAttendanceRecordService = async (recordId, status) => {
  const recordToCheck = await attendanceRecordModel.findById(recordId);
  if (!recordToCheck) {
    return res.json({
      success: false,
      message: "Data Presensi tidak ditemukan",
    });
  }

  const parentEvent = await attendanceEventModel.findById(
    recordToCheck.eventId,
  );

  if (parentEvent && parentEvent.isLocked) {
    return res.json({
      success: false,
      message:
        "Presensi TERKUNCI. Buka kunci terlebih dahulu untuk mengubah data.",
    });
  }

  return await attendanceRecordModel.findByIdAndUpdate(
    recordId,
    { status },
    { new: true },
  );
};

export const toggleEventLockService = async (eventId) => {
  const event = await attendanceEventModel.findById(eventId);
  if (!event) {
    return res.json({ success: false, message: "Acara tidak ditemukan" });
  }

  //Todo Toggle status (jika true jadi false, jika false jadi true)
  event.isLocked = !event.isLocked;
  let messageAddon = "";
  await event.save();

  //? Otomatis set "Alpa" jika dikunci
  if (event.isLocked) {
    const result = await attendanceRecordModel.updateMany(
      { eventId: eventId, status: "Belum Diisi" }, // Filter: cari yang event-nya sama & status masih kosong
      { $set: { status: "Alpa" } }, // Action: Ubah jadi Alpa
    );

    if (result.modifiedCount > 0) {
      messageAddon = `(${result.modifiedCount} anggota otomatis dianggap Alpa)`;
    }
  }

  return {
    statusMsg: event.isLocked ? "terkunci" : "terbuka",
    isLocked: event.isLocked,
    messageAddon: messageAddon,
  };
};

//? Hapus Acara Presensi (termasuk semua recordnya)
export const deleteAttendanceEventService = async (eventId) => {
  //Todo Hapus acaranya
  await attendanceEventModel.findByIdAndDelete(eventId);
  //Todo Hapus semua record Presensi yang terkait
  await attendanceRecordModel.deleteMany({ eventId });
};
