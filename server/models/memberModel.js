import mongoose from "mongoose";

//? Menyimpan data Panitia
const memberSchema = new mongoose.Schema({
  name: { type: String, require: true },
  nim: { type: String, unique: true, require: true }, //! Opsional, tapi bagus untuk ID unik
  divisi: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
});

const memberModel =
  mongoose.models.member || mongoose.model("member", memberSchema);

export default memberModel;
