import React, { useState, useEffect } from "react";
import Modal from "../../components/common/Modal";
import { User, CreditCard, ImageIcon } from "lucide-react";

export default function MemberFormModal({ member, onClose, onSave }) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("Staff");
  const [nim, setNim] = useState("");
  const [divisi, setDivisi] = useState("PSDM");

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (member) {
      setName(member.name);
      setRole(member.role);
      setNim(member.nim);
      setDivisi(member.divisi);
      setImagePreview(member.imageUrl);
      if (member.role !== "Staff" && member.role !== "Kadiv.") {
        setDivisi("BPH");
      } else {
        setDivisi(member.divisi || "PSDM");
      }
    } else {
      // Reset form jika sedang tambah data baru
      setName("");
      setRole("Staff");
      setNim("");
      setDivisi("PSDM");
      setImage(null);
      setImagePreview(null);
    }
  }, [member]);

  const handleRoleChange = (e) => {
    const selectedRole = e.target.value;
    setRole(selectedRole);

    if (selectedRole !== "Staff" && selectedRole !== "Kadiv.") {
      //? Jika pilih selain Staff/Kadiv -> Paksa Divisi jadi BPH
      setDivisi("BPH");
    } else {
      //? Jika pilih Staff/Kadiv tapi state Divisi masih BPH -> Kembalikan ke PSDM (Default)
      if (divisi === "BPH") {
        setDivisi("PSDM");
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("role", role);
    formData.append("nim", nim);
    formData.append("divisi", divisi);
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
      title={member ? "Edit Data Anggota" : "Tambah Anggota Baru"}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
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

        {/* Input Nama */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nama Lengkap <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <User className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              required
              className="w-full pl-10 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Nama Lengkap"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        {/* Input NIM */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            NIM <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <CreditCard className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              required
              className="w-full pl-10 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Nomor Induk Mahasiswa"
              value={nim}
              onChange={(e) => setNim(e.target.value)}
            />
          </div>
        </div>

        {/* Role */}
        <div className="md:col-span-1">
          <label className="text-sm font-medium text-gray-600 mb-1">
            Jabatan (Role) <span className="text-red-500">*</span>
          </label>
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            value={role}
            onChange={handleRoleChange}
          >
            <option value="Staff">Staff</option>
            <option value="Kadiv.">Kepala Divisi (Kadiv)</option>
            <option value="Sekertaris 1">Sekertaris 1</option>
            <option value="Sekertaris 2">Sekertaris 2</option>
            <option value="Bendahara Umum">Bendahara Umum</option>
            <option value="Wakil Ket. Umum">Wakil Ket. Umum</option>
            <option value="Ketua Umum">Ketua Umum</option>
          </select>
        </div>

        {/* Input Divisi */}
        <div className="md:col-span-1">
          <label className="text-sm font-medium text-gray-600 mb-1">
            Divisi <span className="text-red-500">*</span>
          </label>
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            value={divisi}
            onChange={(e) => setDivisi(e.target.value)}
          >
            {role === "Kadiv." || role === "Staff" ? (
              <>
                <option value="PSDM">PSDM</option>
                <option value="Pendidikan">Pendidikan</option>
                <option value="Pengmas">Pengmas</option>
                <option value="Innovation & Entrepreneur">
                  Innovation & Entrepreneur
                </option>
              </>
            ) : (
              <option value="BPH">Badan Pengurus Harian (BPH)</option>
            )}
          </select>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
          >
            Batal
          </button>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
          >
            {member ? "Simpan Perubahan" : "Tambah Anggota"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
