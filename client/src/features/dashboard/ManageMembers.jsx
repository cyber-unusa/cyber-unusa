import React, { useState } from "react";
import { useMembers } from "../../hooks/useMember";
import MemberFormModal from "../member/MemberFormModal";
import { FolderOpen, Pencil, Trash2, Plus } from "lucide-react";

export default function ManageMembers() {
  const { members, loading, addMember, editMember, deleteMember } =
    useMembers();
  const [showModal, setShowModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  const handleCreate = () => {
    setSelectedMember(null);
    setShowModal(true);
  };

  const handleEdit = (member) => {
    setSelectedMember(member);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (
      window.confirm(
        "Yakin hapus anggota? Data absensi terkait juga akan hilang.",
      )
    ) {
      deleteMember(id);
    }
  };

  const handleSave = async (formData) => {
    let success;
    if (selectedMember) {
      success = await editMember(selectedMember._id, formData);
    } else {
      success = await addMember(formData);
    }
    if (success) setShowModal(false);
  };

  if (loading)
    return <div className="p-8 text-center">Loading Data Anggota...</div>;

  return (
    <div className="p-6 bg-white min-h-screen w-full relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Kelola Anggota</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm bg-blue-100 text-blue-800 px-4 py-2 rounded-lg font-medium">
            Total Member: {members.length}
          </span>
          <button
            onClick={handleCreate}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition shadow-sm"
          >
            <Plus size={18} /> Tambah Anggota
          </button>
        </div>
      </div>

      {/* Tabel */}
      <div className="overflow-x-auto bg-white border-gray-200 rounded-lg shadow-md">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-gray-100 text-gray-500 uppercase font-bold text-xs">
            <tr>
              <th className="px-6 py-3">No</th>
              <th className="px-6 py-3">Nama Lengkap</th>
              <th className="px-6 py-3">Nim</th>
              <th className="px-6 py-3">Divisi</th>
              <th className="px-6 py-3">Kehadiran</th>
              <th className="px-6 py-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {members.length > 0 ? (
              members.map((member, index) => (
                <tr
                  key={member._id}
                  className="border-b hover:bg-slate-50 transition"
                >
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4 font-medium text-slate-900">
                    {member.name}
                  </td>
                  <td className="px-6 py-4">{member.nim}</td>
                  <td className="px-6 py-4">
                    {member.divisi !== "BPH" ? (
                      <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-sm font-semibold rounded-full border border-blue-100">
                        {member.role} {member.divisi}
                      </span>
                    ) : (
                      <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-sm font-semibold rounded-full border border-blue-100">
                        {member.role}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div
                      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold ${
                        member.attendancePercentage >= 75
                          ? "bg-green-100 text-green-700"
                          : member.attendancePercentage >= 50
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-50 text-red-600"
                      }`}
                    >
                      {member.attendancePercentage}%
                    </div>
                    <div className="text-[10px] text-gray-400 mt-1">
                      {member.totalHadir} / {member.totalRecords} Acara
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center items-center-safe flex justify-center gap-2">
                    <button
                      onClick={() => handleEdit(member)}
                      className="p-2 bg-blue-100 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition shadow-sm"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(member._id)}
                      className="p-2 bg-red-100 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition duration-300 shadow-sm"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-6 text-slate-400">
                  Tidak ada data Member.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <MemberFormModal
          member={selectedMember}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
