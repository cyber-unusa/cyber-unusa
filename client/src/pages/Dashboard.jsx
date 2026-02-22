import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/Context";
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";
import ManageDokumenter from "../features/dashboard/ManageDokumenter";
import ManageKegiatan from "../features/dashboard/ManageKegiatan";
import ManageProducts from "../features/dashboard/ManageProducts";
import ManageUsers from "../features/dashboard/ManageUsers";
import { toast } from "react-toastify";
import {
  LayoutDashboard,
  FileVideo,
  CalendarRange,
  ShoppingBag,
  User2,
} from "lucide-react";

const Dashboard = () => {
  const { userData } = useContext(AppContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("users");

  useEffect(() => {
    if (userData === false) {
      //? Waiting for data
    } else if (userData && userData.role !== "admin") {
      navigate("/");
      toast.warning("Akses ditolak: Hanya untuk admin");
    } else if (!userData) {
      navigate("/");
      toast.warning("Silahkan login sebagai admin");
    }
  }, [userData, navigate]);

  //! Render Loading jika data user belum siap
  if (!userData || userData.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Memverifikasi akses...</p>
      </div>
    );
  }

  // Data Tab Navigasi
  const tabs = [
    {
      id: "users",
      label: "managemen User",
      icon: User2,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      id: "dokumenter",
      label: "Dokumenter",
      icon: FileVideo,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      id: "kegiatan",
      label: "Kegiatan",
      icon: CalendarRange,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      id: "product",
      label: "Produk / Mart",
      icon: ShoppingBag,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <div className="flex-grow container mx-auto mt-24 px-4 sm:px-6 lg:px-8 max-w-7xl pb-20">
        {/* Header Dashboard */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
          <div className="p-3 bg-white rounded-xl shadow-sm border border-gray-200 w-fit">
            <LayoutDashboard className="w-8 h-8 text-gray-700" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
              Admin Dashboard
            </h1>
            <p className="text-gray-500 mt-1">
              Kelola Pengguna, konten, kegiatan, dan produk merchandise Cyber
              UNUSA.
            </p>
          </div>
        </div>

        {/* Navigasi Tab Modern */}
        <div className="flex flex-wrap gap-3 mb-6 border-b border-gray-200 pb-4">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 border ${
                  isActive
                    ? "bg-white border-gray-300 text-gray-900 shadow-sm ring-2 ring-gray-100 ring-offset-1"
                    : "bg-transparent border-transparent text-gray-500 hover:bg-white hover:text-gray-700"
                }`}
              >
                <div
                  className={`p-1 rounded-full ${
                    isActive ? tab.bgColor + " " + tab.color : "bg-gray-100"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Konten Utama */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden min-h-[500px]">
          {activeTab === "users" && (
            <div className="animate-fadeIn">
              <ManageUsers />
            </div>
          )}
          {activeTab === "dokumenter" && (
            <div className="animate-fadeIn">
              <ManageDokumenter />
            </div>
          )}
          {activeTab === "kegiatan" && (
            <div className="animate-fadeIn">
              <ManageKegiatan />
            </div>
          )}
          {activeTab === "product" && (
            <div className="animate-fadeIn">
              <ManageProducts />
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
