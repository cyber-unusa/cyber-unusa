import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "../context/appContext";
import axios from "axios";
import { Mail, Lock } from "lucide-react";

export default function ResetPassword() {
  const { backendUrl } = useContext(AppContext);
  axios.defaults.withCredentials = true;

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isEmailSend, setIsEmailSend] = useState("");
  const [otp] = useState(0);
  const [isOtpSubmit, setIsOtpSubmit] = useState(false);

  const inputRefs = React.useRef([]);

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

  const onSubmitEmail = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        backendUrl + "/api/auth/send-reset-otp",
        { email }
      );
      data.success ? toast.success(data.message) : toast.error(data.message);
      data.success && setIsEmailSend(true);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onSubmitOtp = async (e) => {
    e.preventDefault();
    try {
      const otpArray = inputRefs.current.map((e) => e.value);
      const otp = otpArray.join("");
      const { data } = await axios.post(
        backendUrl + "/api/auth/verify-reset-otp",
        { email, otp }
      );
      data.success ? toast.success(data.message) : toast.error(data.message);
      data.success && setIsOtpSubmit(true);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onSubmitNewPass = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        backendUrl + "/api/auth/reset-password",
        { email, otp, newPassword }
      );

      data.success ? toast.success(data.message) : toast.error(data.message);
      data.success && navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-green-300">
      <img
        onClick={() => navigate("/")}
        src={assets.cyber_logo}
        alt=""
        className="absolute items-center sm:left-15 top-16 w-24 cursor-pointer"
      />

      {/* Form reset password */}
      {!isEmailSend && (
        <form
          onSubmit={onSubmitEmail}
          className="bg-slate-800 p-10 rounded-lg shadow-lg w-96 sm:w-96 text-green-300 text-sm"
        >
          <h1 className="text-3xl font-semibold text-white text-center mb-3">
            Reset Password
          </h1>
          <p className="text-center mb-6 text-green-500">
            Masukkan Email anda, untuk verifikasi otp
          </p>

          <div className="mb-8 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#0d6c5b]">
            <Mail color="white" size={20} strokeWidth={1.5} />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="bg-transparent outline-none text-white"
              type="email"
              placeholder="Masukkan Email"
              required
            />
          </div>
          <button className="w-full py-2.5 rounded-full bg-gradient-to-r from-green-400 to-green-600 text-white font-medium cursor-pointer">
            Kirim Otp
          </button>
        </form>
      )}

      {/* Form Otp verifikasi */}
      {!isOtpSubmit && isEmailSend && (
        <form
          onSubmit={onSubmitOtp}
          className="bg-slate-800 p-10 rounded-lg shadow-lg w-96 sm:w-96 text-green-300 text-sm"
        >
          <h1 className="text-3xl font-semibold text-white text-center mb-3">
            Reset Password Otp
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
            Submit
          </button>
        </form>
      )}

      {/* Form Password baru */}
      {isOtpSubmit && isEmailSend && (
        <form
          onSubmit={onSubmitNewPass}
          className="bg-slate-800 p-10 rounded-lg shadow-lg w-96 sm:w-96 text-green-300 text-sm"
        >
          <h1 className="text-3xl font-semibold text-white text-center mb-3">
            Password Baru
          </h1>
          <p className="text-center mb-6 text-green-500">
            Masukkan Password baru anda
          </p>

          <div className="mb-8 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#0d6c5b]">
            <Lock color="white" size={20} strokeWidth={1.5} />
            <input
              onChange={(e) => setNewPassword(e.target.value)}
              value={newPassword}
              className="bg-transparent outline-none text-white"
              type="password"
              placeholder="Masukkan Password Baru"
              required
            />
          </div>
          <button className="w-full py-2.5 rounded-full bg-gradient-to-r from-green-400 to-green-600 text-white font-medium cursor-pointer">
            Reset Password
          </button>
        </form>
      )}
    </div>
  );
}
