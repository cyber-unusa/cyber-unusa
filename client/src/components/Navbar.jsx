import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import CircularText from "./CircularText";
import GradientText from "./GradientText";
import { AppContext } from "../context/appContext";
import axios from "axios";
import { toast } from "react-toastify";

export default function Navbar() {
  const navigate = useNavigate();
  const { userData, backendUrl, setUserData, setIsLoggedin } =
    useContext(AppContext);

  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(
        backendUrl + "/api/auth/send-verify-otp"
      );
      if (data.success) {
        navigate("/email-verify");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + "/api/auth/logout");
      data.success && setIsLoggedin(false);
      data.success && setUserData(false);
      navigate("/");
      toast.success(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <nav className="w-full flex justify-between items-center p-3 sm:p-4 sm:px-24 absolute top-0">
      <div className="flex items-center space-x-3 rtl:space-x-reverse">
        <img src={assets.cyber_logo} alt="" className="w-12 sm:w-15" />
        <GradientText
          colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
          animationSpeed={3}
          showBorder={false}
          className="text-2xl self-center font-semibold whitespace-nowrap"
        >
          UKM Cyber Unusa
        </GradientText>
      </div>
      {userData ? (
        <div className="w-12 h-12 flex justify-center items-center rounded-full bg-green-600 text-white relative group m-4 text-2xl">
          {userData.name[0].toUpperCase()}
          <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10 w-31.5">
            <ul className="list-none m-0 p-2 bg-green-100 text-sm">
              {!userData.isAccountVerified && (
                <li
                  onClick={sendVerificationOtp}
                  className="py-1 px-2 hover:bg-green-200 cursor-pointer"
                >
                  Verifikasi Emali
                </li>
              )}

              <li
                onClick={logout}
                className="py-1 px-2 hover:bg-green-200 cursor-pointer pr-10"
              >
                Logout
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <button
          onClick={() => navigate("./login")}
          className="flex items-center gap-2 m-5 border border-green-500 rounded-full px-6 py-2 text-green-800 hover:bg-green-100 transition-all"
        >
          Login <img src={assets.arrow_icon} alt="" />
        </button>
      )}
    </nav>
  );
}
