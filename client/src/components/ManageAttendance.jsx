import React, { useState, useEffect, useContext, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/appContext";
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

const ManageAttendance = () => {
  const { backendUrl } = useContext(AppContext);
  const [events, setEvents] = useState([]);
  const [records, setRecords] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");

  // Statistik kehadiran
  const stats = {
    Hadir: records.filter((r) => r.status === "Hadir").length,
    Izin: records.filter((r) => r.status === "Izin").length,
    Alpa: records.filter((r) => r.status === "Alpa").length,
    Total: records.length,
  };

  const fetchEvents = useCallback(async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/attendance/events/get",
        {
          withCredentials: true,
        }
      );
      if (data.success) {
        setEvents(data.allEvents || []);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }, [backendUrl]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        backendUrl + "/api/attendance/event/create",
        { eventName, date: eventDate },
        { withCredentials: true }
      );
      if (data.success) {
        toast.success(data.message);
        setEventName("");
        setEventDate("");
        await fetchEvents();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSelectEvent = async (event) => {
    setSelectedEvent(event);
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/attendance/records/${event._id}`,
        { withCredentials: true }
      );
      if (data.success) {
        setRecords(data.records || []);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleToggleLock = async (eventId) => {
    try {
      const { data } = await axios.put(
        `${backendUrl}/api/attendance/records/toggle-lock/${eventId}`,
        {},
        { withCredentials: true }
      );

      if (data.success) {
        toast.success(data.message);

        //* Update state local 'selectedEvent' agar UI langsung berubah
        if (selectedEvent && selectedEvent._id === eventId) {
          setSelectedEvent({ ...selectedEvent, isLocked: data.isLocked });
        }

        await fetchEvents();

        if (selectedEvent && selectedEvent._id === eventId) {
          const recordResponse = await axios.get(
            `${backendUrl}/api/attendance/records/${eventId}`,
            { withCredentials: true }
          );
          if (recordResponse.data.success) {
            setRecords(recordResponse.data.records);
          }
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleUpdateStatus = async (recordId, status) => {
    if (selectedEvent.isLocked) {
      toast.warn("Buka kunci terlebih dahulu untuk mengubah data.");
      return;
    }

    try {
      const { data } = await axios.put(
        `${backendUrl}/api/attendance/record/update/${recordId}`,
        { status },
        { withCredentials: true }
      );
      if (data.success) {
        // toast.success(data.message);
        //Todo perbarui state records secara lokal untuk respons instan
        setRecords((prevRecords) =>
          prevRecords.map((record) =>
            record._id === recordId ? { ...record, status: status } : record
          )
        );
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (
      window.confirm(
        "Yakin ingin menghapus acara ini? Semua data absensi terkait akan hilang."
      )
    ) {
      try {
        const { data } = await axios.delete(
          `${backendUrl}/api/attendance/event/delete/${eventId}`,
          { withCredentials: true }
        );
        if (data.success) {
          toast.success(data.message);
          setSelectedEvent(null);
          setRecords([]);
          await fetchEvents();
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen bg-gray-50/50">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Manajemen Absensi</h2>
      </div>

      {/* Form Buat Acara Baru */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
        <div className="flex items-center gap-2 mb-4 text-gray-700 font-semibold text-lg border-b pb-2">
          <Plus className="w-5 h-5 text-blue-600" /> Buat Acara Baru
        </div>
        <form
          onSubmit={handleCreateEvent}
          className="flex flex-col md:flex-row gap-4 items-end"
        >
          <div className="w-full md:w-1/2">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Nama Acara
            </label>
            <input
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              placeholder="Contoh: Rapat Rutin"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
          <div className="w-full md:w-1/3">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Tanggal
            </label>
            <input
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full md:w-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors shadow-sm flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" /> Buat
          </button>
        </form>
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
              {events.length === 0 ? (
                <p className="text-center text-gray-400 py-8 text-sm">
                  Belum ada acara.
                </p>
              ) : (
                events.map((event) => (
                  <button
                    key={event._id}
                    onClick={() => handleSelectEvent(event)}
                    className={`w-full text-left p-4 rounded-lg border transition-all duration-200 group relative ${
                      selectedEvent?._id === event._id
                        ? "bg-blue-50 border-blue-300 shadow-sm"
                        : "bg-white border-transparent hover:bg-gray-50 hover:border-gray-200"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <span
                        className={`font-semibold text-base ${
                          selectedEvent?._id === event._id
                            ? "text-blue-800"
                            : "text-gray-800"
                        }`}
                      >
                        {event.eventName}
                      </span>
                      {event.isLocked && (
                        <Lock className="w-4 h-4 text-gray-400" />
                      )}
                    </div>
                    <span className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {formatDate(event.date)}
                    </span>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>

        {/* KOLOM KANAN: Detail Absensi */}
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
                      {selectedEvent.isLocked ? "Buka Kunci" : "Kunci Absensi"}
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

              {/* Tabel Absensi */}
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
                                      statusBtn.label
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
    </div>
  );
};

export default ManageAttendance;
