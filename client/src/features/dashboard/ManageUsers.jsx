import React, { useContext, useState } from "react";
import { AppContext } from "../../context/Context";
import { Trash2, Shield, User, Edit } from "lucide-react"; // Ikon dari lucide-react
import useUsers from "../../hooks/useUser";
import UserEditModal from "../users/UserEditModal";

export default function ManageUsers() {
  const { userData } = useContext(AppContext);
  const { users, loading, deleteUser, updateUser } = useUsers();

  //? State untuk modal Edit
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  //? Handler Buka Modal
  const handleEditClick = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  //? Handler Simpan Perubahan
  const handleSaveEdit = async (formData) => {
    const success = await updateUser(selectedUser._id, formData);
    if (success) setShowEditModal(false);
  };

  //? Handler Hapus
  const handleDelete = (id, name) => {
    if (window.confirm(`Yakin mau hapus user ${name}?`)) deleteUser(id);
  };

  if (loading) return <div className="p-6">Loading data user...</div>;

  return (
    <div className="p-6 bg-white min-h-screen w-full relative">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Manajemen User</h1>
        <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2">
          <User className="w-4 h-4" /> Total: {users.length}
        </div>
      </div>

      <div className="overflow-x-auto bg-white border-gray-200 rounded-lg shadow-md">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-gray-100 text-gray-500 uppercase font-bold text-xs">
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
                        Akun Admin
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
        <UserEditModal
          user={selectedUser}
          onClose={() => setShowEditModal(false)}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
}
