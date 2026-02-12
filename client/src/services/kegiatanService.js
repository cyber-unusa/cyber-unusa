import api from "./api";

export const fetchKegiatans = async () => {
  const response = await api.get("/api/kegiatan/get");
  return response.data.allKegiatans;
};

export const createKegiatanData = async (formData) => {
  const response = await api.post("/api/kegiatan/add", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const updateKegiatanData = async (id, formData) => {
  const response = await api.put(`/api/kegiatan/update/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const deleteKegiatanData = async (id) => {
  const response = await api.delete(`/api/kegiatan/delete/${id}`);
  return response.data;
};
