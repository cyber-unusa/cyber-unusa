import React, { useState, useEffect, useContext, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/Context";
import { Trash2, Pencil, Plus, FolderOpen, ImageIcon } from "lucide-react";

const ManageMembers = () => {
  const { backendUrl } = useContext(AppContext);
  const [members, setMembers] = useState([]);

  const [name, setName] = useState("");
  const [role, setRole] = useState("Staff");
  const [nim, setNim] = useState("");
  const [divisi, setDivisi] = useState("PSDM");
  const [image, setImage] = useState(null);

  //? State Edit Mode
  const [isEditing, setIsEditing] = useState(false);
  const [currentEditId, setCurrentEditId] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

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

  //! Auto-set divisi based on role
  useEffect(() => {
    if (role !== "Staff" || role !== "Kadiv") {
      setDivisi("BPH");
    }
  }, [role, divisi]);

  const resetForm = () => {
    setName("");
    setRole("");
    setNim("");
    setDivisi("");
    setImage(null);
    setIsEditing(false);
    setCurrentEditId(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("role", role);
    formData.append("nim", nim);
    formData.append("divisi", divisi);

    if (image) formData.append("image", image);

    try {
      let data;

      if (isEditing) {
        const response = await axios.put(
          `${backendUrl}/api/member/update/${currentEditId}`,
          formData,
          { withCredentials: true },
        );
        data = response.data;
      } else {
        const response = await axios.post(
          `${backendUrl}/api/member/add`,
          formData,
          { withCredentials: true },
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
    setRole(member.role);
    setNim(member.nim);
    setDivisi(member.divisi);
    setImage(null);
    setImagePreview(member.imageUrl);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (
      window.confirm(
        "Yakin ingin menghapus anggota ini? Ini akan menghapus semua data absensinya.",
      )
    ) {
      try {
        const { data } = await axios.delete(
          `${backendUrl}/api/member/delete/${id}`,
          null,
          { withCredentials: true },
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
        <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2">
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

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* Kolom Kiri: Upload Gambar */}
          <div className="lg:col-span-1">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Foto Profile
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center text-center h-48 relative bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer group">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setImage(file);
                  if (file) setImagePreview(URL.createObjectURL(file));
                }}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-contain rounded"
                />
              ) : (
                <div className="text-gray-400 group-hover:text-gray-600">
                  <ImageIcon className="w-12 h-12 mx-auto mb-2" />
                  <p className="text-sm">Klik atau tarik gambar ke sini</p>
                </div>
              )}
            </div>
            {isEditing && !image && (
              <p className="text-xs text-gray-500 mt-1 text-center">
                *Biarkan kosong jika tidak ingin mengganti gambar
              </p>
            )}
          </div>

          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Input Nama */}
            <div className="md:col-span-1">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-600 mb-1"
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
            <div className="md:col-span-1">
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

            {/* Role */}
            <div className="md:col-span-1">
              <label className="text-sm font-medium text-gray-600 mb-1">
                Level (Role)
              </label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="Staff">Staff</option>
                <option value="Kadiv">Kepala Divisi (Kadiv)</option>
                <option value="Sekertaris 1">Sekertaris 1</option>
                <option value="Sekertaris 2">Sekertaris 2</option>
                <option value="Bendahara Umum">Bendahara Umum</option>
                <option value="Wakil Ket. Umum">Wakil Ket. Umum</option>
                <option value="Ketua Umum">Ketua Umum</option>
              </select>
            </div>

            {/* Input Divisi */}
            <div className="md:col-span-1">
              <label className="text-sm font-medium text-gray-600 mb-1">
                Divisi <span className="text-red-500">*</span>
              </label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                value={divisi}
                onChange={(e) => setDivisi(e.target.value)}
              >
                {role === "Kadiv" || role === "Staff" ? (
                  <>
                    <option value="PSDM">PSDM</option>
                    <option value="Pendidikan">Pendidikan</option>
                    <option value="Pengmas">Pengmas</option>
                    <option value="Innovation">Innovation</option>
                  </>
                ) : (
                  <option value="BPH">Badan Pengurus Harian (BPH)</option>
                )}
              </select>
            </div>

            {/* Tombol Aksi */}
            <div className="md:col-span-2 flex justify-end gap-2 mt-2">
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
          </div>
        </form>
      </div>

      {/* Bagian Daftar Anggota (Tabel) */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-bold text-gray-700">Daftar Anggota</h3>
        </div>

        {/* Header Kolom (Desktop) */}
        <div className="hidden md:grid grid-cols-14 gap-4 px-6 py-3 bg-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200 text-center">
          <div className="col-span-2">Foto Profile</div>
          <div className="col-span-3">Nama Lengkap</div>
          <div className="col-span-3">NIM</div>
          <div className="col-span-2">Divisi</div>
          <div className="col-span-2">Absensi</div>
          <div className="col-span-2">Aksi</div>
        </div>

        {/* Isi List */}
        <div className="divide-y divide-gray-300">
          {members.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-14 text-gray-400">
              <span className="w-14 h-14 text-gray-300">
                <FolderOpen className="" />
              </span>
              <p>Belum ada data anggota.</p>
            </div>
          ) : (
            members.map((member) => (
              <div
                key={member._id}
                className="grid grid-cols-1 md:grid-cols-14 gap-2 md:gap-4 px-6 py-4 items-center lg:text-center hover:bg-gray-50 transition-colors group"
              >
                <div className="col-span-1 md:col-span-2">
                  <span className="font-semibold text-gray-800 block md:hidden text-xs mb-1">
                    FOTO PROFILE
                  </span>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center text-center h-40 relative bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer group">
                    <img
                      src={member.imageUrl}
                      alt={member.name}
                      className="w-full h-full object-cover rounded-md border border-gray-200 shadow-sm"
                    />
                  </div>
                </div>

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
                  {member.divisi != "BPH" ? (
                    <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-sm font-semibold rounded-full border border-blue-100">
                      {member.role} {member.divisi}
                    </span>
                  ) : (
                    <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-sm font-semibold rounded-full border border-blue-100">
                      {member.role}
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
