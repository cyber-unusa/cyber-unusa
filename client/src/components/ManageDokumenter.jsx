import React, { useState, useEffect, useContext, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/appContext";
import {
  Plus,
  Edit,
  Trash2,
  Image as ImageIcon,
  Calendar,
  FileText,
  Video,
} from "lucide-react";

const ManageDokumenter = () => {
  const { backendUrl } = useContext(AppContext);
  const [dokumenters, setDokumenters] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [date, setDate] = useState("");

  //? State Edit mode
  const [isEditing, setIsEditing] = useState(false);
  const [currentEditId, setCurrentEditId] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const loadDokumenter = useCallback(async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/dokumenter/get");
      if (data.success) {
        setDokumenters(data.allDokumenter || []);
      } else {
        toast.error("Gagal memuat data Dokumenter");
      }
    } catch (error) {
      toast.error(error.message);
    }
  }, [backendUrl]);

  useEffect(() => {
    loadDokumenter();
  }, [loadDokumenter]);

  const resetForm = (e) => {
    setTitle("");
    setDate("");
    setDescription("");
    setImage(null);
    setIsEditing(false);
    setCurrentEditId(null);
    setImagePreview(null);
    if (e && e.target) e.target.reset(); // Reset file input
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !image) {
      toast.warn("Harap isi semua kolom dan pilih gambar.");
      return;
    }

    //? validasi gambar (hanya wajib saat 'Tambah', opsional saat 'Update')
    if (!isEditing && !image) {
      toast.warn("Harap Pilih gambar");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("date", date);

    if (image) formData.append("image", image);

    try {
      let data;
      if (isEditing) {
        const response = await axios.put(
          `${backendUrl}/api/dokumenter/update/${currentEditId}`,
          formData,
          {
            withCredentials: true,
            headers: { "Content-Type": "multipart/form-data" }, //! Header penting
          }
        );
        data = response.data;
      } else {
        const response = await axios.post(
          `${backendUrl}/api/dokumenter/add`,
          formData,
          {
            withCredentials: true,
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        data = response.data;
      }

      if (data.success) {
        toast.success(data.message);
        resetForm(e);
        await loadDokumenter();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleEditClick = (doc) => {
    setIsEditing(true);
    setCurrentEditId(doc._id);
    setTitle(doc.title);
    setDescription(doc.description);
    const formattedDate = doc.date
      ? new Date(doc.date).toISOString().split("T")[0]
      : "";
    setDate(formattedDate);
    setImage(null);
    setImagePreview(doc.imageUrl);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus item ini?")) {
      try {
        const { data } = await axios.post(
          `${backendUrl}/api/dokumenter/delete/${id}`,
          null,
          { withCredentials: true }
        );
        if (data.success) {
          toast.success(data.message);
          await loadDokumenter();
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">
          Manajemen Dokumenter
        </h2>
        <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2">
          <Video className="w-4 h-4" /> Total: {dokumenters.length}
        </div>
      </div>

      {/* Form Input */}
      <div
        className={`rounded-xl shadow-sm border p-6 mb-8 transition-all ${
          isEditing
            ? "bg-yellow-50 border-yellow-200"
            : "bg-white border-gray-200"
        }`}
      >
        <div className="flex items-center gap-2 mb-6 text-lg font-semibold text-gray-700 border-b pb-2">
          {isEditing ? (
            <>
              <Edit className="w-5 h-5 text-yellow-600" /> Edit Dokumenter
            </>
          ) : (
            <>
              <Plus className="w-5 h-5 text-purple-600" /> Tambah Dokumenter
              Baru
            </>
          )}
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* Kolom Kiri: Upload Gambar */}
          <div className="lg:col-span-1">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Cover / Foto
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center text-center h-64 relative bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer group">
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

          {/* Kolom Kanan: Input Text */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Judul Kegiatan
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Contoh: Seminar Cyber Security 2024"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Tanggal Pelaksanaan
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Deskripsi
              </label>
              <textarea
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Jelaskan detail kegiatan..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none resize-none"
              ></textarea>
            </div>

            <div className="md:col-span-2 flex justify-end gap-2 mt-2">
              {isEditing && (
                <button
                  type="button"
                  onClick={() => resetForm()}
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Batal
                </button>
              )}
              <button
                type="submit"
                className={`px-6 py-2 text-white rounded-lg shadow-md transition-transform active:scale-95 font-bold ${
                  isEditing
                    ? "bg-yellow-500 hover:bg-yellow-600"
                    : "bg-purple-600 hover:bg-purple-700"
                }`}
              >
                {isEditing ? "Simpan Perubahan" : "Tambah Dokumenter"}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Daftar Dokumenter */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-bold text-gray-700">Daftar Dokumenter</h3>
        </div>

        <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 bg-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200">
          <div className="col-span-2">Thumbnail</div>
          <div className="col-span-4">Judul & Deskripsi</div>
          <div className="col-span-3">Tanggal</div>
          <div className="col-span-3 text-center">Aksi</div>
        </div>

        <div className="divide-y divide-gray-100">
          {dokumenters.length === 0 ? (
            <p className="text-center text-gray-400 py-12">
              Belum ada data dokumenter.
            </p>
          ) : (
            dokumenters.map((doc) => (
              <div
                key={doc._id}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-gray-50 transition-colors group"
              >
                <div className="md:col-span-2">
                  <img
                    src={doc.imageUrl}
                    alt={doc.title}
                    className="w-full h-auto object-cover rounded-md border border-gray-200 shadow-sm"
                  />
                </div>
                <div className="md:col-span-4">
                  <h4 className="font-bold text-gray-800">{doc.title}</h4>
                  <p className="text-sm text-gray-500 line-clamp-2 mt-1">
                    {doc.description}
                  </p>
                </div>
                <div className="md:col-span-3 text-sm text-gray-600 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  {formatDate(doc.date)}
                </div>
                <div className="md:col-span-3 flex justify-start md:justify-center gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleEditClick(doc)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 transition-colors text-sm font-medium"
                  >
                    <Edit className="w-3 h-3" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(doc._id)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors text-sm font-medium"
                  >
                    <Trash2 className="w-3 h-3" /> Hapus
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

export default ManageDokumenter;
