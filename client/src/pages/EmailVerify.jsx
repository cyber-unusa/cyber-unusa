import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { AppContext } from "../context/Context";
import { toast } from "react-toastify";
import { useEffect } from "react";

export default function EmailVerify() {
  axios.defaults.withCredentials = true;
  const { isLoggedin, userData, getUserData, sendVerifyOtp, verifyEmail } =
    useContext(AppContext);
  const navigate = useNavigate();
  const inputRefs = React.useRef([]);

  const sendOtp = async () => {
    try {
      await sendVerifyOtp();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text");
    const pasteArr = paste.split("");
    pasteArr.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
    if (inputRefs.current[pasteArr.length - 1]) {
      inputRefs.current[pasteArr.length - 1].focus();
    }
  };

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const otpArray = inputRefs.current.map((e) => e.value);
      const otp = otpArray.join("");

      const success = await verifyEmail(otp);

      if (success) {
        getUserData();
        navigate("/");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (isLoggedin && userData && userData.isAccountVerified) {
      navigate("/");
    }
  }, [isLoggedin, userData, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-green-300">
      <img
        onClick={() => navigate("/")}
        src={assets.cyber_logo}
        alt=""
        className="absolute top-15 w-24 cursor-pointer hover:scale-105 transition"
      />

      <form
        onSubmit={onSubmitHandler}
        action=""
        className="bg-slate-800 p-8 rounded-2xl shadow-2xl w-full max-w-sm text-sm border border-slate-700"
      >
        <h1 className="text-white text-2xl font-bold text-center mb-2">
          Verifikasi Email
        </h1>
        <p className="text-slate-400 text-center mb-6">
          Masukkan 6-digit kode yang terkirim lewat email
        </p>

        <div className="flex justify-between mb-8" onPaste={handlePaste}>
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                required
                className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-700 text-white text-center text-xl rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 border border-transparent focus:border-green-400 transition"
                ref={(e) => (inputRefs.current[index] = e)}
                onInput={(e) => handleInput(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
        </div>
        <button className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full font-semibold hover:shadow-lg hover:from-green-600 hover:to-emerald-700 transition transform active:scale-95">
          Verifikasi
        </button>
        <p className="text-slate-400 text-center mt-4 text-xs">
          Belum terima kode?{" "}
          <span
            onClick={sendOtp}
            className="text-green-400 cursor-pointer hover:underline"
          >
            Kirim Ulang
          </span>
        </p>
      </form>
    </div>
  );
}
