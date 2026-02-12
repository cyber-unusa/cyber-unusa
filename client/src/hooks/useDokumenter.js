import { useState, useCallback, useEffect } from "react";
import {
  fetchDokumenters,
  createDokumenterData,
  updateDokumenterData,
  deleteDokumenterData,
} from "../services/dokumenterService";
import { toast } from "react-toastify";

export default function useDokumenter() {
  const [dokumenters, setDokumenters] = useState([]);
  const [loading, setLoading] = useState(false);

  const getDokumenters = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchDokumenters();
      setDokumenters(data);
    } catch (error) {
      toast.error(error.message || "Gagal mengambil data dokumenter");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getDokumenters();
  }, [getDokumenters]);

  const addDokumenter = async (formData) => {
    try {
      const res = await createDokumenterData(formData);
      if (res.success) {
        toast.success(res.message);
        getDokumenters(); // Refresh data
        return true;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Gagal tambah dokumenter");
      return false;
    }
  };

  const editDokumenter = async (id, formData) => {
    try {
      const res = await updateDokumenterData(id, formData);
      if (res.success) {
        toast.success(res.message);
        getDokumenters();
        return true;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Gagal update dokumenter");
      return false;
    }
  };

  const deleteDokumenter = async (id) => {
    try {
      const res = await deleteDokumenterData(id);
      if (res.success) {
        toast.success(res.message);
        getDokumenters();
        return true;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Gagal hapus dokumenter");
      return false;
    }
  };

  return {
    dokumenters,
    loading,
    getDokumenters,
    addDokumenter,
    editDokumenter,
    deleteDokumenter,
  };
}
