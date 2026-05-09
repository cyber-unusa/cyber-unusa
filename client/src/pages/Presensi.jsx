import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/Context";
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";
import ManageMembers from "../features/dashboard/ManageMembers";
import ManageAttendance from "../features/dashboard/ManageAttendance";
import LaporanKehadiran from "../features/dashboard/LaporanKehadiran";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";

const Presensi = () => {
  const { userData } = useContext(AppContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("presensi");

  useEffect(() => {
    //! Proteksi halaman, sama seperti Dashboard
    if (userData === false) {
      //? Jika masih loading, tunggu
    } else if (userData && userData.role !== "admin") {
      navigate("/");
      toast.warning("Akses ditolak: Hanya untuk admin");
    } else if (!userData) {
      navigate("/");
      toast.warning("Silakan login sebagai admin");
    }
  }, [userData, navigate]);

  //! Jangan render apapun jika data user belum siap atau tidak valid
  if (!userData || userData.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Memverifikasi akses...</p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div>
        <Navbar />
        <div className="container mx-auto mt-20 p-4 pb-32">
          <h1 className="text-3xl font-bold mb-4">Manajemen Presensi</h1>
          <div className="flex border-b border-zinc-200 mb-4">
            <button
              onClick={() => setActiveTab("presensi")}
              className={`py-2 px-4 ${
                activeTab === "presensi" ? "border-b-2 border-blue-500" : ""
              }`}
            >
              Kelola Presensi
            </button>
            <button
              onClick={() => setActiveTab("laporan")}
              className={`py-2 px-4 ${
                activeTab === "laporan" ? "border-b-2 border-blue-500" : ""
              }`}
            >
              Laporan Kehadiran
            </button>
            <button
              onClick={() => setActiveTab("anggota")}
              className={`py-2 px-4 ${
                activeTab === "anggota" ? "border-b-2 border-blue-500" : ""
              }`}
            >
              Kelola Daftar Anggota
            </button>
          </div>
          {/* Kontent Utama */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden min-h-[500px]">
            {activeTab === "presensi" && (
              <div className="animate-fadeIn">
                <ManageAttendance />
              </div>
            )}
            {activeTab === "laporan" && (
              <div className="animate-fadeIn">
                <LaporanKehadiran />
              </div>
            )}
            {activeTab === "anggota" && (
              <div className="animate-fadeIn">
                <ManageMembers />
              </div>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Presensi;
