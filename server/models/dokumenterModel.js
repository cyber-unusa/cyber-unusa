import mongoose from "mongoose";

const dokumenterSchema = new mongoose.Schema({
  title: { type: String, required: true },
  imageUrl: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const dokumenterModel = mongoose.models.dokumenter || mongoose.model("dokumenter", dokumenterSchema);

export default dokumenterModel;