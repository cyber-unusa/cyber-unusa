import { useState, useCallback, useEffect } from "react";
import {
  fetchKegiatans,
  createKegiatanData,
  updateKegiatanData,
  deleteKegiatanData,
} from "../services/kegiatanService.js";
import { toast } from "react-toastify";

export default function useKegiatans() {
  const [kegiatans, setKegiatans] = useState([]);
  const [loading, setLoading] = useState(false);

  const getKegiatans = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchKegiatans();
      setKegiatans(data || []);
    } catch (error) {
      toast.error(error.message || "Gagal memuat kegiatan");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getKegiatans();
  }, [getKegiatans]);

  const addKegiatan = async (formData) => {
    try {
      const res = await createKegiatanData(formData);
      if (res.success) {
        toast.success(res.message);
        getKegiatans(); // Refresh data
        return true;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Gagal tambah kegiatan");
      return false;
    }
  };

  const editKegiatan = async (id, formData) => {
    try {
      const res = await updateKegiatanData(id, formData);
      if (res.success) {
        toast.success(res.message);
        getKegiatans();
        return true;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Gagal update kegiatan");
      return false;
    }
  };

  const deleteKegiatan = async (id) => {
    try {
      const res = await deleteKegiatanData(id);
      if (res.success) {
        toast.success(res.message);
        getKegiatans();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Gagal hapus kegiatan");
      return false;
    }
  };

  return { kegiatans, loading, addKegiatan, editKegiatan, deleteKegiatan };
}
