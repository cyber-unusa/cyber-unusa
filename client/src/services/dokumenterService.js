import api from "./api";

export const fetchDokumenters = async () => {
  const response = await api.get("/api/dokumenter/get");
  return response.data.allDokumenter;
};

export const createDokumenterData = async (formData) => {
  const response = await api.post("/api/dokumenter/add", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const updateDokumenterData = async (id, formData) => {
  const response = await api.put(`/api/dokumenter/update/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const deleteDokumenterData = async (id) => {
  const response = await api.delete(`/api/dokumenter/delete/${id}`);
  return response.data;
};
