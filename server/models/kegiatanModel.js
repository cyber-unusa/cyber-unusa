import mongoose from "mongoose";

const kegiatanSchema = new mongoose.Schema({
  public_id: { type: String, required: true },
  title: { type: String, required: true },
  imageUrl: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now, index: true },
  endDate: { type: Date, required: true, index: true },
  link: { type: String, required: true },
});

const kegiatanModel =
  mongoose.models.kegiatan || mongoose.model("kegiatan", kegiatanSchema);

export default kegiatanModel;
