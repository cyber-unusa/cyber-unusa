import multer from "multer";
import path from "path";
import fs from "fs";

//* Konfigurasi penyimpanan untuk Multer */
const publicImagesPath = path.join(process.cwd(), "public", "images");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //! Menentukan folder tujuan penyimpanan file
    try {
      // create the folder if it doesn't exist (no-op if it does)
      fs.mkdirSync(publicImagesPath, { recursive: true });
      cb(null, publicImagesPath);
    } catch (err) {
      cb(err);
    }
  },
  filename: function (req, file, cb) {
    //! Membuat nama file yang unik untuk menghindari konflik
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

//? Middleware upload
const upload = multer({ storage: storage });

export default upload;
