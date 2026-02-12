import api from "./api";

//? Acara Presensi
export const fetchAttendances = async () => {
  const response = await api.get("/api/attendance/events/get");
  return response.data.allAttendances;
};

export const createAttendanceEvent = async (eventData) => {
  const response = await api.post("/api/attendance/event/create", eventData);
  return response.data;
};

export const deleteAttendanceEvent = async (eventId) => {
  const response = await api.delete(`/api/attendance/event/delete/${eventId}`);
  return response.data;
};

//? Record Presensi untuk satu Acara
export const fetchAttendanceRecordsByEvent = async (eventId) => {
  const response = await api.get(`/api/attendance/records/${eventId}`);
  return response.data.records;
};

export const updateAttendanceRecord = async (recordId, status) => {
  const response = await api.put(`/api/attendance/record/update/${recordId}`, {
    status,
  });
  return response.data;
};

export const toggleAttendanceEventLock = async (eventId) => {
  const response = await api.put(
    `/api/attendance/records/toggle-lock/${eventId}`,
  );
  return response.data;
};
