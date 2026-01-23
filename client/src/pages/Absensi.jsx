import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/Context";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ManageMembers from "../components/ManageMembers";
import ManageAttendance from "../components/ManageAttendance";
import { toast } from "react-toastify";

const Absensi = () => {
  const { userData } = useContext(AppContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("absensi");

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
        <h1 className="text-3xl font-bold mb-4">Manajemen Absensi</h1>
        <div className="flex border-b border-zinc-200 mb-4">
          <button
            onClick={() => setActiveTab("absensi")}
            className={`py-2 px-4 ${
              activeTab === "absensi" ? "border-b-2 border-blue-500" : ""
            }`}
          >
            Kelola Absensi
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
          {activeTab === "absensi" && <ManageAttendance />}
          {activeTab === "anggota" && <ManageMembers />}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Absensi;
