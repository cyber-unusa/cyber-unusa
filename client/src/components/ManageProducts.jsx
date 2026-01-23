import React, { useCallback, useEffect, useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/Context";
import {
  Plus,
  Edit,
  Trash2,
  Image as ImageIcon,
  DollarSign,
  Phone,
  Tag,
  ShoppingBag,
} from "lucide-react";

const ManageProducts = () => {
  const { backendUrl } = useContext(AppContext);
  const [products, setProducts] = useState([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [nomorWA, setNomorWa] = useState("");

  //? State Edit mode
  const [isEditing, setIsEditing] = useState(false);
  const [currentEditId, setCurrentEditId] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const fetchProducts = useCallback(async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/product/get");
      if (data.success) {
        setProducts(data.allProducts || []);
      } else {
        toast.error("Gagal memuat data produk");
      }
    } catch (error) {
      toast.error(error.message);
    }
  }, [backendUrl]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const resetForm = (e) => {
    setName("");
    setPrice("");
    setDescription("");
    setImage(null);
    setNomorWa("");
    setIsEditing(false);
    setCurrentEditId(null);
    setImagePreview(null);
    if (e && e.target) e.target.reset(); // Reset file input
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //? validasi dasar
    if (!name || !price || !description || !nomorWA) {
      toast.warn("Harap isi semua kolom");
      return;
    }

    //? validasi gambar (hanya wajib saat 'Tambah', opsional saat 'Update')
    if (!isEditing && !image) {
      toast.warn("Harap Pilih gambar");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("nomorWa", nomorWA);

    if (image) {
      //! Hanya tambahkan gambar jika ada file baru
      formData.append("image", image);
    }

    try {
      let data;
      if (isEditing) {
        //? LOGIKA UPDATE
        const response = await axios.put(
          `${backendUrl}/api/product/update/${currentEditId}`,
          formData,
          {
            withCredentials: true,
            headers: { "Content-Type": "multipart/form-data" },
          },
        );
        data = response.data;
      } else {
        //? LOGIKA CREATE (TAMBAH)
        const response = await axios.post(
          backendUrl + "/api/product/add",
          formData,
          {
            withCredentials: true,
            headers: { "Content-Type": "multipart/form-data" },
          },
        );
        data = response.data;
      }

      if (data.success) {
        toast.success(data.message);
        resetForm(e);
        await fetchProducts();
      } else {
        toast.error(data.message || "Gagal menambahkan produk");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  //? Fungsi untuk meng-handle klik edit
  const handleEditClick = (product) => {
    setIsEditing(true);
    setCurrentEditId(product._id);
    setName(product.name);
    setPrice(product.price);
    setDescription(product.description);
    setNomorWa(product.nomorWa);
    setImage(null); //! Reset file input
    setImagePreview(product.imageUrl); //! Tampilkan gambar yang ada
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
      try {
        const { data } = await axios.delete(
          `${backendUrl}/api/product/delete/${id}`,
          {
            withCredentials: true,
          },
        );
        if (data.success) {
          toast.success(data.message);
          await fetchProducts();
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const formatRupiah = (num) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(num);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Manajemen Produk</h2>
        <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2">
          <ShoppingBag className="w-4 h-4" /> Total: {products.length}
        </div>
      </div>

      <div
        className={`rounded-xl shadow-sm border p-6 mb-8 transition-all ${
          isEditing
            ? "bg-orange-50 border-orange-200"
            : "bg-white border-gray-200"
        }`}
      >
        <div className="flex items-center gap-2 mb-6 text-lg font-semibold text-gray-700 border-b pb-2">
          {isEditing ? (
            <>
              <Edit className="w-5 h-5 text-orange-600" /> Edit Produk
            </>
          ) : (
            <>
              <Plus className="w-5 h-5 text-yellow-600" /> Tambah Produk Baru
            </>
          )}
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* Upload Gambar */}
          <div className="lg:col-span-1">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Foto Produk
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
                  <p className="text-sm">Upload Foto</p>
                </div>
              )}
            </div>
          </div>

          {/* Inputs */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Nama Produk
              </label>
              <div className="relative">
                <Tag className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nama Barang"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Harga (Rp)
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Nomor WhatsApp
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={nomorWA}
                  onChange={(e) => setNomorWa(e.target.value)}
                  placeholder="6281234..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Deskripsi Produk
              </label>
              <textarea
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Deskripsi..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none resize-none"
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
                className={`px-6 py-2 text-white rounded-lg shadow-md font-bold transition-transform active:scale-95 ${
                  isEditing
                    ? "bg-orange-500 hover:bg-orange-600"
                    : "bg-yellow-600 hover:bg-yellow-700"
                }`}
              >
                {isEditing ? "Simpan Perubahan" : "Tambah Produk"}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* List Produk */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-bold text-gray-700">Katalog Produk</h3>
        </div>
        <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 bg-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200">
          <div className="col-span-2">Foto</div>
          <div className="col-span-4">Detail Produk</div>
          <div className="col-span-3">Harga & Kontak</div>
          <div className="col-span-3 text-center">Aksi</div>
        </div>
        <div className="divide-y divide-gray-100">
          {products.length === 0 ? (
            <p className="text-center text-gray-400 py-12">
              Belum ada produk di etalase.
            </p>
          ) : (
            products.map((product) => (
              <div
                key={product._id}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-gray-50 transition-colors group"
              >
                <div className="md:col-span-2">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-20 object-cover rounded-md border border-gray-200"
                  />
                </div>
                <div className="md:col-span-4">
                  <h4 className="font-bold text-gray-800">{product.name}</h4>
                  <p className="text-xs text-gray-500 line-clamp-2 mt-1">
                    {product.description}
                  </p>
                </div>
                <div className="md:col-span-3 text-sm">
                  <div className="font-bold text-green-600">
                    {formatRupiah(product.price)}
                  </div>
                  <div className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                    <Phone className="w-3 h-3" /> {product.nomorWa}
                  </div>
                </div>
                <div className="md:col-span-3 flex justify-start md:justify-center gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleEditClick(product)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 transition-colors text-sm font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors text-sm font-medium"
                  >
                    Hapus
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

export default ManageProducts;
