import memberModel from "../models/memberModel.js";
import attendanceEventModel from "../models/attendanceEventModel.js";
import attendanceRecordModel from "../models/attendanceRecordModel.js";
import puppeteer from "puppeteer";

//? Dapatkan semua Acara Presensi (list-nya saja)
export const getAllAttendanceEventsService = async () => {
  return await attendanceEventModel.find({}).sort({ date: -1 });
};

//? Dapatkan detail Presensi unuk SATU acara (list anggota & status)
export const getAttendanceRecordsByEventService = async (eventId) => {
  return await attendanceRecordModel.find({ eventId }).sort({ memberName: 1 });
};

//? Membuat Acara Presensi baru
export const createAttendanceEventService = async (data) => {
  const { eventName, date } = data;
  if (!eventName || !date) {
    throw new Error("Nama Acara dan Tanggal wajib diisi");
  }

  //Todo 1. Buat Acara Presensinya
  const newEvent = new attendanceEventModel({ eventName, date });
  await newEvent.save();

  //Todo 2. Ambil semua anggota dari master list
  const allMembers = await memberModel.find({});

  //Todo 3. Filter anggota yang tidak valid (tidak punya nama)
  const validMembers = allMembers.filter((member) => member && member.name);

  //? Jika tidak ada anggota sama sekali di database, tetap buat acaranya
  if (validMembers.length === 0) {
    console.warn(
      "Acara Presensi dibuat, tetapi tidak ada anggota di database untuk diabsen.",
    );
    return { message: "Acara berhasil dibuat (tidak ada anggota terdaftar)" };
  }

  //Todo 4. Buat record Presensi HANYA untuk anggota yang valid
  const records = validMembers.map((member) => ({
    eventId: newEvent._id,
    memberId: member._id,
    memberName: member.name,
    status: "Belum Diisi",
  }));

  if (records.length > 0) {
    await attendanceRecordModel.insertMany(records);
  }
};

//? Admin meng-update status kehadiran satu anggota
export const updateAttendanceRecordService = async (recordId, status) => {
  const recordToCheck = await attendanceRecordModel.findById(recordId);
  if (!recordToCheck) {
    return res.json({
      success: false,
      message: "Data Presensi tidak ditemukan",
    });
  }

  const parentEvent = await attendanceEventModel.findById(
    recordToCheck.eventId,
  );

  if (parentEvent && parentEvent.isLocked) {
    return res.json({
      success: false,
      message:
        "Presensi TERKUNCI. Buka kunci terlebih dahulu untuk mengubah data.",
    });
  }

  return await attendanceRecordModel.findByIdAndUpdate(
    recordId,
    { status },
    { new: true },
  );
};

export const toggleEventLockService = async (eventId) => {
  const event = await attendanceEventModel.findById(eventId);
  if (!event) {
    return res.json({ success: false, message: "Acara tidak ditemukan" });
  }

  //Todo Toggle status (jika true jadi false, jika false jadi true)
  event.isLocked = !event.isLocked;
  let messageAddon = "";
  await event.save();

  //? Otomatis set "Alpa" jika dikunci
  if (event.isLocked) {
    const result = await attendanceRecordModel.updateMany(
      { eventId: eventId, status: "Belum Diisi" }, // Filter: cari yang event-nya sama & status masih kosong
      { $set: { status: "Alpa" } }, // Action: Ubah jadi Alpa
    );

    if (result.modifiedCount > 0) {
      messageAddon = `(${result.modifiedCount} anggota otomatis dianggap Alpa)`;
    }
  }

  return {
    statusMsg: event.isLocked ? "terkunci" : "terbuka",
    isLocked: event.isLocked,
    messageAddon: messageAddon,
  };
};

//? Hapus Acara Presensi (termasuk semua recordnya)
export const deleteAttendanceEventService = async (eventId) => {
  //Todo Hapus acaranya
  await attendanceEventModel.findByIdAndDelete(eventId);
  //Todo Hapus semua record Presensi yang terkait
  await attendanceRecordModel.deleteMany({ eventId });
};

