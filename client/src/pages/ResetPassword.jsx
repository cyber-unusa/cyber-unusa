import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Mail, Lock, ArrowLeft, KeyRound } from "lucide-react";
import { Helmet } from "react-helmet-async";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [isEmailSend, setIsEmailSend] = useState(false);
  const [isOtpSubmit, setIsOtpSubmit] = useState(false);

  const { requestResetOtp, verifyResetCode, submitNewPassword } = useAuth();
  const navigate = useNavigate();

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
    e.preventDefault();
    const paste = e.clipboardData.getData("text");
    const pasteArr = paste.split("").slice(0, 6);
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
    const success = await requestResetOtp(email);
    if (success) {
      setIsEmailSend(true);
    }
  };

  const onSubmitOtp = async (e) => {
    e.preventDefault();
    const otpArray = inputRefs.current.map((e) => e.value);
    const otp = otpArray.join("");
    const success = await verifyResetCode(email, otp);
    if (success) setIsOtpSubmit(true);
  };

  const onSubmitNewPass = async (e) => {
    e.preventDefault();
    const success = await submitNewPassword(email, newPassword);
    if (success) {
      setIsEmailSend(false);
      setIsOtpSubmit(false);
    }
  };

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <div className="flex items-center justify-center min-h-screen bg-slate-950 relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-purple-500/20 rounded-full blur-[100px]"></div>
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-green-500/20 rounded-full blur-[100px]"></div>

        <button
          onClick={() => navigate("/login")}
          className="absolute top-6 left-6 flex items-center gap-2 text-slate-400 hover:text-white transition z-20"
        >
          <ArrowLeft size={20} /> Kembali Login
        </button>

        <div className="bg-slate-900/60 backdrop-blur-xl p-8 sm:p-10 rounded-2xl shadow-2xl w-full max-w-md border border-slate-700 z-10 mx-4">
          {/* Header Icon */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-800 border border-slate-700 mb-4">
              {!isEmailSend ? (
                <Mail className="text-green-400" />
              ) : !isOtpSubmit ? (
                <KeyRound className="text-green-400" />
              ) : (
                <Lock className="text-green-400" />
              )}
            </div>
            <h2 className="text-2xl font-bold text-white">
              {!isEmailSend
                ? "Reset Password"
                : !isOtpSubmit
                  ? "Verifikasi OTP"
                  : "Password Baru"}
            </h2>
            <p className="text-slate-400 text-sm mt-2">
              {!isEmailSend
                ? "Kami akan mengirimkan kode OTP ke email Anda."
                : !isOtpSubmit
                  ? "Cek email Anda dan masukkan 6 digit kode."
                  : "Buat kata sandi yang kuat dan aman."}
            </p>
          </div>

          {/* --- FORM 1: EMAIL --- */}
          {!isEmailSend && (
            <form onSubmit={onSubmitEmail} className="space-y-6">
              <div className="group flex items-center gap-3 w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 focus-within:border-green-500 transition-all">
                <Mail
                  className="text-slate-500 group-focus-within:text-green-400"
                  size={20}
                />
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent outline-none text-white w-full placeholder-slate-500"
                  type="email"
                  placeholder="Masukkan Email Anda"
                  required
                />
              </div>
              <button className="w-full py-3 rounded-lg bg-green-600 hover:bg-green-500 text-white font-bold transition-all shadow-lg hover:shadow-green-500/20">
                Kirim Kode
              </button>
            </form>
          )}

          {/* --- FORM 2: OTP --- */}
          {isEmailSend && !isOtpSubmit && (
            <form onSubmit={onSubmitOtp} className="space-y-6">
              <div
                className="flex justify-between gap-1 sm:gap-2"
                onPaste={handlePaste}
              >
                {Array(6)
                  .fill(0)
                  .map((_, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength="1"
                      required
                      className="w-10 h-12 sm:w-12 sm:h-14 bg-slate-800 text-white text-center text-lg font-bold rounded-md border border-slate-600 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-all"
                      ref={(e) => (inputRefs.current[index] = e)}
                      onInput={(e) => handleInput(e, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                    />
                  ))}
              </div>
              <button className="w-full py-3 rounded-lg bg-green-600 hover:bg-green-500 text-white font-bold transition-all">
                Verifikasi Kode
              </button>
            </form>
          )}

          {/* --- FORM 3: PASSWORD BARU --- */}
          {isEmailSend && isOtpSubmit && (
            <form onSubmit={onSubmitNewPass} className="space-y-6">
              <div className="group flex items-center gap-3 w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 focus-within:border-green-500 transition-all">
                <Lock
                  className="text-slate-500 group-focus-within:text-green-400"
                  size={20}
                />
                <input
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="bg-transparent outline-none text-white w-full placeholder-slate-500"
                  type="password"
                  placeholder="Password Baru"
                  required
                />
              </div>
              <button className="w-full py-3 rounded-lg bg-green-600 hover:bg-green-500 text-white font-bold transition-all">
                Simpan Password
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
