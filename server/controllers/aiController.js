import { getAiChatResponseService } from "../services/aiService.js";

export const getAiRespons = async (req, res) => {
  const { question } = req.body;

  try {
    const answer = await getAiChatResponseService(question);
    res.json({ success: true, answer });
  } catch (error) {
    console.error("AI Error: ", error.message);
    res.json({
      success: false,
      message:
        "Gagal memproses permintaan AI. Pastikan AI_API_KEY sudah benar diserver dan koneksi stabil",
    });
  }
};
