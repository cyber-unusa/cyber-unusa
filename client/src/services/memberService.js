import api from "./api";

export const fetchMembersWithStats = async () => {
  const response = await api.get("/api/member/get");
  return response.data.allMembers;
};

export const createMemberData = async (data) => {
  const response = await api.post("/api/member/add", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const updateMemberData = async (id, data) => {
  const response = await api.put(`/api/member/update/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const removeMemberData = async (id) => {
  const response = await api.delete(`/api/member/delete/${id}`);
  return response.data;
};
