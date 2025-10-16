import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/appContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ManageDokumenter from "../components/ManageDokumenter";
import ManageKegiatan from "../components/ManageKegiatan";

const Dashboard = () => {
  const { userData } = useContext(AppContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dokumenter");

  useEffect(() => {
    if (userData && userData.role !== "admin") {
      navigate("/");
    }
  }, [userData, navigate]);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-20 p-4 pb-32">
        <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
        <div className="flex border-b mb-4">
          <button
            onClick={() => setActiveTab("dokumenter")}
            className={`py-2 px-4 ${
              activeTab === "dokumenter" ? "border-b-2 border-blue-500" : ""
            }`}
          >
            Dokumenter
          </button>
          <button
            onClick={() => setActiveTab("kegiatan")}
            className={`py-2 px-4 ${
              activeTab === "kegiatan" ? "border-b-2 border-blue-500" : ""
            }`}
          >
            Kegiatan
          </button>
        </div>
        <div>
          {activeTab === "dokumenter" && <ManageDokumenter />}
          {activeTab === "kegiatan" && <ManageKegiatan />}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
