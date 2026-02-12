import React, { useState, useEffect } from "react";
import Modal from "../../components/common/Modal";
import { Calendar, Type } from "lucide-react";

export default function AttendanceFormModal({ attendance, onClose, onSave }) {
  const [eventName, setEventName] = useState("");
  const [date, setDate] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (attendance) {
      setEventName(attendance.eventName);
      setDate(attendance.date.slice(0, 10)); //! Format YYYY-MM-DD
    }
  }, [attendance]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { eventName, date };
    await onSave(formData);
    setSubmitting(false);
  };

  return (
    <Modal
      title={attendance ? "Edit Acara Presensi" : "Tambah Acara Presensi"}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-xs font-medium text-gray-600">
            Nama Kegiatan
          </label>
          <div className="relative mt-1">
            <Type className="absolute left-2 top-2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              required
              className="w-full pl-8 py-1.5 text-sm border rounded focus:ring-1 focus:ring-blue-500 outline-none"
              placeholder="Contoh: Rapat Rutin"
            />
          </div>
        </div>
        <div>
          <label className="text-xs font-medium text-gray-600">Tanggal</label>
          <div className="relative mt-1">
            <Calendar className="absolute left-2 top-2 w-4 h-4 text-gray-400" />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              disabled={submitting}
              className="w-full pl-8 py-1.5 text-sm border rounded focus:ring-1 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>
        <div className="pt-2 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={submitting}
            className="w-1/2 py-2 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="w-1/2 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 shadow-lg disabled:opacity-60"
          >
            {submitting
              ? "Menyimpan..."
              : attendance
                ? "Simpan Perubahan"
                : "Tambah Acara Presensi"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
