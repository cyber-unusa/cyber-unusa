import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { AppContext } from "../context/appContext";
import { toast } from "react-toastify";
import { useEffect } from "react";

export default function EmailVerify() {
  axios.defaults.withCredentials = true;
  const { backendUrl, isLoggedin, userData, getUserData } =
    useContext(AppContext);
  const navigate = useNavigate();
  const inputRefs = React.useRef([]);

  useEffect(() => {
    if (userData.isAccountVerified === true) {
      navigate("/");
    }
  }, [userData, navigate]);

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

      const { data } = await axios.post(
        backendUrl + "/api/auth/verify-account",
        { otp }
      );

      if (data.success) {
        toast.success(data.message);
        getUserData();
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    isLoggedin && userData && userData.isAccountVerified && navigate("/");
  }, [isLoggedin, userData]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-green-300">
      <img
        onClick={() => navigate("/")}
        src={assets.cyber_logo}
        alt=""
        className="absolute top-6 w-24 cursor-pointer"
      />

      <form
        onSubmit={onSubmitHandler}
        action=""
        className="bg-slate-800 p-10 rounded-lg shadow-lg w-96 sm:w-96 text-green-300 text-sm"
      >
        <h1 className="text-3xl font-semibold text-white text-center mb-3">
          Verifikasi Email
        </h1>
        <p className="text-center mb-6 text-green-500">
          Masukkan 6-digit kode yang terkirim lewat email
        </p>

        <div className="flex justify-between mb-8" onPaste={handlePaste}>
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <input
                type="text"
                maxLength="1"
                key={index}
                required
                ref={(e) => (inputRefs.current[index] = e)}
                onInput={(e) => handleInput(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
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
