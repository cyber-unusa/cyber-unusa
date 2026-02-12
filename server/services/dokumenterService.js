import dokumenterModel from "../models/dokumenterModel.js";
import { v2 as cloudinary } from "cloudinary";

export const getAllDokumenService = async () => {
  return await dokumenterModel.find({}).sort({ createdAt: -1 });
};

export const addDokumenService = async (data, file) => {
  if (!file) throw new Error("Gambar Dokumenter wajib diunggah");

  const newDokumen = new dokumenterModel({
    ...data,
    imageUrl: file.path,
    public_id: file.filename,
  });

  return await newDokumen.save();
};

export const updateDokumenService = async (id, data, file) => {
  const dokumen = await dokumenterModel.findById(id);
  if (!dokumen) throw new Error("Dokumenter tidak ditemukan");

  const updateData = { ...data };

  //? Logika ganti gambar
  if (file) {
    //? Hapus gambar lama di Cloudinary
    if (dokumen.public_id) {
      await cloudinary.uploader.destroy(dokumen.public_id);
    }
    //? Update dengan gambar baru
    updateData.imageUrl = file.path;
    updateData.public_id = file.filename;
  }

  return await dokumenterModel.findByIdAndUpdate(id, updateData, { new: true });
};

export const deleteDokumenService = async (id) => {
  const dokumen = await dokumenterModel.findById(id);
  if (!dokumen) throw new Error("Dokumenter tidak ditemukan");

  //? Hapus gambar dari Cloudinary
  if (dokumen.public_id) {
    await cloudinary.uploader.destroy(dokumen.public_id);
  }

  return await dokumenterModel.findByIdAndDelete(id);
};
