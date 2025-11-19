import kegiatanModel from "../models/kegiatanModel.js";
import { v2 as cloudinary } from "cloudinary";
import { promisify } from "util";

export const addKegiatan = async (req, res) => {
  const { title, description, endDate, link } = req.body;
  const image = req.file;

  if (!image) {
    return res.json({ success: false, message: "Gambar belum diupload" });
  }

  //! Path gambar yang akan disimpan di database
  const imageUrl = req.file.path;
  const public_id = req.file.filename;

  if (!title || !description || !endDate || !link) {
    return res.json({ success: false, message: "Input Kurang Lengkap Brooo" });
  }

  try {
    const newKegiatan = new kegiatanModel({
      public_id,
      imageUrl,
      title,
      description,
      endDate,
      link,
    });
    await newKegiatan.save();
    res.json({ success: true, message: "Kegiatan berhasil ditambahkan" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const updateKegiatan = async (req, res) => {
  const { id } = req.params;
  const { title, description, endDate, link } = req.body;

  try {
    const kegiatan = await kegiatanModel.findById(id);
    if (!kegiatan) {
      return res.json({ success: false, message: "Kegiatan tidak ditemukan" });
    }

    let updateData = {
      title,
      description,
      endDate,
      link,
    };

    //? Cek jika ada file gambar baru
    if (req.file) {
      if (kegiatan.public_id) {
        await cloudinary.uploader.destroy(kegiatan.public_id);
      }
      //? Update dengan gambar baru
      updateData.imageUrl = req.file.path;
      updateData.public_id = req.file.filename;
    }

    await kegiatanModel.findByIdAndUpdate(id, updateData);
    res.json({ success: true, message: "Kegiatan berhasil diperbarui" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const deleteKegiatan = async (req, res) => {
  const { id } = req.params;
  try {
    const doc = await kegiatanModel.findById(id);
    if (!doc) {
      return res.json({ success: false, message: "kegiatan tidak ditemukan" });
    }

    //Todo Hapus gamabar dari cloudinary
    if (doc.public_id) {
      await cloudinary.uploader.destroy(doc.public_id);
    }

    await kegiatanModel.findByIdAndDelete(id);
    res.json({ success: true, message: "Kegiatan berhasil dihapus" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getAllKegiatan = async (req, res) => {
  try {
    const allKegiatan = await kegiatanModel.find({}).sort({ createdAt: -1 });
    res.json({ success: true, allKegiatan });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
