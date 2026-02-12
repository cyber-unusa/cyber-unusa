import { useState } from "react";
import useAttendance from "../../hooks/useAttendance";
import AttendanceFormModal from "../attendance/AttendanceFormModal";
import {
  Lock,
  Unlock,
  Trash2,
  Plus,
  Calendar,
  Users,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
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
    // Optimistic update to avoid UI flicker: update local state immediately
    setRecords((prev) =>
      prev.map((r) => (r._id === recordId ? { ...r, status } : r)),
    );
    try {
      const res = await editAttendanceRecord(recordId, status);
      // If the service returned an updated record, merge it to keep data consistent
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
        <div className="lg:col-span-4 flex flex-col gap-4 h-[calc(100vh-200px)]">
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
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col h-full">
              {/* Header Detail */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                      {selectedEvent.eventName}
                      {selectedEvent.isLocked && (
                        <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs rounded-full border border-red-200 font-medium flex items-center gap-1">
                          <Lock className="w-3 h-3" /> Terkunci
                        </span>
                      )}
                    </h3>
                    <p className="text-gray-500 text-sm mt-1 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />{" "}
                      {formatDate(selectedEvent.date)}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleToggleLock(selectedEvent._id)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all ${
                        selectedEvent.isLocked
                          ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200 border border-yellow-200"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200"
                      }`}
                    >
                      {selectedEvent.isLocked ? (
                        <Unlock className="w-4 h-4" />
                      ) : (
                        <Lock className="w-4 h-4" />
                      )}
                      {selectedEvent.isLocked ? "Buka Kunci" : "Kunci Presensi"}
                    </button>
                    <button
                      onClick={() => handleDeleteEvent(selectedEvent._id)}
                      className="px-4 py-2 bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 rounded-lg text-sm font-medium flex items-center gap-2 transition-all"
                    >
                      <Trash2 className="w-4 h-4" /> Hapus
                    </button>
                  </div>
                </div>

                {/* Statistik Card */}
                <div className="grid grid-cols-4 gap-4">
                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 text-center">
                    <span className="block text-2xl font-bold text-blue-600">
                      {stats.Total}
                    </span>
                    <span className="text-xs text-blue-500 font-medium uppercase">
                      Total
                    </span>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg border border-green-100 text-center">
                    <span className="block text-2xl font-bold text-green-600">
                      {stats.Hadir}
                    </span>
                    <span className="text-xs text-green-500 font-medium uppercase">
                      Hadir
                    </span>
                  </div>
                  <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-100 text-center">
                    <span className="block text-2xl font-bold text-yellow-600">
                      {stats.Izin}
                    </span>
                    <span className="text-xs text-yellow-500 font-medium uppercase">
                      Izin
                    </span>
                  </div>
                  <div className="bg-red-50 p-3 rounded-lg border border-red-100 text-center">
                    <span className="block text-2xl font-bold text-red-600">
                      {stats.Alpa}
                    </span>
                    <span className="text-xs text-red-500 font-medium uppercase">
                      Alpa
                    </span>
                  </div>
                </div>
              </div>

              {/* Tabel Presensi */}
              <div className="overflow-x-auto">
                <div className="min-w-full inline-block align-middle">
                  <div className="bg-gray-50 border-b px-6 py-3 grid grid-cols-12 gap-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    <div className="col-span-5">Nama Anggota</div>
                    <div className="col-span-7 text-center">
                      Status Kehadiran
                    </div>
                  </div>

                  <div className="divide-y divide-gray-100">
                    {records.length === 0 ? (
                      <div className="text-center py-12 text-gray-400 flex flex-col items-center">
                        <Users className="w-10 h-10 mb-2 opacity-20" />
                        <p>Tidak ada data anggota.</p>
                      </div>
                    ) : (
                      records.map((record) => (
                        <div
                          key={record._id}
                          className="px-6 py-3 grid grid-cols-12 gap-4 items-center hover:bg-gray-50 transition-colors"
                        >
                          <div
                            className="col-span-5 font-medium text-gray-800 truncate"
                            title={record.memberName}
                          >
                            {record.memberName}
                          </div>
                          <div className="col-span-7 flex justify-center gap-2">
                            {[
                              {
                                label: "Hadir",
                                color: "green",
                                icon: CheckCircle,
                              },
                              {
                                label: "Izin",
                                color: "yellow",
                                icon: AlertCircle,
                              },
                              { label: "Alpa", color: "red", icon: XCircle },
                            ].map((statusBtn) => {
                              const isActive =
                                record.status === statusBtn.label;
                              const isDisabled = selectedEvent.isLocked;

                              // Dynamic Classes
                              let btnClass =
                                "flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium transition-all border ";
                              if (isActive) {
                                if (statusBtn.color === "green")
                                  btnClass +=
                                    "bg-green-500 text-white border-green-600 shadow-sm";
                                else if (statusBtn.color === "yellow")
                                  btnClass +=
                                    "bg-yellow-500 text-white border-yellow-600 shadow-sm";
                                else
                                  btnClass +=
                                    "bg-red-500 text-white border-red-600 shadow-sm";

                                if (isDisabled)
                                  btnClass += " opacity-60 cursor-not-allowed";
                                else btnClass += " scale-105";
                              } else {
                                btnClass +=
                                  "bg-white text-gray-500 border-gray-200 hover:bg-gray-50";
                                if (isDisabled)
                                  btnClass +=
                                    " opacity-30 cursor-not-allowed bg-gray-100";
                              }

                              return (
                                <button
                                  key={statusBtn.label}
                                  disabled={isDisabled}
                                  onClick={() =>
                                    handleUpdateStatus(
                                      record._id,
                                      statusBtn.label,
                                    )
                                  }
                                  className={btnClass}
                                >
                                  <statusBtn.icon className="w-3 h-3" />
                                  <span className="hidden sm:inline">
                                    {statusBtn.label}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Empty State Right Column
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
