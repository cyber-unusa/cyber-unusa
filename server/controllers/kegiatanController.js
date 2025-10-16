import kegiatanModel from "../models/kegiatanModel.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { promisify } from "util";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const addKegiatan = async (req, res) => {
  const { title, description, endDate, link } = req.body;
  const image = req.file;

  if (!image) {
    return res.json({ success: false, message: "Gambar belum diupload" });
  }

  //! Path gambar yang akan disimpan di database
  const imageUrl = path.join("images", image.filename).replace(/\\/g, "/");

  if (!title || !description || !endDate || !link) {
    return res.json({ success: false, message: "Input Kurang Lengkap Brooo" });
  }

  try {
    const newKegiatan = new kegiatanModel({
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

export const deleteKegiatan = async (req, res) => {
  const { id } = req.params;
  try {
    const doc = await kegiatanModel.findById(id);
    if (doc && doc.imageUrl) {
      const storedImagePath = doc.imageUrl.replace(/^\/*/, "");

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
        console.warn(
          "File gambar tidak ditemukan di paths candidates:",
          candidates
        );
      }
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
