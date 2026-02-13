import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { AppContext } from "../context/Context";
import { ShieldCheck } from "lucide-react";

export default function EmailVerify() {
  const { isLoggedin, userData } = useContext(AppContext);
  const { sendVerificationCode, verifyEmailAddress } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const userIdFromLogin = location.state?.userId;

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
    if (inputRefs.current[pasteArr.length - 1])
      inputRefs.current[pasteArr.length - 1].focus();
  };

  const sendOtp = async () => {
    await sendVerificationCode();
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const otpArray = inputRefs.current.map((e) => e.value);
    const otp = otpArray.join("");
    if (otp.length < 6) return;
    await verifyEmailAddress(otp, userIdFromLogin);
  };

  useEffect(() => {
    if (isLoggedin && userData && userData.isAccountVerified) {
      navigate("/");
    }
  }, [isLoggedin, userData, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-950 relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute top-[-20%] left-[30%] w-[500px] h-[500px] bg-green-500/10 rounded-full blur-[120px]"></div>

      <div className="bg-slate-900/60 backdrop-blur-xl p-8 rounded-2xl shadow-2xl w-full max-w-sm border border-slate-700 z-10 mx-4">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-green-500/10 rounded-full">
            <ShieldCheck size={48} className="text-green-500" />
          </div>
        </div>

        <h1 className="text-white text-2xl font-bold text-center mb-2">
          Verifikasi Keamanan
        </h1>
        <p className="text-slate-400 text-center text-sm mb-8">
          Masukkan 6 digit kode OTP yang telah dikirim ke email Anda untuk
          mengaktifkan akun.
        </p>

        <form onSubmit={onSubmitHandler}>
          <div
            className="flex justify-between gap-2 mb-8"
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
                  className="w-10 h-12 sm:w-12 sm:h-14 bg-slate-800 text-white text-center text-xl font-bold rounded-lg border border-slate-600 focus:border-green-500 focus:ring-2 focus:ring-green-500/50 outline-none transition-all"
                  ref={(e) => (inputRefs.current[index] = e)}
                  onInput={(e) => handleInput(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                />
              ))}
          </div>

          <button className="w-full py-3 rounded-lg bg-green-600 hover:bg-green-500 text-white font-bold shadow-lg hover:shadow-green-500/30 transition-all">
            Verifikasi Akun
          </button>
        </form>

        <p className="text-slate-500 text-center mt-6 text-sm">
          Tidak menerima kode?{" "}
          <span
            onClick={sendOtp}
            className="text-green-400 font-medium cursor-pointer hover:underline"
          >
            Kirim Ulang
          </span>
        </p>
      </div>
    </div>
  );
}
