import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/Context";
import { Trash2, Shield, User, Edit, X } from "lucide-react"; // Ikon dari lucide-react
// import { toast } from "react-toastify";

export default function ManageUsers() {
  const { getAllUsers, deleteUser, updateUser, userData } =
    useContext(AppContext);
  const [users, setUsers] = useState([]);

  //? Sstate untuk modal Edit
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState({
    id: "",
    name: "",
    email: "",
    password: "", // Kosongkan defaultnya
    isAccountVerified: false,
  });

  const fetchUsers = async () => {
    const data = await getAllUsers();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  //? Handler Buka Modal
  const handleEditClick = (user) => {
    setEditData({
      id: user._id,
      name: user.name,
      email: user.email,
      password: "", //! Password selalu dikosongkan saat buka modal
      isAccountVerified: user.isAccountVerified,
    });
    setShowEditModal(true);
  };

  //? Handler Simpan Perubahan
  const handleSaveEdit = async (e) => {
    e.preventDefault();
    const success = await updateUser(
      editData.id,
      editData.name,
      editData.email,
      editData.password,
      editData.isAccountVerified,
    );

    if (success) {
      setShowEditModal(false);
      fetchUsers(); //! Refresh data tabel
    }
  };

  //? Handler Hapus
  const handleDelete = async (id, name) => {
    if (window.confirm(`Yakin mau hapus user ${name}?`)) {
      const success = await deleteUser(id);
      if (success) fetchUsers();
    }
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen w-full relative">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Manajemen User</h1>

      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-100 text-slate-700 uppercase font-semibold">
            <tr>
              <th className="px-6 py-3">No</th>
              <th className="px-6 py-3">Nama</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Role</th>
              <th className="px-6 py-3">Status Verifikasi</th>
              <th className="px-6 py-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr
                  key={user._id}
                  className="border-b hover:bg-slate-50 transition"
                >
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4 font-medium text-slate-900">
                    {user.name}
                  </td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold cursor-pointer select-none flex w-fit items-center gap-1 ${
                        user.role === "admin"
                          ? "bg-purple-100 text-purple-600 border border-purple-200"
                          : "bg-green-100 text-green-600 border border-green-200"
                      }`}
                    >
                      {user.role === "admin" ? (
                        <Shield size={12} />
                      ) : (
                        <User size={12} />
                      )}
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {user.isAccountVerified ? (
                      <span className="text-green-500 font-semibold text-xs border border-green-200 bg-green-50 px-2 py-1 rounded">
                        Verified
                      </span>
                    ) : (
                      <span className="text-red-400 text-xs border border-red-200 bg-red-50 px-2 py-1 rounded">
                        Not Verified
                      </span>
                    )}
                  </td>
                  <td
                    className={`px-6 py-4 text-center items-center-safe flex justify-center gap-2 ${user._id === userData._id || user.role === "admin" ? "flex-col" : ""}`}
                  >
                    <button
                      onClick={() => handleEditClick(user)}
                      className="p-2 bg-blue-100 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition shadow-sm"
                      title="Edit User"
                    >
                      <Edit size={18} />
                    </button>

                    {/* Cegah tombol hapus muncul di baris akun sendiri */}
                    {user._id !== userData._id && user.role !== "admin" ? (
                      <button
                        onClick={() => handleDelete(user._id, user.name)}
                        className="p-2 bg-red-100 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition duration-300 shadow-sm"
                        title="Hapus User"
                      >
                        <Trash2 size={18} />
                      </button>
                    ) : (
                      <span className="text-xs text-slate-400 italic">
                        Akun Anda
                      </span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-6 text-slate-400">
                  Tidak ada data user.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL EDIT USER */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* Header Modal */}
            <div className="bg-slate-800 p-4 flex justify-between items-center">
              <h2 className="text-white font-semibold flex items-center gap-2">
                <Edit size={18} /> Edit User
              </h2>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-slate-400 hover:text-white transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form Edit */}
            <form onSubmit={handleSaveEdit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none text-slate-800"
                  value={editData.name}
                  onChange={(e) =>
                    setEditData({ ...editData, name: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none text-slate-800"
                  value={editData.email}
                  onChange={(e) =>
                    setEditData({ ...editData, email: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Password Baru{" "}
                  <span className="text-xs text-slate-400 font-normal">
                    (Kosongkan jika tidak diubah)
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Masukkan password baru..."
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none text-slate-800"
                  value={editData.password}
                  onChange={(e) =>
                    setEditData({ ...editData, password: e.target.value })
                  }
                />
              </div>

              <div className="flex items-center gap-3 p-3 border rounded-lg bg-slate-50">
                <input
                  type="checkbox"
                  id="verifyStatus"
                  checked={editData.isAccountVerified}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      isAccountVerified: e.target.checked,
                    })
                  }
                  className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
                />
                <label
                  htmlFor="verifyStatus"
                  className="text-sm font-medium text-slate-700 cursor-pointer select-none"
                >
                  Akun Terverifikasi
                </label>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="w-1/2 py-2.5 rounded-lg border border-slate-300 text-slate-600 font-medium hover:bg-slate-50 transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium hover:shadow-lg hover:from-blue-600 hover:to-blue-700 transition"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
