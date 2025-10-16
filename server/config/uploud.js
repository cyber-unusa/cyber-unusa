import multer from "multer";
import path from "path";

//* Konfigurasi penyimpanan untuk Multer */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //! Menentukan folder tujuan penyimpanan file
    cb(null, "public/images/");
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
