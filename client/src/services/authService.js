import api from "./api";

export const loginApi = async (email, password) => {
  const response = await api.post("/api/auth/login", { email, password });
  return response.data;
};

export const registerApi = async (name, email, password) => {
  const response = await api.post("/api/auth/register", {
    name,
    email,
    password,
  });
  return response.data;
};

export const logoutApi = async () => {
  const response = await api.post("/api/auth/logout");
  return response.data;
};

//? Verifikasi Email
export const sendVerifyEmailOtpApi = async () => {
  const response = await api.post("/api/auth/send-verify-otp");
  return response.data;
};

export const verifyEmailApi = async (otp, userId = null) => {
  const payload = { otp };
  if (userId) payload.userId = userId;

  const endpoint = userId
    ? "/api/auth/verify-account-public"
    : "/api/auth/verify-account";
  const response = await api.post(endpoint, payload);
  return response.data;
};

//? Reset Password
export const sendResetOtpApi = async (email) => {
  const response = await api.post("/api/auth/send-reset-otp", { email });
  return response.data;
};

export const verifyResetOtpApi = async (email, otp) => {
  const response = await api.post("/api/auth/verify-reset-otp", { email, otp });
  return response.data;
};

export const resetPasswordApi = async (email, newPassword) => {
  const response = await api.post("/api/auth/reset-password", {
    email,
    newPassword,
  });
  return response.data;
};
