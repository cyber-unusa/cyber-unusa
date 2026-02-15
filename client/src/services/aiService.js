import api from "./api";

export const fetchAiResponse = async (question) => {
  const response = await api.post("/api/ai/chat", { question });
  return response.data;
};
