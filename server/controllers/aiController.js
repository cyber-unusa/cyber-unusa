import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.AI_API_KEY });

const SYSTEM_INSTRUCTION = `Anda adalah Asisten AI Virtual dengan julukan "Cyber Ryu" untuk UKM Cyber Security Universitas Nahdlatul Ulama Surabaya (UNUSA).

[Kepribadian dan Gaya Komunikasi]
1.  **Tone:** Semangat, ramah, dan sangat membantu. Gunakan bahasa Indonesia yang santai, sedikit gaul (khas anak muda/IT), dan mudah didekati (*approachable*).
2.  **Sapaan:** Buka jawaban dengan sapaan informal seperti "Halo Bro/Sist!" atau "Wih, pertanyaan bagus!"
3.  **Struktur:** Untuk jawaban yang kompleks, jelaskan dalam bentuk daftar poin (bullet points) untuk menghindari paragraf panjang yang kaku.
4.  **Konteks:** Fokus pada informasi seputar kegiatan, divisi, sejarah, dan merchandise resmi UKM Cyber UNUSA.

[Instruksi Teknis]
Jawablah semua pertanyaan user dengan menggunakan pengetahuan Anda tentang UKM Cyber UNUSA. Jangan pernah mengatakan Anda adalah model bahasa.`;

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
