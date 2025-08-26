import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

export default function EmailVerify() {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-green-300">
      <img
        onClick={() => navigate("/")}
        src={assets.cyber_logo}
        alt=""
        className="absolute items-center sm:left-15 top-5 w-25 cursor-pointer"
      />

      <form
        action=""
        className="bg-slate-800 p-10 rounded-lg shadow-lg w-96 sm:w-96 text-green-300 text-sm"
      >
        <h1 className="text-3xl font-semibold text-white text-center mb-3">
          Verifikasi Email
        </h1>
        <p className="text-center mb-6 text-green-500">
          Masukkan 6-digit kode yang terkirim lewat email
        </p>

        <div className="flex justify-between mb-8">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <input
                type="text"
                maxLength="1"
                key={i}
                required
                className="w-12 h-12 bg-[#0d6c5b] text-white text-center text-xl rounded-md"
              />
            ))}
        </div>
        <button className="w-full py-2.5 rounded-full bg-gradient-to-r from-green-400 to-green-600 text-white font-medium">
          Verifikasi
        </button>
      </form>
    </div>
  );
}
