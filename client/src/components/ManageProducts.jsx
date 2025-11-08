import React, { useCallback, useEffect, useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/appContext";

const ManageProducts = () => {
  const { backendUrl } = useContext(AppContext);
  const [products, setProducts] = useState([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [nomorWA, setNomorWa] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !price || !description || !image || !nomorWA) {
      toast.warn("Harap isi semua kolom dan pilih gambar.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("nomorWa", nomorWA);

    try {
      const { data } = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" }, //! Header penting
        }
      );

      if (data.success) {
        toast.success(data.message);
        setName("");
        setPrice("");
        setDescription("");
        setImage(null);
        setNomorWa("");
        fetchProducts();
        e.target.reset();
        await fetchProducts();
      } else {
        toast.error(data.message || "Gagal menambahkan produk");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
      try {
        const { data } = await axios.delete(
          `${backendUrl}/api/product/delete/${id}`,
          {
            withCredentials: true,
          }
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

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Manajemen Products</h2>
      <form
        onSubmit={handleSubmit}
        className="mb-6 p-4 border border-zinc-200 rounded"
      >
        <h3 className="text-xl font-semibold text-gray-700 p-2">
          Tambah Product Baru
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
            htmlFor="name"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Nama Produk
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Masukkan nama Produk"
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
            htmlFor="price"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Harga Product
          </label>
          <input
            type="number"
            name="price"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="p-2">
          <label
            htmlFor="link"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Nomor Wa Order
          </label>
          <input
            type="text"
            name="link"
            id="link"
            value={nomorWA}
            onChange={(e) => setNomorWa(e.target.value)}
            placeholder="Masukkan nomor WA"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-2 px-4 mt-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Tambah Produk
        </button>
      </form>
      <div>
        {products &&
          products.map((doc) => (
            <div
              key={doc._id}
              className="flex justify-between items-center p-2 border-b"
            >
              <span>
                <img
                  src={doc.imageUrl}
                  alt={doc.name}
                  className="w-full h-48 object-cover"
                />
              </span>
              <span>{doc.name}</span>
              <span>{doc.price}</span>
              <a href={doc.linkWa}>Link Pendaftaran</a>
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

export default ManageProducts;
