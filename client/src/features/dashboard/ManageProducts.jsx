import { useState } from "react";
import useProducts from "../../hooks/useProducts";
import ProductFormModal from "../products/ProductFormModal";
import { Plus, Edit, Trash2, Phone, ShoppingBag } from "lucide-react";
import { formatRupiah } from "../../utils/utils";

const ManageProducts = () => {
  const { products, loading, addProduct, editProduct, deleteProduct } =
    useProducts();

  //? State Edit mode
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleCreate = () => {
    setSelectedProduct(null); //? Mode Create
    setShowModal(true);
  };

  const handleEdit = (products) => {
    setSelectedProduct(products); //? Mode Edit
    setShowModal(true);
  };

  const handleSave = async (formData) => {
    let success;
    if (selectedProduct) {
      success = await editProduct(selectedProduct._id, formData);
    } else {
      success = await addProduct(formData);
    }
    if (success) setShowModal(false);
  };

  const handleDelete = (id, name) => {
    if (confirm(`Yakin hapus produk ${name}?`)) deleteProduct(id);
  };

  if (loading) return <div className="p-10 text-center">Loading produk...</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Manajemen Produk</h2>
        <div className="flex items-center gap-4">
          <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2">
            <ShoppingBag className="w-4 h-4" /> Total: {products.length}
          </div>
          <button
            onClick={handleCreate}
            className="bg-yellow-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-yellow-700 transition"
          >
            <Plus size={18} /> Tambah Produk
          </button>
        </div>
      </div>

      {/* Tabel Produk */}
      <div className="overflow-x-auto bg-white border-gray-200 rounded-lg shadow-md">
        <table className="w-full text-center text-sm text-slate-600">
          <thead className="bg-gray-100 text-gray-500 uppercase font-bold text-xs">
            <tr>
              <th className="px-6 py-3">No</th>
              <th className="px-6 py-3">Foto</th>
              <th className="px-6 py-3">Detail Produk</th>
              <th className="px-6 py-3">Harga & Kontak</th>
              <th className="px-6 py-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product, index) => (
                <tr
                  key={product._id}
                  className="text-lg border-b hover:bg-slate-50 transition align-middle"
                >
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4 items-center flex justify-center align-middle">
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.title}
                        className="w-full h-34 object-cover rounded-md border border-gray-200"
                      />
                    ) : (
                      <div className="w-full h-34 flex items-center justify-center bg-gray-100 rounded-md border border-gray-200">
                        <ImageIcon className="w-8 h-8 text-gray-300" />
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 align-middle">
                    <h4 className="font-bold text-lg text-gray-800">
                      {product.name}
                    </h4>
                    <div className="flex-wrap w-10/12 items-center">
                      <p className="text-sm text-center text-gray-500 line-clamp-2 mt-1">
                        {product.description}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 align-middle">
                    <div className="font-bold text-green-600">
                      {formatRupiah(product.price)}
                    </div>
                    <div className="lg:justify-center text-sm text-gray-400 mt-1 flex items-center gap-1">
                      <Phone className="w-4 h-4" /> {product.nomorWa}
                    </div>
                  </td>
                  <td className="px-6 py-4 align-middle">
                    <div className="flex justify-center items-center gap-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="flex p-2 items-center bg-blue-100 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition shadow-sm"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="flex p-2 items-center bg-red-100 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition duration-300 shadow-sm"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-6 text-slate-400">
                  Tidak ada data Produk.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <ProductFormModal
          product={selectedProduct}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default ManageProducts;
