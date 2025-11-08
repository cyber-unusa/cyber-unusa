import productModel from "../models/productModel.js";
import { v2 as cloudinary } from "cloudinary";

export const addProduct = async (req, res) => {
  const { name, price, description, nomorWa } = req.body;
  const image = req.file;

  if (!image) {
    return res.json({ success: false, message: "Gambar belum diupload" });
  }

  //! Path gambar yang akan disimpan di database
  const imageUrl = req.file.path;
  const public_id = req.file.filename;

  if (!name || !price || !description || !nomorWa) {
    return res.json({ success: false, message: "Input Kurang Lengkap Brooo" });
  }

  try {
    const newProduct = new productModel({
      public_id,
      name,
      price,
      description,
      imageUrl,
      nomorWa,
    });
    await newProduct.save();
    res.json({ success: true, message: "Product berhasil ditambahkan" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const doc = await productModel.findById(id);
    if (!doc) {
      return res.json({ success: false, message: "Product tidak ditemukan" });
    }

    //Todo Hapus gamabar dari cloudinary
    if (doc.public_id) {
      await cloudinary.uploader.destroy(doc.public_id);
    }

    await productModel.findByIdAndDelete(id);
    res.json({ success: true, message: "Product berhasil dihapus" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const allProducts = await productModel.find().sort({ createdAt: -1 });
    res.json({ success: true, allProducts });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
