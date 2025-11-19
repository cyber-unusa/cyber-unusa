import React, { useState, useEffect, useContext, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/appContext";

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
    if (e) e.target.reset(); // Reset file input
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !image) {
      toast.warn("Harap isi semua kolom dan pilih gambar.");
      return;
    }

    //? validasi gambar (hanya wajib saat 'Tambah', opsional saat 'Update')
    if (!isEditing && image) {
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
        const response = await axios.post(
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
    setDate(doc.date);
    setImage(null);
    setImagePreview(doc.imageUrl);
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

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Manajemen Dokumenter</h2>
      <form
        onSubmit={handleSubmit}
        className="mb-6 p-4 border border-zinc-200 rounded"
      >
        <h3 className="text-xl font-semibold text-gray-700 p-2">
          {isEditing ? "Update Dokumenter" : "Tambah Dokumenter"}
        </h3>

        {isEditing && imagePreview && (
          <div className="p-2">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Gambar Saat Ini
            </label>
            <img
              src={imagePreview}
              alt="Preview"
              className="w-32 h-32 object-cover rounded"
            />
          </div>
        )}

        <div className="p-2">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            {isEditing ? "Ganti Gambar" : "Gambar"}
          </label>
          <input
            type="file"
            name="image"
            id="image"
            accept="image/*" // Batasi hanya untuk file gambar
            onChange={(e) => setImage(e.target.files[0])} // Simpan file ke state
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
        <div className="p-2">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Judul
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Masukkan judul dokumenter"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="p-2">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Deskripsi
          </label>
          <textarea
            name="description"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
            placeholder="Masukkan deskripsi singkat"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
        </div>
        <div className="p-2">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Waktu Pelaksanaan
          </label>
          <input
            type="date"
            name="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          ></input>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-2 px-4 mt-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {isEditing ? "Update Dokummenter" : "Tambah Dokumenter"}
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
        {dokumenters &&
          dokumenters.map((doc) => (
            <div
              key={doc._id}
              className="flex justify-between items-center p-2 border-b"
            >
              <span>
                <img
                  src={doc.imageUrl}
                  alt={doc.title}
                  className="w-full h-48 object-cover"
                />
              </span>
              <span>{doc.title}</span>
              <div className="flex gap-2 justify-self-end">
                <button
                  onClick={() => handleEditClick(doc)}
                  className="bg-[var(--yel)] text-white"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(doc._id)}
                  className="bg-red-500 text-white"
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

export default ManageDokumenter;
