import React, { useState, useEffect } from "react";
import Modal from "../../components/common/Modal";
import { ImageIcon, Tag, DollarSign, Phone } from "lucide-react";

export default function ProductFormModal({ product, onClose, onSave }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [nomorWa, setNomorWa] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setDescription(product.description);
      setNomorWa(product.nomorWa);
      setImagePreview(product.imageUrl); // Tampilkan gambar lama
    }
  }, [product]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("nomorWa", nomorWa);
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
    <Modal title={product ? "Edit Produk" : "Tambah Produk"} onClose={onClose}>
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
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-medium text-gray-600">
              Nama Produk
            </label>
            <div className="relative mt-1">
              <Tag className="absolute left-2 top-2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full pl-8 py-1.5 text-sm border rounded focus:ring-1 focus:ring-yellow-500 outline-none"
                placeholder="Nama..."
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600">
              Harga (Rp)
            </label>
            <div className="relative mt-1">
              <DollarSign className="absolute left-2 top-2 w-4 h-4 text-gray-400" />
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                className="w-full pl-8 py-1.5 text-sm border rounded focus:ring-1 focus:ring-yellow-500 outline-none"
                placeholder="0"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-gray-600">WhatsApp</label>
          <div className="relative mt-1">
            <Phone className="absolute left-2 top-2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={nomorWa}
              onChange={(e) => setNomorWa(e.target.value)}
              required
              className="w-full pl-8 py-1.5 text-sm border rounded focus:ring-1 focus:ring-yellow-500 outline-none"
              placeholder="628..."
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-gray-600">Deskripsi</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows="2"
            className="w-full mt-1 p-2 text-sm border rounded focus:ring-1 focus:ring-yellow-500 outline-none"
            placeholder="Deskripsi produk..."
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
            className="w-1/2 py-2 rounded-lg bg-yellow-600 text-white hover:bg-yellow-700 shadow-lg"
          >
            {product ? "Simpan Perubahan" : "Tambah Produk"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
