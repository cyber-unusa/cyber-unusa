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
      toast.error(error.message);
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
      toast.error(error.message);
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

  //? Fungsi ambil semua user (untuk Admin)
  const getAllUsers = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/all-users");
      if (data.success) {
        return data.users;
      } else {
        toast.error(data.message);
        return [];
      }
    } catch (error) {
      toast.error(error.message);
      return [];
    }
  };

  //? FUngsi update user
  const updateUser = async (id, name, email, password, isAccountVerified) => {
    try {
      const { data } = await axios.put(backendUrl + "/api/user/update-user", {
        id,
        name,
        email,
        password,
        isAccountVerified,
      });

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

  //? Fungsi hapus user
  const deleteUser = async (id) => {
    try {
      const { data } = await axios.post(backendUrl + "/api/user/delete-user", {
        id,
      });
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
    getAllUsers,
    updateUser,
    deleteUser,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
