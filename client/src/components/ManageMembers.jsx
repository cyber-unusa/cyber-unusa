import React, { useState, useEffect, useContext, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/Context";
import { Trash2, Pencil, Plus, FolderOpen } from "lucide-react";

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
    window.scrollTo({ top: 0, behavior: "smooth" });
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
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Kelola Anggota</h2>
        <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg font-medium text-sm">
          Total Anggota: {members.length}
        </div>
      </div>

      {/* Bagian Form Input */}
      <div
        className={`rounded-xl shadow-sm border p-6 mb-8 transition-colors duration-300 ${
          isEditing
            ? "bg-yellow-50 border-yellow-200"
            : "bg-white border-gray-200"
        }`}
      >
        <div className="flex justify-between items-center mb-4 border-b pb-2 border-gray-200/100">
          <h3
            className={`text-lg font-bold flex items-center gap-2 ${
              isEditing ? "text-yellow-700" : "text-gray-700"
            }`}
          >
            {isEditing ? (
              <>
                <Pencil className="w-5 h-5 text-yellow-600" /> Mode Edit Data
              </>
            ) : (
              <>
                <Plus className="w-5 h-5 text-blue-600" /> Tambah Anggota Baru
              </>
            )}
          </h3>
          {isEditing && (
            <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded">
              Sedang mengedit ID: {currentEditId}
            </span>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Input Nama */}
            <div className="flex flex-col">
              <label
                htmlFor="name"
                className="text-sm font-medium text-gray-600 mb-1"
              >
                Nama Lengkap <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masukkan nama lengkap"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>

            {/* Input NIM */}
            <div className="flex flex-col">
              <label
                htmlFor="nim"
                className="text-sm font-medium text-gray-600 mb-1"
              >
                NIM <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="nim"
                id="nim"
                value={nim}
                onChange={(e) => setNim(e.target.value)}
                placeholder="Contoh: 12345678"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>

            {/* Input Divisi */}
            <div className="flex flex-col">
              <label
                htmlFor="divisi"
                className="text-sm font-medium text-gray-600 mb-1"
              >
                Divisi
              </label>
              <input
                type="text"
                name="divisi"
                id="divisi"
                value={divisi}
                onChange={(e) => setDivisi(e.target.value)}
                placeholder="Contoh: PSDM, Pendidikan"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>
          </div>

          {/* Tombol Aksi */}
          <div className="flex gap-3 mt-6 justify-end">
            {isEditing && (
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2 rounded-lg text-gray-600 font-semibold hover:bg-gray-200 transition-colors"
              >
                Batal
              </button>
            )}
            <button
              type="submit"
              className={`px-6 py-2 rounded-lg text-white font-bold shadow-md transition-transform transform active:scale-95 ${
                isEditing
                  ? "bg-yellow-500 hover:bg-yellow-600"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isEditing ? "Simpan Perubahan" : "Tambah Member"}
            </button>
          </div>
        </form>
      </div>

      {/* Bagian Daftar Anggota (Tabel) */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-bold text-gray-700">Daftar Anggota</h3>
        </div>

        {/* Header Kolom (Desktop) */}
        <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 bg-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200">
          <div className="col-span-3">Nama Lengkap</div>
          <div className="col-span-3">NIM</div>
          <div className="col-span-2">Divisi</div>
          <div className="col-span-2 text-center">Absensi</div>
          <div className="col-span-2 text-center">Aksi</div>
        </div>

        {/* Isi List */}
        <div className="divide-y divide-gray-300">
          {members.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-gray-400">
              <span className="w-12 h-12 text-gray-300">
                <FolderOpen className="" />
              </span>
              <p>Belum ada data anggota.</p>
            </div>
          ) : (
            members.map((member) => (
              <div
                key={member._id}
                className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 px-6 py-4 items-center hover:bg-gray-50 transition-colors group"
              >
                {/* Kolom Nama */}
                <div className="col-span-1 md:col-span-3">
                  <span className="font-semibold text-gray-800 block md:hidden text-xs mb-1">
                    NAMA
                  </span>
                  <span className="text-gray-800 font-medium text-base">
                    {member.name}
                  </span>
                </div>

                {/* Kolom NIM */}
                <div className="col-span-1 md:col-span-3">
                  <span className="font-semibold block md:hidden text-xs text-gray-400 mb-1 mt-2">
                    NIM
                  </span>
                  <span className="text-gray-600 font-mono bg-gray-100 px-2 py-1 rounded">
                    {member.nim || "-"}
                  </span>
                </div>

                {/* Kolom Divisi */}
                <div className="col-span-1 md:col-span-2">
                  <span className="font-semibold block md:hidden text-xs text-gray-400 mb-1 mt-2">
                    DIVISI
                  </span>
                  {member.divisi ? (
                    <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-sm font-semibold rounded-full border border-blue-100">
                      {member.divisi}
                    </span>
                  ) : (
                    <span className="text-gray-400 text-sm italic">
                      - Tanpa Divisi -
                    </span>
                  )}
                </div>

                {/* Kolom Presentase Kehadiran */}
                <div className="col-span-1 md:col-span-2 text-left md:text-center">
                  <span className="font-semibold block md:hidden text-xs text-gray-400 mb-1 mt-2">
                    ABSENSI
                  </span>
                  <span
                    className={`inline-block px-3 py-1 text-sm font-bold rounded-full ${
                      member.attendancePercentage >= 75
                        ? "bg-green-100 text-green-700"
                        : member.attendancePercentage >= 50
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {member.attendancePercentage}%
                  </span>
                  <p className="text-xs text-gray-400 mt-1">
                    ({member.totalHadir} Hadir dari {member.totalEvents} Acara)
                  </p>
                </div>

                {/* Kolom Aksi */}
                <div className="col-span-1 md:col-span-2 flex justify-start md:justify-center gap-2 mt-2 md:mt-0 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleEditClick(member)}
                    className="bg-yellow-500 hover:bg-yellow-600 border border-yellow-100 p-2 rounded transition-colors shadow-sm"
                    title="Edit"
                  >
                    <Pencil className="w-5 h-5 text-yellow-100" />
                  </button>
                  <button
                    onClick={() => handleDelete(member._id)}
                    className="bg-red-500 hover:bg-red-600 border border-red-100 p-2 rounded transition-colors shadow-sm"
                    title="Hapus"
                  >
                    <Trash2 className="w-5 h-5 text-red-200" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageMembers;
