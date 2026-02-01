import mongoose from "mongoose";

//? Menyimpan data Panitia
const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  nim: { type: String, unique: true, required: true }, //! Untuk ID unik
  role: {
    type: String,
    required: true,
    enum: [
      "Staff",
      "Kadiv",
      "Sekretaris 1",
      "Sekretaris 2",
      "Bendahara Umum",
      "Wakil Ket. Umum",
      "Ketua Umum",
    ],
  },
  divisi: {
    type: String,
    required: true,
    enum: ["PSDM", "Pendidikan", "Pengmas", "Innovation & Entrepreneur", "BPH"],
  },
  imageUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const memberModel =
  mongoose.models.member || mongoose.model("member", memberSchema);

export default memberModel;
