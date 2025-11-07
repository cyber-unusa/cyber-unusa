import productModel from "../models/productModel.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { promisify } from "util";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const unlink = promisify(fs.unlink);

export const addProduct = async (req, res) => {
  const { name, price, description, nomorWa } = req.body;
  const image = req.file;

  if (!image) {
    return res.json({ success: false, message: "Gambar belum diupload" });
  }

  //! Path gambar yang akan disimpan di database
  const imageUrl = path.join("images", image.filename).replace(/\\/g, "/");
  if (!name || !price || !description || !nomorWa) {
    return res.json({ success: false, message: "Input Kurang Lengkap Brooo" });
  }

  try {
    const newProduct = new productModel({
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
    const prod = await productModel.findById(id);
    if (prod && prod.imageUrl) {
      const storedImagePath = prod.imageUrl.replace(/^\/*/, "");

      const candidates = [
        path.join(__dirname, "..", "public", storedImagePath),
        path.join(__dirname, "public", storedImagePath),
        path.join(process.cwd(), "public", storedImagePath),
        path.join(process.cwd(), storedImagePath),
      ];

      const unlink = promisify(fs.unlink);
      let deleted = false;
      for (const p of candidates) {
        try {
          if (fs.existsSync(p)) {
            await unlink(p);
            console.log("File gambar berhasil dihapus:", p);
            deleted = true;
            break;
          }
        } catch (err) {
          console.error("Gagal menghapus file gambar pada path:", p, err);
        }
      }

      if (!deleted) {
        console.warn("File gambar tidak ditemukan di semua path kandidat.");
      }
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
