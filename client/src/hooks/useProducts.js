import { useState, useCallback, useEffect } from "react";
import {
  fetchProducts,
  createProductData,
  updateProductData,
  deleteProductById,
} from "../services/productService";
import { toast } from "react-toastify";

export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getProducts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchProducts();
      setProducts(data || []);
    } catch (error) {
      toast.error(error.message || "Gagal memuat produk");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const addProduct = async (formData) => {
    try {
      const res = await createProductData(formData);
      if (res.success) {
        toast.success(res.message);
        getProducts(); // Refresh data
        return true;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Gagal tambah produk");
      return false;
    }
  };

  const editProduct = async (id, formData) => {
    try {
      const res = await updateProductData(id, formData);
      if (res.success) {
        toast.success(res.message);
        getProducts();
        return true;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Gagal update produk");
      return false;
    }
  };

  const deleteProduct = async (id) => {
    try {
      const res = await deleteProductById(id);
      if (res.success) {
        toast.success(res.message);
        getProducts();
        return true;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Gagal hapus produk");
      return false;
    }
  };

  return { products, loading, addProduct, editProduct, deleteProduct };
}
