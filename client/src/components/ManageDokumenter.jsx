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

  const loadDokumenter = useCallback(async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/dokumenter/get");
      if (data.success) {
        setDokumenters(data.allDokumenter || []);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }, [backendUrl]);

  useEffect(() => {
    loadDokumenter();
  }, [loadDokumenter]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !image || !date) {
      toast.warn("Harap isi semua kolom dan pilih gambar.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("date", date);

    try {
      const { data } = await axios.post(
        backendUrl + "/api/dokumenter/add",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" }, //! Header penting
        }
      );
      if (data.success) {
        toast.success(data.message);
        //* Reset form
        setTitle("");
        setDescription("");
        setImage(null);
        setDate("");
        e.target.reset();
        await loadDokumenter();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
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
          Tambah Dokumenter Baru
        </h3>
        <div className="p-2">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Gambar
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
          Tambah Dokumenter
        </button>
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
                  src={`${backendUrl}/${doc.imageUrl}`}
                  alt={doc.title}
                  className="w-full h-48 object-cover"
                />
              </span>
              <span>{doc.title}</span>
              <button
                onClick={() => handleDelete(doc._id)}
                className="text-red-500"
              >
                Hapus
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ManageDokumenter;
