import memberModel from "../models/memberModel.js";
import attendanceRecordModel from "../models/attendanceRecordModel.js";
import { v2 as cloudinary } from "cloudinary";

export const getAllMemberService = async () => {
  const allMembers = await memberModel.find().lean();
  

  if (allMembers.length === 0) return [];

  const allRecords = await attendanceRecordModel.find({});

  const memberStatsMap = new Map();

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

  //? Map data anggota dengan stat kehadirannya
  const mappedMembers = allMembers.map((member) => {
    const memberIdString = member._id.toString();
    const stats = memberStatsMap.get(memberIdString) || {
      totalRecords: 0,
      totalHadir: 0,
    };

    const attendancePercentage =
      stats.totalRecords > 0
        ? ((stats.totalHadir / stats.totalRecords) * 100).toFixed(0)
        : 0;

    return {
      ...member,
      totalRecords: stats.totalRecords,
      totalHadir: stats.totalHadir,
      attendancePercentage: Number(attendancePercentage),
    };
  });

  //? Bobot Urutan
  const divisiWeights = {
    BPH: 1,
    PSDM: 2,
    Pendidikan: 3,
    Pengmas: 4,
    "Innovation & Entrepreneur": 5,
  };

  const roleWeights = {
    "Ketua Umum": 1,
    "Wakil Ket. Umum": 2,
    "Bendahara Umum": 3,
    "Sekretaris 1": 4,
    "Sekretaris 2": 5,
    "Kadiv.": 6,
    "Staff": 7,
  };

  //? Pengurutan Hierarki -> Jabatan -> Nama
  mappedMembers.sort((a, b) => {
    const divA = a.divisi || "BPH";
    const divB = b.divisi || "BPH";

    const weightDivA = divisiWeights[divA] || 99;
    const weightDivB = divisiWeights[divB] || 99;

    //! Pertama: Urutkan Divisi
    if (weightDivA !== weightDivB) {
      return weightDivA - weightDivB;
    }

    //! Kedua: Urutkan Jabatan/Role
    const roleA = a.role || "Staff";
    const roleB = b.role || "Staff";

    const weightRoleA = roleWeights[roleA] || 99;
    const weightRoleB = roleWeights[roleB] || 99;

    if (weightRoleA !== weightRoleB) {
      return weightRoleA - weightRoleB;
    }

    //! Ketiga: Urutkan Nama (A-Z)
    return (a.name || "").localeCompare(b.name || "");
  });

  return mappedMembers;
};

export const addMemberService = async (data, file) => {
  let imageUrl = "";
  let public_id = "";

  if (file) {
    imageUrl = file.path;
    public_id = file.filename;
  }

  const newMember = new memberModel({
    ...data,
    imageUrl,
    public_id,
  });

  return await newMember.save();
};

export const updateMemberService = async (id, data, file) => {
  const member = await memberModel.findById(id);
  if (!member) throw new Error("Member tidak ditemukan");
  const updateData = { ...data };

  if (file) {
    if (member.public_id) {
      await cloudinary.uploader.destroy(member.public_id);
    }
    updateData.imageUrl = file.path;
    updateData.public_id = file.filename;
  }

  return await memberModel.findByIdAndUpdate(id, updateData, { new: true });
};

export const deleteMemberAndAttendanceService = async (id) => {
  const member = await memberModel.findById(id);
  if (!member) throw new Error("Member tidak ditemukan");

  if (member.public_id) {
    await cloudinary.uploader.destroy(member.public_id);
  }
  await attendanceRecordModel.deleteMany({ memberId: id });
  return await memberModel.findByIdAndDelete(id);
};
