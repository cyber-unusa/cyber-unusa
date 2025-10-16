import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import EmailVerify from "./pages/EmailVerify";
import ResetPassword from "./pages/ResetPassword";
import { ToastContainer } from "react-toastify";
import { AppContextProvider } from "./context/appContext.jsx";
import About from "./pages/About.jsx";
import Member from "./pages/Member";
import CyberMart from "./pages/CyberMart";
import Dashboard from "./pages/Dashboard";
import CoomingSoon from "./components/CoomingSoon.jsx";

export default function App() {
  return (
    <AppContextProvider>
      <div>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/member" element={<Member />} />
          <Route path="/login" element={<Login />} />
          <Route path="/email-verify" element={<EmailVerify />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/cyber-mart" element={<CyberMart />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/cooming" element={<CoomingSoon />} />
        </Routes>
      </div>
    </AppContextProvider>
  );
}
