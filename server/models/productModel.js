import mongoose from "mongoose";

const productModelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  nomorWa: { type: String, required: true },
});

const productModel =
  mongoose.models.Product || mongoose.model("Product", productModelSchema);

export default productModel;
