import productModel from "../models/productModel.js";
import { v2 as cloudinary } from "cloudinary";

export const getAllProductsService = async () => {
  return await productModel.find().sort({ createdAt: -1 });
};

export const addProductService = async (data, file) => {
  if (!file) throw new Error("Gambar produk wajib diunggah");

  // Validate CloudinaryStorage response
  if (!file.path) {
    throw new Error("Gagal upload gambar ke Cloudinary - path tidak ditemukan");
  }

  const newProduct = new productModel({
    ...data,
    imageUrl: file.path,
    public_id: file.filename || file.public_id,
  });

  return await newProduct.save();
};

export const updateProductService = async (id, data, file) => {
  const product = await productModel.findById(id);
  if (!product) throw new Error("Produk tidak ditemukan");

  const updateData = { ...data };

  //? Logika ganti gambar
  if (file) {
    //? Hapus gambar lama di Cloudinary
    if (product.public_id) {
      await cloudinary.uploader.destroy(product.public_id);
    }
    //? Update dengan gambar baru
    updateData.imageUrl = file.path;
    updateData.public_id = file.filename;
  }

  return await productModel.findByIdAndUpdate(id, updateData, { new: true });
};

export const deleteProductService = async (id) => {
  const product = await productModel.findById(id);
  if (!product) throw new Error("Produk tidak ditemukan");

  //? Hapus gambar dari Cloudinary
  if (product.public_id) {
    await cloudinary.uploader.destroy(product.public_id);
  }

  return await productModel.findByIdAndDelete(id);
};
