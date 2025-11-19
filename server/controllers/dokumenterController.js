import dokumenterModel from "../models/dokumenterModel.js";
import { v2 as cloudinary } from "cloudinary";

export const addDokumenter = async (req, res) => {
  const { title, description } = req.body;
  const image = req.file;

  if (!image) {
    return res.json({ success: false, message: "Gambar belum diupload" });
  }

  //! Path gambar berupa URL dari Cloudinary
  const imageUrl = req.file.path;
  const public_id = req.file.filename;

  if (!title || !description) {
    return res.json({ success: false, message: "Input Kurang Lengkap Brooo" });
  }

  try {
    const newDokumenter = new dokumenterModel({
      public_id,
      title,
      imageUrl,
      description,
    });
    await newDokumenter.save();
    res.json({ success: true, message: "Dokumenter berhasil ditambahkan" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const updateDokumenter = async (req, res) => {
  const { id } = req.params;
  const { title, description, date } = req.body;

  try {
    const doc = await dokumenterModel.findById(id);
    if (!doc) {
      return res.json({
        success: false,
        message: "Dokumenter tidak ditemukan",
      });
    }

    let updateData = {
      title,
      description,
      date,
    };

    //? Cek jika ada file gambar baru
    if (req.file) {
      //? hapus gambar lama di Cloudinary
      if (doc.public_id) {
        await cloudinary.uploader.destroy(doc.public_id);
      }
      //? update dengan gambar baru
      updateData.imageUrl = req.file.path;
      updateData.public_id = req.file.filename;
    }

    await dokumenterModel.findByIdAndUpdate(id, updateData);
    res.json({ success: true, message: "Dokumenter berhasil diperbarui" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const deleteDokumenter = async (req, res) => {
  const { id } = req.params;
  try {
    const doc = await dokumenterModel.findById(id);
    if (!doc) {
      return res.json({ success: false, message: "Dokumen tidak ditemukan" });
    }

    //Todo Hapus gamabar dari cloudinary
    if (doc.public_id) {
      await cloudinary.uploader.destroy(doc.public_id);
    }

    await dokumenterModel.findByIdAndDelete(id);
    res.json({ success: true, message: "Dokumenter berhasil di hapus" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getAllDokumenter = async (req, res) => {
  try {
    const allDokumenter = await dokumenterModel
      .find({})
      .sort({ createdAt: -1 });
    res.json({ success: true, allDokumenter });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
