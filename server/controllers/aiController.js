import { GoogleGenAI } from "@google/genai";
import kegiatanModel from "../models/kegiatanModel.js";
import memberModel from "../models/memberModel.js";

const ai = new GoogleGenAI({ apiKey: process.env.AI_API_KEY });

const STATIC_ROLES = {
  "Pembina UKM Cyber": "Rizqi Putri Nourma Budiarti, S.T.,M.T",
  "Ketua Umum": "Muhamad Abdul Rouf N.",
  "Wakil Ket. Umum": "M. Yusuf Javananta",
  "Sekretaris 1": "Karin Galuh Dea Pramesti",
  "Sekretaris 2": "Alifah Hidayatul Maftuhah",
  "Bendahara Umum": "Siti Alfiatul Makiah",
  "Kadiv. PSDM": "Muhammad Ilham A.",
  "Kadiv. Pendidikan": "Indra Nurfauzi",
  "Kadiv. Pengmas": "Ayu Putri Gianti",
  "Kadiv. Innovation & Entrepreneur": "Novandra Wichda Farun",
};

const SYSTEM_INSTRUCTION = `Anda adalah Asisten AI Virtual dengan julukan "Cyber Ryu" untuk UKM Cyber Security Universitas Nahdlatul Ulama Surabaya (UNUSA).

[Kepribadian dan Gaya Komunikasi]
GUNAKAN bahasa yang jelas dan sederhana. 
GUNAKAN gaya singkat dan informatif. 
GUNAKAN kalimat pendek dan langsung. 
GUNAKAN kalimat aktif, hindari kalimat pasif. 
FOKUS pada wawasan yang praktis dan bisa langsung diterapkan. 
GUNAKAN daftar poin untuk posting media sosial. 
GUNAKAN data dan contoh nyata untuk mendukung klaim bila memungkinkan. 
HINDARI penggunaan tanda pisah panjang atauem dashes (—) . 
Gunakan titik atau koma. Jika perlu menghubungkan ide, gunakan titik. 
HINDARI konstruksi seperti "...bukan hanya ini, tetapi juga itu". 
HINDARI perumpamaan dan klise. HINDARI generalisasi. 
HINDARI bahasa pembuka umum pada kalimat, misalnya: kesimpulannya, pada akhirnya, dll. 
HINDARI peringatan atau catatan tambahan, cukup hasil yang diminta. 
HINDARI kata sifat dan kata keterangan yang berlebihan. 
HINDARI tanda pagar. 
HINDARI markdown. 
HINDARI tanda bintang. 
HINDARI titik koma.
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
    let rolesContext =
      "Daftar Pengurus Harian (BPH) dan Kepala Divisi (Kadiv):\n";
    for (const [jabatan, nama] of Object.entries(STATIC_ROLES)) {
      rolesContext += `- ${jabatan}: ${nama}\n`;
    }

    // b. Ambil Staff/Anggota dari master list (memberModel)
    const allMembers = await memberModel
      .find({})
      .select("name divisi")
      .sort({ name: 1 });

    let membersContext = "\nDaftar Staff dan Anggota (selain Kadiv dan BPH):\n";
    if (allMembers.length > 0) {
      // Kelompokkan anggota berdasarkan divisi
      const memberGroups = allMembers.reduce((acc, member) => {
        const divisiName = member.divisi || "Anggota Lain";
        if (!acc[divisiName]) {
          acc[divisiName] = [];
        }
        // Hanya tampilkan nama
        acc[divisiName].push(member.name);
        return acc;
      }, {});

      for (const [divisi, names] of Object.entries(memberGroups)) {
        membersContext += `- Divisi ${divisi}: ${names.join(", ")}\n`;
      }
    } else {
      membersContext = "Tidak ada staff terdaftar di master list anggota.";
    }

    // === 2. RETRIEVE KEGIATAN DATA (RAG LAMA) ===
    const activeKegiatan = await kegiatanModel
      .find({ endDate: { $gte: new Date() } })
      .select("title description link")
      .limit(5);

    let kegiatanContext = "Tidak ada kegiatan yang terdaftar saat ini.";
    if (activeKegiatan.length > 0) {
      kegiatanContext =
        "\nBerikut daftar kegiatan terbaru yang dipegang UKM Cyber:\n";
      activeKegiatan.forEach((k, index) => {
        kegiatanContext += `\n${index + 1}. Judul: ${
          k.title
        }. Deskripsi singkat: ${k.description}. Link Daftar: ${k.link}`;
      });
    }

    // === 3. AUGMENT: Bangun prompt lengkap dengan semua konteks ===
    const fullPrompt = `Jawab pertanyaan user HANYA berdasarkan CONTEXT DATA yang diberikan di bawah ini. Jika konteks tidak memberikan jawaban, jawab berdasarkan pengetahuan umum Anda tentang UKM Cyber.

    --- KONTEKS DATA PENGURUS & STAFF UKM ---
    ${rolesContext}
    ${membersContext}
    ---
    
    --- KONTEKS DATA KEGIATAN AKTIF ---
    ${kegiatanContext}
    ---
    
    Pertanyaan user: ${question}`;

    const chat = ai.chats.create({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });

    const response = await chat.sendMessage({ message: fullPrompt });

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
