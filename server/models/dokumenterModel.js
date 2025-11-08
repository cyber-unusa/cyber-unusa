import mongoose from "mongoose";

const dokumenterSchema = new mongoose.Schema({
  public_id: { type: String, required: true },
  title: { type: String, required: true },
  imageUrl: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date },
});

const dokumenterModel =
  mongoose.models.dokumenter || mongoose.model("dokumenter", dokumenterSchema);

export default dokumenterModel;
