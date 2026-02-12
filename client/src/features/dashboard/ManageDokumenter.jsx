import { useState } from "react";
import useDokumenter from "../../hooks/useDokumenter";
import DokumenterFormModal from "../dokumenter/DokumenterFormModal";
import {
  Plus,
  Edit,
  Trash2,
  Image as ImageIcon,
  Calendar,
  Video,
} from "lucide-react";
import { formatDate } from "../../utils/utils";

const ManageDokumenter = () => {
  const {
    dokumenters,
    loading,
    addDokumenter,
    editDokumenter,
    deleteDokumenter,
  } = useDokumenter();

  //? State Edit mode
  const [showModal, setShowModal] = useState(false);
  const [selectedDokumenter, setSelectedDokumenter] = useState(null);

  const handleCreate = () => {
    setSelectedDokumenter(null); //? Mode Create
    setShowModal(true);
  };

  const handleEdit = (dokumenter) => {
    setSelectedDokumenter(dokumenter); //? Mode Edit
    setShowModal(true);
  };

  const handleSave = async (formData) => {
    let success;
    if (selectedDokumenter) {
      success = await editDokumenter(selectedDokumenter._id, formData);
    } else {
      success = await addDokumenter(formData);
    }
    if (success) setShowModal(false);
  };

  const handleDelete = (id, title) => {
    if (confirm(`Yakin hapus dokumenter ${title}?`)) deleteDokumenter(id);
  };

  if (loading)
    return <div className="p-10 text-center">Loading dokumenter...</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Manajemen Dokumenter
        </h2>
        <div className="flex items-center gap-4">
          <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2">
            <Video className="w-4 h-4" /> Total: {dokumenters.length}
          </div>
          <button
            onClick={handleCreate}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-purple-700 transition"
          >
            <Plus size={18} /> Tambah Dokumenter
          </button>
        </div>
      </div>

      {/* Tabel Dokumenter */}
      <div className="overflow-x-auto bg-white border-gray-200 rounded-lg shadow-md">
        <table className="w-full text-center text-sm text-slate-600">
          <thead className="bg-gray-100 text-gray-500 uppercase font-bold text-xs">
            <tr>
              <th className="px-6 py-3">No</th>
              <th className="px-6 py-3">Thumbnail</th>
              <th className="px-6 py-3">Judul Dokumenter</th>
              <th className="px-6 py-3">Deskripsi</th>
              <th className="px-6 py-3">Tanggal</th>
              <th className="px-6 py-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {dokumenters.length > 0 ? (
              dokumenters.map((dokumenter, index) => (
                <tr
                  key={dokumenter._id}
                  className="text-lg border-b hover:bg-slate-50 transition align-middle"
                >
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4 items-center flex justify-center align-middle">
                    {dokumenter.imageUrl ? (
                      <img
                        src={dokumenter.imageUrl}
                        alt={dokumenter.title}
                        className="w-full h-34 object-cover rounded-md border border-gray-200"
                      />
                    ) : (
                      <div className="w-full h-34 flex items-center justify-center bg-gray-100 rounded-md border border-gray-200">
                        <ImageIcon className="w-8 h-8 text-gray-300" />
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-900 align-middle">
                    {dokumenter.title}
                  </td>
                  <td className="px-6 py-4 align-middle">
                    {dokumenter.description}
                  </td>
                  <td className="px-6 py-4 align-middle">
                    <div className="text-[13px] text-gray-400 mt-1">
                      {formatDate(dokumenter.date)}
                    </div>
                  </td>
                  {/* Buat tombolnya ketengah */}
                  <td className="px-6 py-4 align-middle">
                    <div className="flex justify-center items-center gap-2">
                      <button
                        onClick={() => handleEdit(dokumenter)}
                        className="flex p-2 items-center bg-blue-100 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition shadow-sm"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(dokumenter._id)}
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
                  Tidak ada data Dokumenter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Form Dokumenter */}
      {showModal && (
        <DokumenterFormModal
          dokumenter={selectedDokumenter}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default ManageDokumenter;
