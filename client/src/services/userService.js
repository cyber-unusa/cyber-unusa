import api from "./api";

export const fetchAllUsers = async () => {
  const response = await api.get("/api/user/all-users"); // Sesuaikan route backend
  return response.data.users; // Langsung kembalikan data bersih
};

export const updateUserData = async (id, data) => {
  const response = await api.put("/api/user/update-user", { id, ...data });
  return response.data;
};

export const deleteUserById = async (id) => {
  const response = await api.post("/api/user/delete-user", { id });
  return response.data;
};
