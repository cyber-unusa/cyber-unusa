import mongoose from "mongoose";

const productModelSchema = new mongoose.Schema({
  public_id: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  nomorWa: { type: String, required: true },
  date: { type: Date, require: true, default: Date.now, index: true },
  endDate: { type: Date, required: true, index: true },
});

const productModel =
  mongoose.models.Product || mongoose.model("Product", productModelSchema);

export default productModel;
