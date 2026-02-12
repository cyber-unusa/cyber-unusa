import React, { useState, useEffect } from "react";
import Modal from "../../components/common/Modal";
import { Calendar, Type, Image as ImageIcon, Link2 } from "lucide-react";

export default function KegiatanFormModal({ kegiatan, onClose, onSave }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [endDate, setEndDate] = useState("");

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (kegiatan) {
      setTitle(kegiatan.title);
      setDescription(kegiatan.description);
      setLink(kegiatan.link);
      setImagePreview(kegiatan.imageUrl);
      setEndDate(kegiatan.endDate.slice(0, 10)); //! Format YYYY-MM-DD
    }
  }, [kegiatan]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("endDate", endDate);
    formData.append("description", description);
    formData.append("link", link);

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
      title={kegiatan ? "Edit Kegiatan" : "Tambah Kegiatan"}
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
              className="h-full object-contain rounded"
            />
          ) : (
            <div className="text-gray-400">
              <ImageIcon className="w-8 h-8 mx-auto mb-2" />
              <p className="text-xs">Klik untuk upload gambar</p>
            </div>
          )}
        </div>

        {/* Inputs */}
        <div>
          <label className="text-xs font-medium text-gray-600">
            Nama Kegiatan
          </label>
          <div className="relative mt-1">
            <Type className="absolute left-2 top-2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full pl-8 py-1.5 text-sm border rounded focus:ring-1 focus:ring-blue-500 outline-none"
              placeholder="Nama Kegiatan..."
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-medium text-gray-600">
              Batas Pendaftaran
            </label>
            <div className="relative mt-1">
              <Calendar className="absolute left-2 top-2 w-4 h-4 text-gray-400" />
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
                className="w-full pl-8 py-1.5 text-sm border rounded focus:ring-1 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600">
              Link Pendaftaran (GForm/Lainnya)
            </label>
            <div className="relative mt-1">
              <Link2 className="absolute left-2 top-2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                required
                className="w-full pl-8 py-1.5 text-sm border rounded focus:ring-1 focus:ring-blue-500 outline-none"
                placeholder="https://..."
              />
            </div>
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-gray-600">Deskripsi</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows="2"
            className="w-full mt-1 p-2 text-sm border rounded focus:ring-1 focus:ring-blue-500 outline-none"
            placeholder="Deskripsi kegiatan..."
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
            className="w-1/2 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 shadow-lg"
          >
            {kegiatan ? "Simpan Perubahan" : "Tambah Kegiatan"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
