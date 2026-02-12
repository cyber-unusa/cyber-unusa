import React, { useEffect, useState } from "react";
import Modal from "../../components/common/Modal";
import { Edit } from "lucide-react";

export default function UserEditModal({ user, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "", // Kosong defaultnya
    isAccountVerified: false,
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        password: "",
        isAccountVerified: user.isAccountVerified,
      });
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Modal
      title={
        <>
          <Edit size={18} /> Edit User
        </>
      }
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Input Nama */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Nama Lengkap
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        {/* Input Email */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Email
          </label>
          <input
            type="email"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
        </div>

        {/* Input Password (Opsional) */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Password Baru{" "}
            <span className="text-xs text-slate-400">(Opsional)</span>
          </label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </div>

        {/* Checkbox Verifikasi */}
        <div className="flex items-center gap-3 p-3 border rounded-lg bg-slate-50">
          <input
            type="checkbox"
            checked={formData.isAccountVerified}
            onChange={(e) =>
              setFormData({ ...formData, isAccountVerified: e.target.checked })
            }
            className="w-5 h-5 text-green-600 rounded cursor-pointer"
          />
          <label className="text-sm font-medium text-slate-700">
            Akun Terverifikasi
          </label>
        </div>

        {/* Tombol Aksi */}
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
            className="w-1/2 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 shadow-lg"
          >
            Simpan
          </button>
        </div>
      </form>
    </Modal>
  );
}
