import React, { useState, useEffect } from "react";
import Modal from "../../components/common/Modal";
import { Calendar, Type, Image as ImageIcon, Link2 } from "lucide-react";

export default function DokumenterFormModal({ dokumenter, onClose, onSave }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (dokumenter) {
      setTitle(dokumenter.title);
      setDescription(dokumenter.description);
      setImagePreview(dokumenter.imageUrl);
      setDate(dokumenter.date.slice(0, 10)); //! Format YYYY-MM-DD
    }
  }, [dokumenter]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("date", date);
    formData.append("description", description);
    if (image) formData.append("image", image);
    onSave(formData);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <Modal
      title={dokumenter ? "Edit Dokumenter" : "Tambah Dokumenter"}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Upload Area */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center text-center h-40 relative bg-gray-50 hover:bg-gray-100 transition cursor-pointer group">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Preview"
              className="max-h-32 object-contain"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-gray-400">
              <ImageIcon className="w-10 h-10 mb-2" />
              <p className="text-sm">Klik atau seret gambar ke sini</p>
            </div>
          )}
        </div>

        {/* Form Input */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label
              className="text-xs font-medium text-gray-600"
              htmlFor="title"
            >
              Judul
            </label>
            <div className="relative mt-1">
              <Type className="absolute left-2 top-2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full pl-8 py-1.5 text-sm border rounded focus:ring-1 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600" htmlFor="date">
              Tanggal
            </label>
            <div className="relative mt-1">
              <Calendar className="absolute left-2 top-2 w-4 h-4 text-gray-400" />
              <input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full pl-8 py-1.5 text-sm border rounded focus:ring-1 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>
        </div>
        <div>
          <label
            className="block text-sm font-medium mb-1"
            htmlFor="description"
          >
            Deskripsi
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full mt-1 p-2 text-sm border rounded focus:ring-1 focus:ring-purple-500 outline-none"
            required
            rows="3"
          ></textarea>
        </div>
        <div className="pt-2 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="w-1/2 py-2 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50"
          >
            Batal
          </button>
          <button
            type="submit"
            className="w-1/2 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 shadow-lg"
          >
            {dokumenter ? "Simpan Perubahan" : "Tambah Dokumenter"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
