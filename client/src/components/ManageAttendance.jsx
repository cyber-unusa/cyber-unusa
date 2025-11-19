import React, { useState, useEffect, useContext, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/appContext";

const ManageAttendance = () => {
  const { backendUrl } = useContext(AppContext);
  const [events, setEvents] = useState([]);
  const [records, setRecords] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");

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
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Kelola Absensi</h2>

      {/* Bagian Membuat Acara Baru */}
      <form
        onSubmit={handleCreateEvent}
        className="mb-6 p-4 border border-zinc-200 rounded"
      >
        <h3 className="text-xl font-semibold text-gray-700 p-2">
          Buat Acara Absensi Baru
        </h3>
        <p className="p-2 text-sm text-gray-500">
          Membuat acara baru akan otomatis menghasilkan daftar absensi untuk
          semua anggota yang ada di "Kelola Daftar Anggota".
        </p>
        <div className="p-2">
          <label
            htmlFor="eventName"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Nama Acara
          </label>
          <input
            type="text"
            name="eventName"
            id="eventName"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            placeholder="Contoh: Rapat Bulanan April"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="p-2">
          <label
            htmlFor="eventDate"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Tanggal Acara
          </label>
          <input
            type="date"
            name="eventDate"
            id="eventDate"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-2 px-4 mt-4 rounded-md"
        >
          Buat Acara
        </button>
      </form>

      {/* Bagian Mengelola Acara yang Ada */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Kolom Kiri: Daftar Acara */}
        <div className="md:col-span-1 p-4 border border-zinc-200 rounded">
          <h3 className="text-xl font-semibold text-gray-700 mb-4 px-2">
            Daftar Acara
          </h3>
          <div className="flex flex-col gap-2 max-h-[500px] overflow-y-auto pr-2">
            {events.map((event) => (
              <button
                key={event._id}
                onClick={() => handleSelectEvent(event)}
                className={`p-3 text-left rounded transition-all border ${
                  selectedEvent?._id === event._id
                    ? "bg-blue-50 border-blue-500 text-blue-800 shadow-sm"
                    : "bg-white border-transparent hover:bg-gray-50 hover:border-gray-200"
                }`}
              >
                <div className="flex justify-between items-start">
                  <span className="font-semibold block">{event.eventName}</span>
                  {event.isLocked && <span>🔒</span>}
                </div>
                <span className="text-xs text-gray-500 mt-1 block">
                  {formatDate(event.date)}
                </span>
              </button>
            ))}
            {events.length === 0 && (
              <p className="text-gray-400 text-center text-sm">
                Belum ada acara
              </p>
            )}
          </div>
        </div>

        {/* Kolom Kanan: Detail Absensi */}
        <div className="md:col-span-2 p-4 border border-zinc-200 rounded bg-white min-h-[400px]">
          {!selectedEvent ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400">
              <span className="text-4xl mb-2">📋</span>
              <p>Pilih acara di sebelah kiri untuk melihat detail.</p>
            </div>
          ) : (
            <div>
              {/* Header Detail Acara */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 pb-4 border-b border-gray-100 gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    {selectedEvent.eventName}
                    {selectedEvent.isLocked && (
                      <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full border border-red-200 font-medium">
                        Terkunci 🔒
                      </span>
                    )}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    📅 {formatDate(selectedEvent.date)}
                  </p>
                </div>

                <div className="flex gap-2">
                  {/* TOMBOL LOCK/UNLOCK */}
                  <button
                    onClick={() => handleToggleLock(selectedEvent._id)}
                    className={`flex-1 md:flex-none py-2 px-4 rounded text-sm font-medium transition-colors border ${
                      selectedEvent.isLocked
                        ? "bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100"
                        : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    {selectedEvent.isLocked
                      ? "🔓 Buka Kunci"
                      : "🔒 Kunci Absensi"}
                  </button>

                  <button
                    onClick={() => handleDeleteEvent(selectedEvent._id)}
                    className="flex-1 md:flex-none bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 py-2 px-4 rounded text-sm font-medium transition-colors"
                  >
                    Hapus
                  </button>
                </div>
              </div>

              {/* Statistik Singkat (Opsional) */}
              <div className="grid grid-cols-3 gap-2 mb-4 text-center text-xs font-medium text-gray-600">
                <div className="bg-green-50 p-2 rounded">
                  Hadir: {records.filter((r) => r.status === "Hadir").length}
                </div>
                <div className="bg-yellow-50 p-2 rounded">
                  Izin: {records.filter((r) => r.status === "Izin").length}
                </div>
                <div className="bg-red-50 p-2 rounded">
                  Alpa: {records.filter((r) => r.status === "Alpa").length}
                </div>
              </div>

              {/* Daftar Anggota untuk Diabsen */}
              <div className="flex flex-col gap-1">
                <div className="grid grid-cols-5 gap-4 text-xs font-bold text-gray-400 uppercase p-2">
                  <span className="col-span-2">Nama Anggota</span>
                  <span className="col-span-3 text-center">
                    Status Kehadiran
                  </span>
                </div>

                {records.length === 0 && (
                  <p className="text-center py-8 text-gray-400">
                    Tidak ada anggota terdaftar.
                  </p>
                )}

                {records.map((record) => (
                  <div
                    key={record._id}
                    className="grid grid-cols-5 gap-4 items-center p-3 rounded hover:bg-gray-50 border-b border-gray-50 last:border-0 transition-colors"
                  >
                    <span
                      className="col-span-2 font-medium text-gray-700 truncate"
                      title={record.memberName}
                    >
                      {record.memberName}
                    </span>
                    <div className="col-span-3 flex justify-center gap-1 md:gap-2">
                      {["Hadir", "Izin", "Alpa"].map((status) => {
                        // Logika warna tombol
                        const isActive = record.status === status;
                        let activeClass = "";
                        if (status === "Hadir")
                          activeClass =
                            "bg-green-500 text-white border-green-600";
                        else if (status === "Izin")
                          activeClass =
                            "bg-yellow-500 text-white border-yellow-600";
                        else
                          activeClass = "bg-red-500 text-white border-red-600";

                        // Logika tampilan saat dikunci
                        const lockClass = selectedEvent.isLocked
                          ? isActive
                            ? "opacity-60 cursor-not-allowed" // Jika aktif & dikunci: Warna redup
                            : "opacity-20 cursor-not-allowed bg-gray-100" // Jika tidak aktif & dikunci: Sangat transparan
                          : isActive
                          ? "shadow-sm scale-105" // Jika aktif & tidak dikunci: Normal
                          : "bg-white text-gray-500 border-gray-200 hover:bg-gray-100 hover:border-gray-300"; // Jika tidak aktif & tidak dikunci: Normal

                        return (
                          <button
                            key={status}
                            disabled={selectedEvent.isLocked}
                            onClick={() =>
                              handleUpdateStatus(record._id, status)
                            }
                            className={`
                                py-1.5 px-2 md:px-4 rounded text-xs md:text-sm font-medium border transition-all duration-200
                                ${isActive ? activeClass : ""}
                                ${lockClass}
                            `}
                          >
                            {status}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageAttendance;
