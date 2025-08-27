import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import CircularText from "./CircularText";
import GradientText from "./GradientText";
import { AppContext } from "../context/appContext";
import axios from "axios";
import { toast } from "react-toastify";
import DropDownMenu from "./DropDownMenu";

export default function Navbar() {
  const navigate = useNavigate();
  const { userData, backendUrl, setUserData, setIsLoggedin } =
    useContext(AppContext);

  const [dropdown1, setDropdown1] = useState(false);

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
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600 pr-6 pl-6">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={assets.cyber_logo} alt="" className="h-10" />
          <GradientText
            colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
            animationSpeed={3}
            showBorder={false}
            className="text-xl self-center font-semibold whitespace-nowrap"
          >
            UKM Cyber Unusa
          </GradientText>
        </div>
        <div className="hidden md:flex space-x-8 md:order-1 text-white">
          <button
            type="button"
            className="hover:text-green-800 relative pb-2"
            onClick={() => navigate("/")}
          >
            Home
            <span
              className={`absolute left-0 -bottom-0.5 w-full h-0.5 ${
                window.location.pathname === "/" ? "bg-green-500" : ""
              }`}
            ></span>
          </button>

          <button
            type="button"
            className="hover:text-green-800 relative pb-2"
            onClick={() => navigate("/about")}
          >
            About
            <span
              className={`absolute left-0 -bottom-0.5 w-full h-0.5 ${
                window.location.pathname === "/about" ? "bg-green-500" : ""
              }`}
            ></span>
          </button>
          <button
            type="button"
            className="hover:text-green-800 relative pb-2"
            onClick={() => navigate("/services")}
          >
            Services
            <span
              className={`absolute left-0 -bottom-0.5 w-full h-0.5 ${
                window.location.pathname === "/services" ? "bg-green-500" : ""
              }`}
            ></span>
          </button>

          <button
            type="button"
            className="hover:text-green-800 relative pb-2"
            onClick={() => navigate("/member")}
          >
            Member
            <span
              className={`absolute left-0 -bottom-0.5 w-full h-0.5 ${
                window.location.pathname === "/member" ? "bg-green-500" : ""
              }`}
            ></span>
          </button>
        </div>

        {userData ? (
          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button
              type="button"
              className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              id="user-menu-button"
              aria-expanded={dropdown1}
              onClick={() => setDropdown1(!dropdown1)}
            >
              <div className="w-8 h-8 rounded-full bg-green-600 text-white text-xl p-0.5">
                {userData.name[0].toUpperCase()}
              </div>
              <span className="sr-only">Open user menu</span>
            </button>
            {dropdown1 && (
              <div
                className="z-50 absolute top-10 right-6 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600"
                id="user-dropdown"
              >
                <div className="px-4 py-3">
                  <span className="block text-sm text-gray-900 dark:text-white">
                    {userData.name}
                  </span>
                  <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
                    {userData.email}
                  </span>
                </div>
                <ul className="py-2" aria-labelledby="user-menu-button">
                  <li>
                    <button
                      onClick={logout}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
            <DropDownMenu />
          </div>
        ) : (
          <button
            onClick={() => navigate("./login")}
            className="flex items-center gap-2 md:order-1 order-3 md:m-0 m-5 border border-green-500 rounded-full px-6 py-2 text-green-800 hover:bg-green-100 transition-all"
          >
            Login <img src={assets.arrow_icon} alt="" />
          </button>
        )}
      </div>
    </nav>
  );
}
