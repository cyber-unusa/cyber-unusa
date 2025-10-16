import dokumenterModel from "../models/dokumenterModel.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { promisify } from "util";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const addDokumenter = async (req, res) => {
  const { title, description } = req.body;
  const image = req.file;

  if (!image) {
    return res.json({ success: false, message: "Gambar belum diupload" });
  }

  //! Path gambar yang akan disimpan di database
  const imageUrl = path.join("images", image.filename).replace(/\\/g, "/");

  if (!title || !description) {
    return res.json({ success: false, message: "Input Kurang Lengkap Brooo" });
  }

  try {
    const newDokumenter = new dokumenterModel({ title, imageUrl, description });
    await newDokumenter.save();
    res.json({ success: true, message: "Dokumenter berhasil ditambahkan" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const deleteDokumenter = async (req, res) => {
  const { id } = req.params;
  try {
    const doc = await dokumenterModel.findById(id);
    if (doc && doc.imageUrl) {
      // Normalize stored image path in case it contains leading slashes
      const storedImagePath = doc.imageUrl.replace(/^\/*/, "");

      // Possible locations where multer might have stored the file depending on working directory
      const candidates = [
        path.join(__dirname, "..", "public", storedImagePath), // server/../public/...
        path.join(__dirname, "public", storedImagePath), // server/public/...
        path.join(process.cwd(), "public", storedImagePath), // process cwd/public/...
        path.join(process.cwd(), storedImagePath), // process cwd/...
      ];

      // Use promise-based unlink for sequential awaits
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

    await dokumenterModel.findByIdAndDelete(id);
    res.json({ success: true, message: "Dokumenter berhasil dihapus" });
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
