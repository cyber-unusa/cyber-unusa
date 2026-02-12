import React, { useContext, useState, useEffect } from "react";
import { assets } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/Context";
import axios from "axios";
import { toast } from "react-toastify";
import { Mail, Lock, User, ArrowLeft, ArrowRight } from "lucide-react";

export default function Auth() {
  const navigate = useNavigate();
  const { userData } = useContext(AppContext);

  const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContext);

  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (userData) {
      navigate("/");
      toast.info("Anda sudah login");
    }
  }, [userData, navigate]);

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();

      axios.defaults.withCredentials = true;

      if (state === "Sign Up") {
        const { data } = await axios.post(backendUrl + "/api/auth/register", {
          name,
          email,
          password,
        });
        if (data.success) {
          setIsLoggedin(true);
          getUserData();
          navigate("/email-verify");
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/auth/login", {
          email,
          password,
        });
        if (data.success) {
          setIsLoggedin(true);
          getUserData();
          navigate("/");
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-slate-950 text-white">
      {/* --- BAGIAN KIRI (GAMBAR VISUAL) --- */}
      <div className="hidden md:flex w-1/2 relative overflow-hidden bg-slate-900 justify-center items-center">
        {/* Gambar Background (Gunakan gambar hero kamu) */}
        <div className="absolute inset-0 bg-slate-900">
          {/* Kita pakai CSS Gradient Pattern biar Cyber banget jika gambar gagal load */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-500 via-slate-900 to-slate-950"></div>
          <img
            src={assets.heroSection}
            alt="Cyber Background"
            className="w-full h-full object-cover opacity-60 mix-blend-overlay"
          />
        </div>

        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-6 left-6 z-10 flex items-center gap-2 text-slate-400 hover:text-white transition"
        >
          <ArrowLeft size={20} /> Kembali
        </button>

        {/* Konten Text di atas Gambar */}
        <div className="relative z-10 p-10 text-center">
          <img
            src={assets.cyber_logo}
            alt="Logo"
            className="w-32 mx-auto mb-6 drop-shadow-[0_0_15px_rgba(34,197,94,0.5)]"
          />
          <h1 className="text-4xl font-bold mb-4 tracking-wider">
            CYBER UNUSA
          </h1>
          <p className="text-slate-300 text-lg max-w-md mx-auto leading-relaxed">
            Menghubungkan talenta digital, membangun masa depan teknologi
            bersama komunitas terbaik.
          </p>
        </div>

        {/* Dekorasi Garis Tech */}
      </div>

      {/* --- BAGIAN KANAN (FORM LOGIN) --- */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 sm:p-16 relative">
        {/* Tombol Back Mobile */}
        <div className="absolute top-6 left-6 md:hidden">
          <img
            src={assets.cyber_logo}
            className="w-12"
            onClick={() => navigate("/")}
            alt=""
          />
        </div>

        <div className="w-full max-w-md space-y-8 absolute">
          {/* Header Form */}
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold text-white tracking-tight">
              {state === "Login" ? "Welcome Back, Coders!" : "Create Account"}
            </h2>
            <p className="mt-2 text-slate-400">
              {state === "Login"
                ? "Masukkan kredensial Anda untuk mengakses sistem."
                : "Daftar sekarang untuk menjadi bagian dari Cyber Unusa."}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={onSubmitHandler} className="mt-8 space-y-6">
            {state === "Sign Up" && (
              <div className="group relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-slate-500 group-focus-within:text-green-400 transition-colors" />
                </div>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-slate-700 rounded-lg bg-slate-900 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="Nama Lengkap"
                />
              </div>
            )}

            <div className="group relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-slate-500 group-focus-within:text-green-400 transition-colors" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-slate-700 rounded-lg bg-slate-900 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                placeholder="Alamat Email"
              />
            </div>

            <div className="group relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-slate-500 group-focus-within:text-green-400 transition-colors" />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-slate-700 rounded-lg bg-slate-900 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                placeholder="Password"
              />
            </div>

            {state === "Login" && (
              <div className="flex items-center justify-end">
                <div className="text-sm">
                  <span
                    onClick={() => navigate("/reset-password")}
                    className="font-medium text-green-500 hover:text-green-300 cursor-pointer transition-colors"
                  >
                    Lupa Password?
                  </span>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-slate-900 bg-green-500 hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 focus:ring-offset-slate-900 transition-all shadow-[0_0_15px_rgba(34,197,94,0.3)] hover:shadow-[0_0_25px_rgba(34,197,94,0.5)]"
            >
              <span className="flex items-center gap-2">
                {state === "Login" ? "MASUK SEKARANG" : "DAFTAR SEKARANG"}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </form>

          {/* Footer Switcher */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-800"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-slate-950 text-slate-500">Atau</span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-slate-400">
                {state === "Sign Up"
                  ? "Sudah punya akun?"
                  : "Belum punya akun?"}{" "}
                <button
                  onClick={() =>
                    setState(state === "Login" ? "Sign Up" : "Login")
                  }
                  className="font-bold text-green-500 hover:text-green-300 transition-colors"
                >
                  {state === "Sign Up" ? "Login di sini" : "Buat akun baru"}
                </button>
              </p>
            </div>
          </div>
        </div>

        {/* Footer Credit Kecil */}
        <div className="absolute bottom-6 text-xs text-slate-600">
          &copy; {new Date().getFullYear()} Cyber Unusa Dev Team.
        </div>
      </div>
    </div>
  );
}
