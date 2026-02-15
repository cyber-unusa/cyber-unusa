import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AppContext } from "./Context";

export const AppContextProvider = ({ children }) => {
  axios.defaults.withCredentials = true;

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(false);

  const getAuthState = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/auth/is-auth");

      if (data.success) {
        setIsLoggedin(true);
        getUserData();
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setIsLoggedin(false);
      } else {
        toast.error(error.response?.data?.message || error.message);
      }
    }
  };

  const getUserData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/data");
      if (data && data.success) {
        setUserData(data.userData);
      } else if (data) {
        toast.error(data.message || "Failed to fetch user data");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setUserData(null);
      } else {
        toast.error(error.response?.data?.message || error.message);
      }
    }
  };

  //? Kirim kode via Email
  const sendVerifyOtp = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/auth/send-verify-otp",
      );

      if (data.success) {
        toast.success(data.message);
        return true;
      } else {
        toast.error(data.message);
        return false;
      }
    } catch (error) {
      toast.error(error.message);
      return false;
    }
  };

  //? Verifikasi Akun dengan OTP yang diinput
  const verifyEmail = async (otp) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/auth/verify-account",
        { otp },
      );
      if (data.success) {
        toast.success(data.message);
        getUserData(); //! Refresh data user agar status berubah jadi "Verified"
        return true;
      } else {
        toast.error(data.message);
        return false;
      }
    } catch (error) {
      toast.error(error.message);
      return false;
    }
  };

  useEffect(() => {
    getAuthState();
  }, []);

  const value = {
    backendUrl,
    isLoggedin,
    setIsLoggedin,
    userData,
    sendVerifyOtp,
    verifyEmail,
    setUserData,
    getUserData,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
