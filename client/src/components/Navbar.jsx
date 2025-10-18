import React, { useContext, useState, useRef, useEffect } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/appContext";
import axios from "axios";
import { toast } from "react-toastify";

export default function Navbar() {
  const navigate = useNavigate();
  const { userData, backendUrl, setUserData, setIsLoggedin } =
    useContext(AppContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!dropdownOpen) return;
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  // Handlers
  const handleNavigate = (path) => {
    navigate(path);
    setMobileMenu(false);
  };

  const handleDropdownToggle = () => setDropdownOpen((prev) => !prev);

  const handleMobileMenuToggle = () => setMobileMenu((prev) => !prev);

  // Logout handler, can close dropdown and mobile menu if needed
  const handleLogout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + "/api/auth/logout");
      if (data.success) {
        setIsLoggedin(false);
        setUserData(false);
        toast.success(data.message);
        setDropdownOpen(false);
        setMobileMenu(false);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.message);
      setDropdownOpen(false);
      setMobileMenu(false);
    }
  };

  // Menu item data
  const menuItems = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Cyber Mart", path: "/cyber-mart" },
    { label: "Member", path: "/member" },
  ];

  // Render
  return (
    <nav className="bg-gray-900 fixed top-0 left-0 w-full z-20 border-b border-gray-600 px-4 sm:px-6">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo & Title */}
        <div
          className="flex items-center space-x-3 rtl:space-x-reverse cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={assets.cyber_logo} alt="" className="h-10" />
          <span className="text-xl self-center font-semibold whitespace-nowrap bg-gradient-to-r from-green-400 via-blue-500 to-green-400 bg-clip-text text-transparent">
            UKM Cyber UNUSA
          </span>
        </div>

        {/* Tombol menu mobile dan user */}
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {userData ? (
            <div className="relative">
              <button
                type="button"
                className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-600"
                id="user-menu-button"
                aria-expanded={dropdownOpen}
                onClick={handleDropdownToggle}
              >
                <div className="w-8 h-8 rounded-full bg-green-600 text-white text-xl p-0.5 flex items-center justify-center">
                  {userData.name[0].toUpperCase()}
                </div>
                <span className="sr-only">Open user menu</span>
              </button>
              {dropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="z-50 absolute top-10 right-0 my-4 w-56 text-base bg-gray-800 rounded-xl shadow-lg border border-gray-700 transition-all duration-200 animate-fadeIn"
                  id="user-dropdown"
                >
                  <div className="px-5 py-4 border-b border-gray-700">
                    <span className="block text-base font-semibold text-white mb-1">
                      {userData.name}
                    </span>
                    <span className="block text-xs truncate text-gray-400">
                      {userData.email}
                    </span>
                  </div>
                  <ul className="py-2">
                    {userData.role === "admin" && (
                      <li>
                        <button
                          onClick={() => handleNavigate("/dashboard")}
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-600 text-gray-200 hover:text-white"
                        >
                          Dashboard
                        </button>
                      </li>
                    )}
                    <li>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-600"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="hidden md:flex items-center md:order-2 border border-green-500 rounded-full px-6 py-2 text-white hover:text-black hover:bg-green-100 transition-all"
            >
              Login
            </button>
          )}
          <button
            onClick={handleMobileMenuToggle}
            className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-green-800 md:hidden"
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {mobileMenu ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Menu utama */}
        <div
          className={`items-center justify-between ${
            mobileMenu ? "block" : "hidden"
          } w-full md:flex md:w-auto md:order-1`}
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-700 rounded-lg bg-gray-800 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-gray-900">
            {menuItems.map((item) => (
              <li key={item.path}>
                <button
                  onClick={() => handleNavigate(item.path)}
                  className={`block py-2 px-3 rounded md:p-0 ${
                    window.location.pathname === item.path
                      ? "text-green-400"
                      : "text-white"
                  } hover:bg-gray-700 md:hover:bg-transparent md:hover:text-green-500`}
                >
                  {item.label}
                </button>
              </li>
            ))}
            {!userData && (
              <li className="md:hidden">
                <button
                  onClick={() => handleNavigate("/login")}
                  className="block w-full text-left py-2 px-3 text-white rounded hover:bg-gray-700"
                >
                  Login
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
