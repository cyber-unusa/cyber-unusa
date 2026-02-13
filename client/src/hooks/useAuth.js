import { useState, useContext } from "react";
import { AppContext } from "../context/Context";
import * as authService from "../services/authService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const { setIsLoggedin, setUserData, userData, getUserData } =
    useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loginUser = async (email, password) => {
    setLoading(true);
    try {
      const data = await authService.loginApi(email, password);

      if (data.success) {
        setIsLoggedin(true);
        setUserData(data.user);
        toast.success(data.message);
        if (data.user.role === "admin") {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
      } else {
        if (data.isVerified === false) {
          toast.info(data.message);

          navigate("/email-verify", { state: { userId: data.userId } });
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message || "Terjadi kesalahan sistem");
    } finally {
      setLoading(false);
    }
  };

  const registerUser = async (name, email, password) => {
    setLoading(true);
    try {
      const data = await authService.registerApi(name, email, password);

      if (data.success) {
        setIsLoggedin(true);
        getUserData();
        navigate("/email-verify");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = async () => {
    try {
      const data = await authService.logoutApi();
      if (data.success) {
        setIsLoggedin(false);
        setUserData(false);
        toast.info(data.message);
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
    }
  };

  //? Verify Email
  const sendVerificationCode = async () => {
    setLoading(true);
    try {
      const data = await authService.sendVerifyEmailOtpApi();
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message || "Gagal kirim OTP");
    } finally {
      setLoading(false);
    }
  };

  const verifyEmailAddress = async (otp, userId = null) => {
    setLoading(true);
    try {
      const data = await authService.verifyEmailApi(otp, userId);

      if (data.success) {
        toast.success(data.message);

        // Set user data langsung dari response dan set login state
        setIsLoggedin(true);
        setUserData(data.user);

        navigate("/");
        return true;
      } else {
        toast.error(data.message);
        return false;
      }
    } catch (error) {
      toast.error(error.message || "Verifikasi gagal");
      return false;
    } finally {
      setLoading(false);
    }
  };

  //? Reset Password
  const requestResetOtp = async (email) => {
    setLoading(true);
    try {
      const data = await authService.sendResetOtpApi(email);
      if (data.success) {
        toast.success(data.message);
        return true;
      } else {
        toast.error(data.message);
        return false;
      }
    } catch (error) {
      toast.error(error.message || "Gagal kirim OTP");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const verifyResetCode = async (email, otp) => {
    setLoading(true);
    try {
      const data = await authService.verifyResetOtpApi(email, otp);
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
    } finally {
      setLoading(false);
    }
  };

  const submitNewPassword = async (email, newPassword) => {
    setLoading(true);
    try {
      const data = await authService.resetPasswordApi(email, newPassword);
      if (data.success) {
        toast.success(data.message);
        navigate("/login");
        return true;
      } else {
        toast.error(data.message);
        return false;
      }
    } catch (error) {
      toast.error(error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    userData,
    loginUser,
    registerUser,
    logoutUser,
    sendVerificationCode,
    verifyEmailAddress,
    requestResetOtp,
    verifyResetCode,
    submitNewPassword,
    loading,
  };
};
