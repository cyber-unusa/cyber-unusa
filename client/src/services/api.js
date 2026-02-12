import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, //! Penting jika pakai cookie
});

// Interceptor: Semacam "satpam" yang mencegat setiap request/response
// Contoh: Otomatis lampirkan token jika pakai localStorage (opsional)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Atau ambil dari cookie
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Global Error Handler (Biar gak capek try-catch di setiap komponen)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Bisa tambahkan logic logout otomatis jika 401 Unauthorized
    if (error.response?.status === 401) {
      // Logic redirect ke login
    }
    return Promise.reject(error);
  },
);

export default api;
