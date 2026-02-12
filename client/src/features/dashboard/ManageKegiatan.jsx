import React, { useState } from "react";
import useKegiatan from "../../hooks/useKegiatans";
import KegiatanFormModal from "../kegiatan/KegiatanFormModal";
import {
  Plus,
  Edit,
  Trash2,
  Image as ImageIcon,
  Calendar,
  CalendarRange,
} from "lucide-react";
import { formatDate } from "../../utils/utils";

const ManageKegiatan = () => {
  const { kegiatans, loading, addKegiatan, editKegiatan, deleteKegiatan } =
    useKegiatan();

  //? State Edit mode
  const [showModal, setShowModal] = useState(false);
  const [selectedKegiatan, setSelectedKegiatan] = useState(null);

  const handleCreate = () => {
    setSelectedKegiatan(null); //? Mode Create
    setShowModal(true);
  };

  const handleEdit = (kegiatan) => {
    setSelectedKegiatan(kegiatan); //? Mode Edit
    setShowModal(true);
  };

  const handleSave = async (formData) => {
    let success;
    if (selectedKegiatan) {
      success = await editKegiatan(selectedKegiatan._id, formData);
    } else {
      success = await addKegiatan(formData);
    }
    if (success) setShowModal(false);
  };

  const handleDelete = (id, name) => {
    if (confirm(`Yakin hapus kegiatan ${name}?`)) deleteKegiatan(id);
  };

  if (loading)
    return <div className="p-10 text-center">Loading kegiatan...</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Manajemen Kegiatan</h2>
        <div className="flex items-center gap-4">
          <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2">
            <CalendarRange className="w-4 h-4" /> Total: {kegiatans.length}
          </div>
          <button
            onClick={handleCreate}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
          >
            <Plus size={18} /> Tambah Kegiatan
          </button>
        </div>
      </div>

      {/* Tabel Kegiatan */}
      <div className="overflow-x-auto bg-white border-gray-200 rounded-lg shadow-md">
        <table className="w-full text-center text-sm text-slate-600">
          <thead className="bg-gray-100 text-gray-500 uppercase font-bold text-xs">
            <tr>
              <th className="px-6 py-3">No</th>
              <th className="px-6 py-3">Foto</th>
              <th className="px-6 py-3">Judul Kegiatan</th>
              <th className="px-6 py-3">Deskripsi</th>
              <th className="px-6 py-3">Time Line</th>
              <th className="px-6 py-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {kegiatans.length > 0 ? (
              kegiatans.map((kegiatan, index) => (
                <tr
                  key={kegiatan._id}
                  className="text-lg border-b hover:bg-slate-50 transition align-middle"
                >
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4 items-center flex justify-center align-middle">
                    {kegiatan.imageUrl ? (
                      <img
                        src={kegiatan.imageUrl}
                        alt={kegiatan.title}
                        className="w-full h-34 object-cover rounded-md border border-gray-200"
                      />
                    ) : (
                      <div className="w-full h-34 flex items-center justify-center bg-gray-100 rounded-md border border-gray-200">
                        <ImageIcon className="w-8 h-8 text-gray-300" />
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-900 align-middle">
                    {kegiatan.title}
                  </td>
                  <td className="px-6 py-4 align-middle">
                    {kegiatan.description}
                  </td>
                  <td className="px-6 py-4 align-middle">
                    <div className="text-[13px] text-gray-400 mt-1">
                      {formatDate(kegiatan.date)} -{" "}
                      {formatDate(kegiatan.endDate)}
                    </div>
                  </td>
                  {/* Buat tombolnya ketengah */}
                  <td className="px-6 py-4 align-middle">
                    <div className="flex justify-center items-center gap-2">
                      <button
                        onClick={() => handleEdit(kegiatan)}
                        className="flex p-2 items-center bg-blue-100 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition shadow-sm"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(kegiatan._id)}
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
                <td colSpan="6" className="text-center py-6 text-slate-400">
                  Tidak ada data Kegiatan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Form Kegiatan */}
      {showModal && (
        <KegiatanFormModal
          kegiatan={selectedKegiatan}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default ManageKegiatan;
