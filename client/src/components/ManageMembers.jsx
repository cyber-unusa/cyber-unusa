import React, { useState, useEffect, useContext, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/appContext";

const ManageMembers = () => {
  const { backendUrl } = useContext(AppContext);
  const [members, setMembers] = useState([]);

  const [name, setName] = useState("");
  const [nim, setNim] = useState("");
  const [divisi, setDivisi] = useState("");

  //? State Edit Mode
  const [isEditing, setIsEditing] = useState(false);
  const [currentEditId, setCurrentEditId] = useState(null);

  const fetchMembers = useCallback(async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/member/get", {
        withCredentials: true,
      });
      if (data.success) {
        setMembers(data.allMembers || []);
      } else {
        toast.error("Gagal memuat anggota: " + data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }, [backendUrl]);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  const resetForm = () => {
    setName("");
    setNim("");
    setDivisi("");
    setIsEditing(false);
    setCurrentEditId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !nim) {
      toast.warn("Nama dan Nim wajib diisi.");
      return;
    }

    const formData = {
      name,
      nim,
      divisi,
    };

    try {
      let data;

      if (isEditing) {
        const response = await axios.put(
          `${backendUrl}/api/member/update/${currentEditId}`,
          formData,
          { withCredentials: true }
        );
        data = response.data;
      } else {
        const response = await axios.post(
          `${backendUrl}/api/member/add`,
          formData,
          { withCredentials: true }
        );
        data = response.data;
      }

      if (data.success) {
        toast.success(data.message);
        resetForm();
        await fetchMembers();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message || error.response?.data?.message);
    }
  };

  const handleEditClick = (member) => {
    setIsEditing(true);
    setCurrentEditId(member._id);
    setName(member.name);
    setNim(member.nim);
    setDivisi(member.divisi);
  };

  const handleDelete = async (id) => {
    if (
      window.confirm(
        "Yakin ingin menghapus anggota ini? Ini akan menghapus semua data absensinya."
      )
    ) {
      try {
        const { data } = await axios.delete(
          `${backendUrl}/api/member/delete/${id}`,
          { withCredentials: true }
        );
        if (data.success) {
          toast.success(data.message);
          await fetchMembers();
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Kelola Daftar Anggota</h2>
      <form
        onSubmit={handleSubmit}
        className="mb-6 p-4 border border-zinc-200 rounded"
      >
        <h3 className="text-xl font-semibold text-gray-700 p-2">
          Tambah Member Baru
        </h3>
        <div className="p-2">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Nama Lengkap
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Masukkan nama"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="p-2">
          <label
            htmlFor="nim"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            NIM
          </label>
          <input
            type="text"
            name="nim"
            id="nim"
            value={nim}
            onChange={(e) => setNim(e.target.value)}
            placeholder="Masukkan NIM"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="p-2">
          <label
            htmlFor="divisi"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Divisi (Opsional)
          </label>
          <input
            type="text"
            name="divisi"
            id="divisi"
            value={divisi}
            onChange={(e) => setDivisi(e.target.value)}
            placeholder="Contoh: PSDM, Pendidikan"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-2 px-4 mt-4 rounded-md"
        >
          {isEditing ? "Update Member" : "Tambah Member"}
        </button>
        {isEditing && (
          <button
            type="button"
            onClick={() => resetForm()}
            className="w-full bg-gray-500 text-white font-bold py-2 px-4 mt-2 rounded-md hover:bg-gray-600"
          >
            Batal
          </button>
        )}
      </form>
      <div>
        <h3 className="text-xl font-semibold text-gray-700 p-2">
          Daftar Anggota Saat Ini
        </h3>
        {members.map((member) => (
          <div
            key={member._id}
            className="grid grid-cols-4 items-center gap-4 p-2 border-b"
          >
            <span className="font-semibold col-span-1">{member.name}</span>
            <span className="text-gray-600 col-span-1">
              {member.nim || "-"}
            </span>
            <span className="text-gray-600 col-span-1">
              {member.divisi || "-"}
            </span>
            <div className="col-span-1">
              <button
                onClick={() => handleEditClick(member)}
                className="bg-yellow-500 text-white py-1 px-6 rounded hover:bg-yellow-600 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(member._id)}
                className="bg-red-500 text-white py-1 px-4 my-3 lg:mx-5 rounded hover:bg-red-600 transition-colors"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageMembers;
