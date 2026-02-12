import * as memberService from "../services/memberService.js";

//? Dapatkan semua anggota dari master list
export const getAllMembers = async (req, res) => {
  try {
    const allMembers = await memberService.getAllMemberService();
    res.json({ success: true, allMembers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//? Tambah Anggota baru ke master list
export const addMember = async (req, res) => {
  try {
    const { name, role, nim, divisi } = req.body;

    if (!name || !role || !nim || !divisi) {
      return res
        .status(400)
        .json({ success: false, message: "Data tidak lengkap!" });
    }

    await memberService.addMemberService({ name, role, nim, divisi }, req.file);
    res.json({ success: true, message: "Anggota berhasil ditambahkan" });
  } catch (error) {
    if (error.code === 11000) {
      //! Duplikat NIM
      return res
        .status(400)
        .json({ success: false, message: "NIM sudah terdaftar" });
    }
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, nim, divisi, role } = req.body;

    if (!name || !role || !nim || !divisi) {
      return res
        .status(400)
        .json({ success: false, message: "Data tidak lengkap!" });
    }

    await memberService.updateMemberService(
      id,
      { name, role, nim, divisi },
      req.file,
    );
    res.json({ success: true, message: "Member berhasil diperbarui" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

//? Hapus Anggota dari master list
export const deleteMember = async (req, res) => {
  try {
    const { id } = req.params;
    await memberService.deleteMemberAndAttendanceService(id);
    res.json({ success: true, message: "Anggota berhasil dihapus" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
