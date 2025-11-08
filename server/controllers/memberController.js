import memberModel from "../models/memberModel.js";
import attendanceRecordModel from "../models/attendanceRecordModel.js";

//? Tambah Anggota baru ke master list
export const addMember = async (req, res) => {
  const { name, nim, divisi } = req.body;
  if (!name) {
    return res.json({ success: false, message: "Nama wajib diisi" });
  }

  try {
    const newMember = new memberModel({ name, nim, divisi });
    await newMember.save();
    res.json({ success: true, message: "Anggota berhasil ditambahkan" });
  } catch (error) {
    if (error.code === 11000) { //! Duplikat NIM
      return res.json({ success: false, message: "NIM sudah terdaftar" });
    }
    res.json({ success: false, message: error.message });
  }
};

//? Hapus Anggota dari master list
export const deleteMember = async (req, res) => {
  const { id } = req.params;
  try {
    await memberModel.findByIdAndDelete(id);
    //Todo Juga hapus semua record absensi terkait anggota ini
    await attendanceRecordModel.deleteMany({ memberId: id });
    res.json({ success: true, message: "Anggota berhasil dihapus" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//? Dapatkan semua anggota dari master list
export const getAllMembers = async (req, res) => {
  try {
    const allMembers = await memberModel.find({}).sort({ name: 1 }); // Urutkan A-Z
    res.json({ success: true, allMembers });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
