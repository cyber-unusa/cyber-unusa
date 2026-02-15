import { useState } from "react";
import { fetchAiResponse } from "../services/aiService";
import { toast } from "react-toastify";

export default function useAI() {
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    {
      role: "assistant",
      text: "Halo! Saya Cyber Ryu AI Asisten anda. Ada yang bisa saya bantu terkait UKM kami?",
    },
  ]);

  const askAI = async (userQuestion) => {
    if (!userQuestion.trim() || isLoading) return;

    setIsLoading(true);
    setChatHistory((prev) => [...prev, { role: "user", text: userQuestion }]);

    try {
      const data = await fetchAiResponse(userQuestion);

      if (data.success) {
        setChatHistory((prev) => [
          ...prev,
          { role: "assistant", text: data.answer },
        ]);
      } else {
        toast.error("AI Error: " + data.message);
        setChatHistory((prev) => [
          ...prev,
          {
            role: "assistant",
            text: "Maaf, terjadi kesalahan di server AI. silahkan coba lagi nanti.",
          },
        ]);
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Koneksi gagal ke server");
      setChatHistory((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Gagal terhubung. periksa koneksi atau setatus server",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    chatHistory,
    isLoading,
    askAI,
  };
}
