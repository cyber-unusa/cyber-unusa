import api from "./api";

export const fetchProducts = async () => {
  const response = await api.get("/api/product/get");
  return response.data.allProducts;
};

export const createProductData = async (formData) => {
  const response = await api.post("/api/product/add", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const updateProductData = async (id, formData) => {
  const response = await api.put(`/api/product/update/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const deleteProductById = async (id) => {
  const response = await api.delete(`/api/product/delete/${id}`);
  return response.data;
};
