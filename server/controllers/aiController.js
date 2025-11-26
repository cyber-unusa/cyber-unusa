import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.AI_API_KEY });

const SYSTEM_INSTRUCTION = `Anda adalah Asisten AI untuk UKM Cyber Security Universitas Nahdlatul Ulama Surabaya (UNUSA). Tugas Anda adalah memberikan informasi tentang UKM ini. 
Fokus pada topik: web developer, jaringan komputer, AR/VR, cyber security, kegiatan, merchandise, dan visi/misi. 
Jawab dengan ramah, singkat, dan dalam Bahasa Indonesia yang profesional.`;

export const getAiRespons = async (req, res) => {
  const { question } = req.body;

  if (!question) {
    return res.json({
      success: false,
      message: "Pertanyaan tidak boleh kosong.",
    });
  }

  try {
    const chat = ai.chats.create({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });

    const response = await chat.sendMessage({ message: question });

    res.json({ success: true, answer: response.text });
  } catch (error) {
    console.log("AI Error: ", error.message);
    res.json({
      success: false,
      message:
        "Gagal memproses permintaan AI. Pastikan AI_API_KEY sudah benar diserver dan koneksi stabil",
    });
  }
};
