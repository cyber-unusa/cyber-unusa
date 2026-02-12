import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/Context";
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";
import ManageMembers from "../features/dashboard/ManageMembers";
import ManageAttendance from "../features/dashboard/ManageAttendance";
import { toast } from "react-toastify";

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
            onClick={() => setActiveTab("anggota")}
            className={`py-2 px-4 ${
              activeTab === "anggota" ? "border-b-2 border-blue-500" : ""
            }`}
          >
            Kelola Daftar Anggota
          </button>
        </div>
        <div>
          {activeTab === "presensi" && <ManageAttendance />}
          {activeTab === "anggota" && <ManageMembers />}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Presensi;
