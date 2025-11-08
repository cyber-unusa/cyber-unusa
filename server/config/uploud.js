import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

//? Konfigurasi Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//? Konfigurasi Storage Cloudinary untuk Multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "cyber-unusa", //! nama folder di Cloudinary
    allowed_formats: ["jpg", "png", "jpeg", "JPG"],
    //? public_id dibuat secara otomatis di Cloudinary
  },
});

//? Middleware upload
const upload = multer({ storage: storage });

export default upload;
