import mongoose from "mongoose";

const kegiatanSchema = new mongoose.Schema({
  title: { type: String, required: true },
  imageUrl: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
  endDate: { type: Date, required: true },
  link: { type: String, required: true },
});

const kegiatanModel =
  mongoose.models.kegiatan || mongoose.model("kegiatan", kegiatanSchema);

export default kegiatanModel;
