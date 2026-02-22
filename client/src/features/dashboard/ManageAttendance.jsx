import { useState } from "react";
import useAttendance from "../../hooks/useAttendance";
import AttendanceFormModal from "../attendance/AttendanceFormModal";
import AttendanceDetail from "../attendance/AttendanceDetail";
import {
  Lock,
  Plus,
  Calendar,
} from "lucide-react";
import { toast } from "react-toastify";
import { formatDate } from "../../utils/utils";

const ManageAttendance = () => {
  const {
    attendances,
    addAttendanceEvent,
    removeAttendanceEvent,
    getAttendances,
    getRecordsByEvent,
    editAttendanceRecord,
    toggleAttendanceLock,
  } = useAttendance();

  //? State Edit mode
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [records, setRecords] = useState([]);

  //? Statistik Kehadiran
  const stats = {
    Hadir: records.filter((r) => r.status === "Hadir").length,
    Izin: records.filter((r) => r.status === "Izin").length,
    Alpa: records.filter((r) => r.status === "Alpa").length,
    Total: records.length,
  };

  const handleCreate = () => {
    setSelectedEvent(null); //? Mode Create
    setShowModal(true);
  };

  const handleSave = async (formData) => {
    let success;
    success = await addAttendanceEvent(formData);
    if (success) setShowModal(false);
  };

  const handleUpdateStatus = async (recordId, status) => {
    const previousRecords = [...records];
    setRecords((prev) =>
      prev.map((r) => (r._id === recordId ? { ...r, status } : r)),
    );
    try {
      const res = await editAttendanceRecord(recordId, status);

      if (res && res.updatedRecord) {
        setRecords((prev) =>
          prev.map((r) =>
            r._id === recordId ? { ...r, ...res.updatedRecord } : r,
          ),
        );
      }
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      // Re-fetch records on failure to restore correct state
      if (selectedEvent) {
        const updatedRecords = await getRecordsByEvent(selectedEvent._id);
        setRecords(updatedRecords);
      }
      setRecords(previousRecords);
      toast.error("Gagal mengubah status, mengembalikan data...");
    }
  };

  const handleToggleLock = async (eventId) => {
    // Optimistically toggle lock in UI immediately to prevent flicker
    setSelectedEvent((prev) =>
      prev ? { ...prev, isLocked: !prev.isLocked } : prev,
    );
    try {
      const res = await toggleAttendanceLock(eventId);
      if (res && typeof res.isLocked !== "undefined") {
        setSelectedEvent((prev) =>
          prev ? { ...prev, isLocked: res.isLocked } : prev,
        );
      } else {
        // If response shape is unexpected, refresh attendances to ensure consistency
        await getAttendances();
      }
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      // On error revert by refetching attendances and selected event
      try {
        const updated = await getAttendances();
        const evt = (updated || []).find((a) => a._id === eventId);
        if (evt) setSelectedEvent(evt);
        // eslint-disable-next-line no-unused-vars
      } catch (e) {
        // ignore further errors; UI will remain in optimistic state
      }
    }
  };

  const handleDeleteEvent = (id) => {
    if (confirm(`Yakin hapus acara presensi ini?`)) {
      removeAttendanceEvent(id);
      setSelectedEvent(null);
      setRecords([]);
    }
  };

  const handleSelectEvent = async (event) => {
    setSelectedEvent(event);
    const eventRecords = await getRecordsByEvent(event._id);
    setRecords(eventRecords);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen bg-gray-50/50">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Manajemen Presensi</h2>
        <div className="flex items-center gap-4">
          <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2">
            <Calendar className="w-4 h-4" /> Total: {attendances.length}
          </div>
          <button
            onClick={handleCreate}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
          >
            <Plus size={18} /> Tambah Acara Presensi
          </button>
        </div>
      </div>

      {/* Layout Grid Utama */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* KOLOM KIRI: Daftar Acara */}
        <div className="lg:col-span-4 flex flex-col gap-4 h-[calc(100vh)]">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col h-full overflow-hidden">
            <div className="p-4 bg-gray-50 border-b border-gray-200 font-semibold text-gray-700 flex items-center gap-2">
              <Calendar className="w-5 h-5" /> Riwayat Acara
            </div>
            <div className="overflow-y-auto p-2 space-y-2 flex-1">
              {attendances.length === 0 ? (
                <p className="text-center text-gray-400 py-8 text-sm">
                  Belum ada acara.
                </p>
              ) : (
                attendances.map((attendance) => (
                  <button
                    key={attendance._id}
                    onClick={() => handleSelectEvent(attendance)}
                    className={`w-full text-left p-4 rounded-lg border transition-all duration-200 group relative ${
                      selectedEvent?._id === attendance._id
                        ? "bg-blue-50 border-blue-300 shadow-sm"
                        : "bg-white border-transparent hover:bg-gray-50 hover:border-gray-200"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <span
                        className={`font-semibold text-base ${
                          selectedEvent?._id === attendance._id
                            ? "text-blue-800"
                            : "text-gray-800"
                        }`}
                      >
                        {attendance.eventName}
                      </span>
                      {attendance.isLocked && (
                        <Lock className="w-4 h-4 text-gray-400" />
                      )}
                    </div>
                    <span className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />{" "}
                      {formatDate(attendance.date)}
                    </span>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>

        {/* KOLOM KANAN: Detail Presensi */}

        <div className="lg:col-span-8">
          {selectedEvent ? (
            <AttendanceDetail
              selectedEvent={selectedEvent}
              records={records}
              stats={stats}
              onDelete={handleDeleteEvent}
              onUpdateStatus={handleUpdateStatus} // Lempar fungsi dari hooks
              onToggleLock={handleToggleLock} // Lempar fungsi dari hooks
            />
          ) : (
            <div className="h-full flex flex-col items-center justify-center bg-white rounded-xl border border-dashed border-gray-300 text-gray-400 p-12">
              <div className="bg-gray-50 p-4 rounded-full mb-4">
                <Calendar className="w-12 h-12 text-gray-300" />
              </div>
              <h3 className="text-lg font-medium text-gray-600">
                Belum ada acara dipilih
              </h3>
              <p className="text-sm max-w-xs text-center mt-1">
                Pilih salah satu acara dari daftar di sebelah kiri atau buat
                acara baru.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modal Form Acara Presensi */}
      {showModal && (
        <AttendanceFormModal
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default ManageAttendance;
