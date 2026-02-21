import { useState, useCallback, useEffect } from "react";
import {
  fetchMembersWithStats,
  createMemberData,
  updateMemberData,
  removeMemberData,
} from "../services/memberService";
import { toast } from "react-toastify";

export const useMembers = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);

  const getMembers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchMembersWithStats();
      setMembers(data || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Gagal memuat data anggota");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getMembers();
  }, [getMembers]);

  const addMember = async (payload) => {
    try {
      const res = await createMemberData(payload);
      if (res.success) {
        toast.success(res.message);
        getMembers(); // Refresh data
        return true;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Gagal tambah member");
      return false;
    }
  };

  const editMember = async (id, payload) => {
    try {
      const res = await updateMemberData(id, payload);
      if (res.success) {
        toast.success(res.message);
        getMembers();
        return true;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Gagal update member");
      return false;
    }
  };

  const deleteMember = async (id) => {
    const previousMembers = [...members];
    setMembers((prev) => prev.filter((m) => m._id !== id)); // Optimistic update

    try {
      const res = await removeMemberData(id);
      if (res.success) {
        toast.success(res.message);
        getMembers();
      } else {
        throw new Error(res.message || "Gagal hapus member");
      }
    } catch (error) {
      setMembers(previousMembers); // Revert on failure
      toast.error(error.response?.data?.message || "Gagal hapus member");
    }
  };

  return { members, loading, addMember, editMember, deleteMember };
};
