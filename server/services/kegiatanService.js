import kegiatanModel from "../models/kegiatanModel.js";
import { v2 as cloudinary } from "cloudinary";

export const getAllKegiatansService = async () => {
  return await kegiatanModel.find({}).sort({ createdAt: -1 });
};

export const addKegiatanService = async (data, file) => {
  if (!file) throw new Error("Gambar Kegiatan wajib diunggah");

  const newKegiatan = new kegiatanModel({
    ...data,
    imageUrl: file.path,
    public_id: file.filename,
  });

  return await newKegiatan.save();
};

export const updateKegiatanService = async (id, data, file) => {
  const kegiatan = await kegiatanModel.findById(id);
  if (!kegiatan) throw new Error("Kegiatan tidak ditemukan");

  const updateData = { ...data };

  //? Logika ganti gambar
  if (file) {
    //? Hapus gambar lama di Cloudinary
    if (kegiatan.public_id) {
      await cloudinary.uploader.destroy(kegiatan.public_id);
    }
    //? Update dengan gambar baru
    updateData.imageUrl = file.path;
    updateData.public_id = file.filename;
  }

  return await kegiatanModel.findByIdAndUpdate(id, updateData, { new: true });
};

export const deleteKegiatanService = async (id) => {
  const kegiatan = await kegiatanModel.findById(id);
  if (!kegiatan) throw new Error("Kegiatan tidak ditemukan");

  //? Hapus gambar dari Cloudinary
  if (kegiatan.public_id) {
    await cloudinary.uploader.destroy(kegiatan.public_id);
  }

  return await kegiatanModel.findByIdAndDelete(id);
};