export const getAttendanceReportListService = async (startDate, endDate) => {
  const start = new Date(startDate);
  start.setHours(0, 0, 0, 0);

  const end = new Date(endDate);
  end.setHours(23, 59, 59, 999);

  return await attendanceEventModel
    .find({
      date: { $gte: start, $lte: end },
    })
    .sort({ date: 1 }); //? Urutkan dari tanggal terdekat ke yang terjauh
};

export const generateAttendancePDFService = async ({
  startDate,
  endDate,
  eventId,
}) => {
  let eventsToPrint = [];

  // Todo 1: Jika admin memilih cetak Spesifik 1 Acara (dari list generate)
  if (eventId) {
    const event = await attendanceEventModel.findById(eventId);
    if (event) eventsToPrint.push(event);
  }

  // Todo 2: Jika admin memilih cetak langsung berdasarkan rentang tanggal
  else if (startDate && endDate) {
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);

    eventsToPrint = await attendanceEventModel
      .find({
        date: { $gte: start, $lte: end },
      })
      .sort({ date: 1 });
  }

  if (eventsToPrint.length === 0) {
    throw new Error(
      "Tidak ada data acara untuk dicetak pada periode tersebut.",
    );
  }

  //? Data konstan untuk seluruh laporan
  const printDate = new Date().toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const LOGO_KIRI = "https://rkat.unusa.ac.id/assets/img/logo.png"; //? Logo UNUSA
  const LOGO_KANAN = "https://cyber-unusa.netlify.app/assets/logo-dT_niDsY.png"; //? Logo Cyber
  const QR_CODE =
    "https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=https://qr1.me-qr.com/id/data/image-pack/0wdqpeef"; // Ganti dengan URL QR Code kamu

  //? Variabel untuk menampung seluruh halaman HTML
  let allPagesHtml = "";

  for (let i = 0; i < eventsToPrint.length; i++) {
    const event = eventsToPrint[i];

    //! Ambil data anggota yang diabsen untuk acara ini
    const records = await attendanceRecordModel
      .find({ eventId: event._id })
      .populate("memberId", "nim role divisi")
      .sort({ memberName: 1 });

    //? Format Tanggal Acara
    const eventDate = new Date(event.date).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    let htmlTableRows = "";
    let counter = 1;

    //? Looping data anggotanya
    records.forEach((record) => {
      let statusColor = "black";
      if (record.status === "Hadir") statusColor = "green";
      else if (record.status === "Alpa") statusColor = "red";
      else if (record.status === "Izin") statusColor = "orange";

      const nim = record.memberId?.nim || "-";
      const jabatan = record.memberId?.role || record.memberId?.divisi || "-";

      htmlTableRows += `
        <tr>
          <td style="text-align: center;">${counter++}</td>
          <td style="text-align: center;">${nim}</td>
          <td>${record.memberName}</td>
          <td style="text-align: center;">${jabatan}</td>
          <td style="text-align: center; color: ${statusColor}; font-weight: bold;">${record.status}</td>
        </tr>
      `;
    });

    // Menambahkan Page Break (Ganti Halaman) JIKA BUKAN acara yang terakhir
    const pageBreakStyle =
      i < eventsToPrint.length - 1 ? "page-break-after: always;" : "";

    //? Susun 1 Halaman Utuh (Kop -> Judul -> Tabel -> TTD)
    allPagesHtml += `
      <div style="${pageBreakStyle}">
        <table class="header-table">
          <tr>
            <td style="width: 15%; text-align: center;">
              <img src="${LOGO_KIRI}" alt="Logo Kiri" style="width: 75px; height: auto;">
            </td>
            <td style="width: 70%;" class="header-text">
              <h2>UNIT KEGIATAN MAHASISWA<br>CYBER COMPUTER AND SECURITY<br>UNIVERSITAS NAHDLATUL ULAMA SURABAYA</h2>
              <p>Sekretariat: UNUSA Kampus B Jalan Jemursari 51-57 Surabaya</p>
              <p>Telp: 085704397605, 089675647937 E-mail: cyber@unusa.ac.id</p>
            </td>
            <td style="width: 15%; text-align: center;">
              <img src="${LOGO_KANAN}" alt="Logo Kanan" style="width: 75px; height: auto;">
            </td>
          </tr>
        </table>

        <div class="line"></div>
        
        <div class="title">LAPORAN PRESENSI KEGIATAN ${event.eventName.toUpperCase()}</div>
        <div class="subtitle">Tanggal: ${eventDate}</div>

        <table class="data-table">
          <thead>
            <tr>
              <th style="width: 5%;">No</th>
              <th style="width: 15%;">NIM</th>
              <th style="width: 25%;">Nama Anggota</th>
              <th style="width: 30%;">Jabatan</th>
              <th style="width: 25%;">Status Kehadiran</th>
            </tr>
          </thead>
          <tbody>
            ${htmlTableRows}
          </tbody>
        </table>

        <table class="footer-table">
          <tr>
            <td style="width: 75%;"></td> 
            
            <td class="ttd-cell">
              <p>Surabaya, ${printDate}</p>
              <p>Ketua Umum UKM Cyber</p>
              <img src="${QR_CODE}" class="qr-code" alt="QR Signature">
              <div class="ttd-name">Muhamaad Abdul Rouf N.</div>
              <p>NIM 3130024040</p>
            </td>
          </tr>
        </table>
      </div>
    `;
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="id">
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: 'Times New Roman', Times, serif; font-size: 11px; margin: 0; padding: 0; }
        
        /* Layout Header untuk Logo Kiri & Kanan */
        .header-table { width: 100%; border-collapse: collapse; margin-bottom: 5px; }
        .header-table td { padding: 0; vertical-align: middle; border: none; }
        .header-text { text-align: center; line-height: 1.3; }
        .header-text h2 { margin: 0; font-size: 15px; }
        .header-text p { margin: 2px 0; font-size: 11px; }
        
        /* Garis Kop Surat */
        .line { border-top: 2px solid black; height: 1px; margin-top: 8px; margin-bottom: 10px; }
        
        .title { text-align: center; font-size: 14px; font-weight: bold; text-decoration: underline; padding-top: 15px; margin-bottom: 3px; }
        .subtitle { text-align: center; margin-bottom: 15px; font-size: 14px; }
        
        /* Tabel Data */
        table.data-table { width: 100%; border-collapse: collapse; margin-bottom: 15px; }
        table.data-table th, table.data-table td { border: 1px solid black; padding: 5px; }
        table.data-table th { background-color: white; } 
        
        /* Footer / Tanda Tangan (Menggunakan Table Layout) */
        table.footer-table { font-size: 12px; width: 100%; border-collapse: collapse; margin-top: 20px; page-break-inside: avoid; }
        table.footer-table td { padding: 0; border: none; vertical-align: top; }
        .ttd-cell { text-align: center; width: 30%; }
        .ttd-cell p { margin: 3px 0; }
        
        /* QR Code */
        .qr-code { width: 70px; height: 70px; margin: 10px auto; display: block; }
        .ttd-name { font-weight: bold; text-decoration: underline; margin-top: 5px; }
      </style>
    </head>
    <body>
      ${allPagesHtml}
    </body>
    </html>
  `;

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: "networkidle0" });

  const pdfBuffer = await page.pdf({
    format: "A4",
    margin: { top: "2cm", right: "2cm", bottom: "2cm", left: "2cm" },
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: "<div></div>", // Kosongkan header jika tidak butuh
    footerTemplate: `
      <div style="width: calc(100% - 4cm); margin: 0 auto; font-family: 'Times New Roman', serif; color: #555; opacity: 70%;">
        
        <div style="border-top: 1px solid #555; width: 100%; margin-bottom: 6px;"></div>
        
        <div style="width: 100%; font-size: 9px; display: flex; justify-content: space-between;">
          <span>Dicetak pada: ${new Date().toLocaleString("id-ID")}</span>
          <span>Laporan Kehadiran</span>
        </div>
      </div>
    `,
  });

  await browser.close();
  return pdfBuffer;
};
