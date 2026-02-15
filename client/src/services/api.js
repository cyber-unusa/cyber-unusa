import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, //! Penting jika pakai cookie
});

//? Interceptor: Semacam "satpam" yang mencegat setiap request/response
//* Contoh: Otomatis lampirkan token jika pakai localStorage (opsional)
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error),
);

//? Global Error Handler (Biar gak capek try-catch di setiap komponen)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Sesi telah habis, silakan login kembali.");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default api;
