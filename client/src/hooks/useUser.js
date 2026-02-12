import { useState, useEffect, useCallback } from "react";
import {
  fetchAllUsers,
  deleteUserById,
  updateUserData,
} from "../services/userService";
import { toast } from "react-toastify";

export default function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //! Gunakan useCallback agar fungsi ini stabil (tidak dibuat ulang tiap render)
  const getAllUsers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchAllUsers();
      setUsers(data);
      setError(null);
    } catch (err) {
      setError(err.message || "Gagal mengambil data user");
      toast.error("Gagal memuat data user");
    } finally {
      setLoading(false);
    }
  }, []);

  //? Panggil otomatis saat hook pertama kali dipakai
  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  const deleteUser = async (id) => {
    try {
      await deleteUserById(id);
      toast.success("User berhasil dihapus");
      getAllUsers(); //? Refresh data otomatis setelah hapus
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || "Gagal menghapus user");
      return false;
    }
  };

  const updateUser = async (id, payload) => {
    try {
      await updateUserData(id, payload);
      toast.success("Data user diperbarui");
      getAllUsers(); // Refresh data otomatis
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || "Gagal update user");
      return false;
    }
  };

  return {
    users,
    loading,
    error,
    refetch: getAllUsers,
    deleteUser,
    updateUser,
  };
}
