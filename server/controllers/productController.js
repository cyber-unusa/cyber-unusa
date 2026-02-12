import * as productService from "../services/productService.js";

export const getAllProducts = async (req, res) => {
  try {
    const allProducts = await productService.getAllProductsService();
    res.json({ success: true, allProducts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addProduct = async (req, res) => {
  try {
    await productService.addProductService(req.body, req.file);
    res.json({ success: true, message: "Product berhasil ditambahkan" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await productService.updateProductService(id, req.body, req.file);
    res.json({ success: true, message: "Produk berhasil diperbarui" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await productService.deleteProductService(id);
    res.json({ success: true, message: "Product berhasil dihapus" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
