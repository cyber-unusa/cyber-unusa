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
            UKM Cyber Unusa
          </span>
        </div>

        {/* Desktop menu */}
        <div className="hidden md:flex space-x-8 md:order-1">
          {menuItems.map((item) => (
            <button
              key={item.path}
              type="button"
              className="text-white hover:text-green-800 relative pb-2"
              onClick={() => navigate(item.path)}
            >
              {item.label}
              <span
                className={`absolute left-0 -bottom-0.5 w-full h-0.5 ${
                  window.location.pathname === item.path ? "bg-green-500" : ""
                }`}
              ></span>
            </button>
          ))}
        </div>

        {/* Mobile Menu Ketika Sudah Login */}
        <div className="md:hidden flex items-center space-x-2">
          <button
            onClick={handleMobileMenuToggle}
            className="inline-flex items-center justify-center p-2 rounded-full text-white hover:text-green-800"
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
          {userData && (
            <div className="relative">
              <button
                type="button"
                className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-600"
                id="user-menu-button-mobile"
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
                  className="z-50 absolute right-0 mt-2 w-64 text-base bg-gray-900 rounded-2xl shadow-2xl border border-gray-700 transition-all duration-200 animate-fadeIn"
                  style={{ top: "calc(100% + 8px)" }}
                  id="user-dropdown-mobile"
                >
                  <div className="px-6 py-5 border-b border-gray-700">
                    <span className="block text-lg font-bold text-white mb-1">
                      {userData.name}
                    </span>
                    <span className="block text-xs truncate text-gray-400">
                      {userData.email}
                    </span>
                  </div>
                  <ul className="py-2">
                    <li>
                      <button
                        onClick={() =>
                          handleLogout({
                            closeDropdown: true,
                            closeMobileMenu: true,
                          })
                        }
                        className="block px-4 py-2 text-sm text-red-700 hover:bg-gray-600"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        {/* User menu & Login button (desktop) */}
        {userData ? (
          <div className="hidden md:flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
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
                  className="z-50 absolute top-10 right-6 my-4 w-56 text-base bg-gray-800 rounded-xl shadow-lg border border-gray-700 transition-all duration-200 animate-fadeIn"
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
                    <li>
                      <button
                        onClick={() =>
                          handleLogout({
                            closeDropdown: true,
                            closeMobileMenu: true,
                          })
                        }
                        className="block px-4 py-2 text-sm text-red-700 hover:bg-gray-600"
                      >
                        Logout
                      </button>
                    </li>
                    {userData && userData.role === "admin" && (
                      <li>
                        <button
                          onClick={() => navigate("/dashboard")}
                          className="block px-4 py-2 text-sm hover:bg-gray-600 text-gray-200 hover:text-white"
                        >
                          Dashboard
                        </button>
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="hidden md:flex items-center md:order-2 border border-green-500 rounded-full px-6 py-2 text-white hover:text-black hover:bg-green-100 transition-all"
          >
            Login
          </button>
        )}

        {/* Mobile menu dropdown */}
        {mobileMenu && (
          <div className="md:hidden text-white bg-gray-900 px-4 pt-2 pb-4 space-y-1 shadow-lg border-b  border-gray-700">
            {menuItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigate(item.path)}
                className={`block w-full text-left px-3 py-2 rounded hover:bg-gray-700 ${
                  window.location.pathname === item.path
                    ? "text-green-600 font-semibold"
                    : ""
                }`}
              >
                {item.label}
              </button>
            ))}
            {/* Show Login button in mobile menu if not logged in */}
            {!userData && (
              <button
                onClick={() => handleNavigate("/login")}
                className="block w-full text-left px-3 py-2 rounded border border-green-500 text-white hover:text-black hover:bg-green-100 mt-2"
              >
                Login
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
