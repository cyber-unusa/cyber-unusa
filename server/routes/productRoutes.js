import express from "express";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
} from "../controllers/productController.js";
import upload from "../config/uploud.js";

const productRouter = express.Router();

productRouter.post("/add", upload.single("image"), addProduct);
productRouter.put("/update/:id", upload.single("image"), updateProduct);
productRouter.delete("/delete/:id", deleteProduct);
productRouter.get("/get", getAllProducts);

export default productRouter;
