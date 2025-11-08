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

  const handleUpdateStatus = async (recordId, status) => {
    try {
      const { data } = await axios.put(
        `${backendUrl}/api/attendance/record/update/${recordId}`,
        { status },
        { withCredentials: true }
      );
      if (data.success) {
        toast.success(data.message);
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
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Daftar Acara
          </h3>
          <div className="flex flex-col gap-2">
            {events.map((event) => (
              <button
                key={event._id}
                onClick={() => handleSelectEvent(event)}
                className={`p-3 text-left rounded ${
                  selectedEvent?._id === event._id
                    ? "bg-blue-100 text-blue-800"
                    : "bg-gray-50 hover:bg-gray-100"
                }`}
              >
                <span className="font-semibold block">{event.eventName}</span>
                <span className="text-sm text-gray-600">
                  {formatDate(event.date)}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Kolom Kanan: Detail Absensi */}
        <div className="md:col-span-2 p-4 border border-zinc-200 rounded">
          {!selectedEvent ? (
            <p className="text-center text-gray-500">
              Pilih acara di sebelah kiri untuk melihat detail absensi.
            </p>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    {selectedEvent.eventName}
                  </h3>
                  <p className="text-gray-600">
                    {formatDate(selectedEvent.date)}
                  </p>
                </div>
                <button
                  onClick={() => handleDeleteEvent(selectedEvent._id)}
                  className="bg-red-500 text-white py-2 px-4 rounded text-sm"
                >
                  Hapus Acara Ini
                </button>
              </div>

              {/* Daftar Anggota untuk Diabsen */}
              <div className="flex flex-col gap-2">
                <div className="grid grid-cols-5 gap-4 font-semibold p-2 border-b">
                  <span className="col-span-2">Nama Anggota</span>
                  <span className="col-span-3 text-center">Status</span>
                </div>
                {records.map((record) => (
                  <div
                    key={record._id}
                    className="grid grid-cols-5 gap-4 items-center p-2 hover:bg-gray-50"
                  >
                    <span className="col-span-2 font-medium">
                      {record.memberName}
                    </span>
                    <div className="col-span-3 flex justify-center gap-2">
                      {["Hadir", "Izin", "Alpa"].map((status) => (
                        <button
                          key={status}
                          onClick={() => handleUpdateStatus(record._id, status)}
                          className={`py-1 px-3 rounded text-sm
                            ${
                              record.status === status
                                ? status === "Hadir"
                                  ? "bg-green-500 text-white"
                                  : status === "Izin"
                                  ? "bg-yellow-500 text-white"
                                  : "bg-red-500 text-white"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            }`}
                        >
                          {status}
                        </button>
                      ))}
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
