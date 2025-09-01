import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import CircularText from "../components/CircularText";
import { AppContext } from "../context/appContext";
import axios from "axios";
import { toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();

  const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContext);

  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
          navigate("/");
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
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-green-300">
      <img
        onClick={() => navigate("/")}
        src={assets.cyber_logo}
        alt=""
        className="absolute items-center sm:left-15 top-5 w-25 cursor-pointer"
      />

      <div className="bg-slate-800 p-10 rounded-lg shadow-lg w-96 sm:w-96 text-green-300 text-sm">
        <h2 className="text-3xl font-semibold text-white text-center mb-3">
          {state === "Login" ? "Selamat Datang" : "Registrasi"}
        </h2>
        <p className="text-center text-sm mb-6">
          {state === "Login" ? "Masukan Ke Akun Anda" : "Daftarkan Akun Anda"}
        </p>

        <form onSubmit={onSubmitHandler}>
          {state === "Sign Up" && (
            <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#0d6c5b]">
              <img src={assets.person_icon} alt="" />
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="bg-transparent outline-none text-white"
                type="text"
                placeholder="Masukkan Nama Lengkap"
                required
              />
            </div>
          )}

          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#0d6c5b]">
            <img src={assets.mail_icon} alt="" />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="bg-transparent outline-none text-white"
              type="email"
              placeholder="Masukkan Email"
              required
            />
          </div>

          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#0d6c5b]">
            <img src={assets.lock_icon} alt="" />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="bg-transparent outline-none text-white"
              type="password"
              placeholder="Masukkan Password"
              required
            />
          </div>

          <p
            onClick={() => navigate("/reset-password")}
            className="mb-4 text-green-500 cursor-pointer"
          >
            Lupa Kata Sandi?
          </p>

          <button
            onSubmit={null}
            className="w-full py-2.5 rounded-full bg-gradient-to-r from-green-400 to-green-600 text-white font-medium cursor-pointer"
          >
            {state}
          </button>
        </form>

        {state === "Sign Up" ? (
          <p className="text-gray-400 text-center text-xs mt-4">
            Sudah Punya Akun? {"  "}{" "}
            <span
              className="text-blue-400 cursor-pointer underline"
              onClick={() => setState("Login")}
            >
              Login Disini
            </span>
          </p>
        ) : (
          <p className="text-gray-400 text-center text-xs mt-2">
            Belum Punya Akun? {"  "}{" "}
            <span className="text-blue-400 cursor-pointer underline">
              Daftar Disini
            </span>
          </p>
        )}
      </div>
    </div>
  );
}
