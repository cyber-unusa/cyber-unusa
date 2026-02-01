import memberModel from "../models/memberModel.js";
import attendanceRecordModel from "../models/attendanceRecordModel.js";
import { v2 as cloudinary } from "cloudinary";

//? Tambah Anggota baru ke master list
export const addMember = async (req, res) => {
  const { name, role, nim, divisi } = req.body;
  const image = req.file;

  if (!image) {
    return res.json({ success: false, message: "Gambar belum diupload" });
  }

  //! Path gambar yang akan disimpan di database
  const imageUrl = req.file.path;
  const public_id = req.file.filename;

  if (!name || !role || !nim || !divisi) {
    console.log(name, role, nim, divisi);
    return res.json({ success: false, message: "Data tidak lengkap!" });
  }

  try {
    const newMember = new memberModel({
      public_id,
      name,
      role,
      nim,
      divisi,
      imageUrl,
    });
    await newMember.save();
    res.json({ success: true, message: "Anggota berhasil ditambahkan" });
  } catch (error) {
    if (error.code === 11000) {
      //! Duplikat NIM
      return res.json({ success: false, message: "NIM sudah terdaftar" });
    }
    res.json({ success: false, message: error.message });
  }
};

export const updateMember = async (req, res) => {
  const { id } = req.params;
  const { name, nim, divisi, role } = req.body;

  try {
    const member = await memberModel.findById(id);
    if (!member) {
      return res.json({ success: false, message: "Member Tidak ada" });
    }

    let updateData = {
      name,
      nim,
      divisi,
      role,
    };

    if (req.file) {
      if (member.public_id) {
        await cloudinary.uploader.destroy(member.public_id);
      }

      updateData.imageUrl = req.file.path;
      updateData.public_id = req.file.filename;
    }

    await memberModel.findByIdAndUpdate(id, updateData);
    res.json({ success: true, message: "Member berhasil diperbarui" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//? Hapus Anggota dari master list
export const deleteMember = async (req, res) => {
  const { id } = req.params;
  try {
    const member = await memberModel.findById(id);
    if (!member)
      return res.json({ success: false, message: "Data Memeber Tidak ada" });

    //? Hapus data gambar jika ada
    if (member.public_id) {
      await cloudinary.uploader.destroy(member.public_id);
    }

    //! Hapus Data member
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
    const allMembers = await memberModel.find({}).sort({ name: 1 }).lean(); // Urutkan A-Z

    // Jika tidak ada member, kembalikan array kosong
    if (allMembers.length === 0) {
      return res.json({ success: true, allMembers: [] });
    }

    const allRecords = await attendanceRecordModel.find({});

    const memberStatsMap = new Map();

    //? Menghitung Statistik kehadiran
    for (const record of allRecords) {
      const memberIdString = record.memberId.toString();

      if (!memberStatsMap.has(memberIdString)) {
        memberStatsMap.set(memberIdString, { totalRecords: 0, totalHadir: 0 });
      }

      const stats = memberStatsMap.get(memberIdString);
      stats.totalRecords += 1;

      if (record.status === "Hadir") {
        stats.totalHadir += 1;
      }
    }

    //! Menggabungkan data member dengan statistik absensi
    const finalMembersData = allMembers.map((member) => {
      const memberIdString = member._id.toString();
      const stats = memberStatsMap.get(memberIdString);

      const totalRecords = stats ? stats.totalRecords : 0;
      const totalHadir = stats ? stats.totalHadir : 0;

      //Todo hitung presentase kehadiran: (hadir / totalAcara) * 100
      const attendancePercentage =
        totalRecords > 0 ? ((totalHadir / totalRecords) * 100).toFixed(0) : 100;

      return {
        ...member,
        totalEvents: totalRecords,
        totalHadir: totalHadir,
        attendancePercentage: Number(attendancePercentage),
      };
    });

    res.json({
      success: true,
      allMembers: finalMembersData,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
