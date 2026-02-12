import memberModel from "../models/memberModel.js";
import attendanceRecordModel from "../models/attendanceRecordModel.js";
import { v2 as cloudinary } from "cloudinary";

export const getAllMemberService = async (id) => {
  const allMembers = await memberModel.find().sort({ name: 1 }).lean();

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

  return allMembers.map((member) => {
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
};

export const addMemberService = async (data, file) => {
  const imageUrl = "";
  const public_id = "";

  if (file) {
    const imageUrl = file.path;
    const public_id = file.filename;
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
