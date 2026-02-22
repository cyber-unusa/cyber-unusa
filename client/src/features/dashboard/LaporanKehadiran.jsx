import useAttendance from "../../hooks/useAttendance";
import { AlertCircle } from "lucide-react";

const LaporanKehadiran = () => {
  const {
    reportStartDate,
    setReportStartDate,
    reportEndDate,
    setReportEndDate,
    reportList,
    isGenerating,
    isPrinting,
    pdfPreviewUrl,
    pdfFileName,
    handleGenerateReportList,
    handlePrintPDF,
    closePdfPreview,
  } = useAttendance();

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen bg-gray-50/50">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Menu Cetak Laporan</h2>
      </div>

      {/* --- KOTAK MENU CETAK LAPORAN --- */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="flex flex-col md:flex-row md:items-end gap-4 mb-4">
          {/* Input Tanggal Mulai */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-600 mb-1">
              Tanggal Mulai
            </label>
            <input
              type="date"
              value={reportStartDate}
              onChange={(e) => setReportStartDate(e.target.value)}
              className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Input Tanggal Akhir */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-600 mb-1">
              Tanggal Akhir
            </label>
            <input
              type="date"
              value={reportEndDate}
              onChange={(e) => setReportEndDate(e.target.value)}
              className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Tombol Aksi */}
          <div className="flex gap-2 mt-4 md:mt-0">
            {/* Opsi 5: Generate List */}
            <button
              onClick={handleGenerateReportList}
              disabled={isGenerating}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors disabled:opacity-50"
            >
              {isGenerating ? "Memuat..." : "Generate List"}
            </button>

            {/* Opsi 4: Cetak Langsung berdasarkan Tanggal */}
            <button
              onClick={() =>
                handlePrintPDF({
                  startDate: reportStartDate,
                  endDate: reportEndDate,
                })
              }
              disabled={isPrinting || !reportStartDate || !reportEndDate}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition-colors disabled:opacity-50"
            >
              {isPrinting ? "Menyiapkan PDF..." : "Cetak Langsung"}
            </button>
          </div>
        </div>

        {/* --- TABEL HASIL GENERATE (Muncul jika ada isinya) --- */}
        {reportList.length > 0 && (
          <div className="mt-6 border-t pt-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">
              List Acara untuk Dicetak:
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-2 px-4 border-b text-left">Nama Acara</th>
                    <th className="py-2 px-4 border-b text-center">Tanggal</th>
                    <th className="py-2 px-4 border-b text-center">Status</th>
                    <th className="py-2 px-4 border-b text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {reportList.map((event) => (
                    <tr key={event._id} className="hover:bg-gray-50">
                      <td className="py-2 px-4 border-b">{event.eventName}</td>
                      <td className="py-2 px-4 border-b text-center">
                        {new Date(event.date).toLocaleDateString("id-ID")}
                      </td>
                      <td className="py-2 px-4 border-b text-center">
                        <span
                          className={`px-2 py-1 rounded text-xs font-bold ${event.isLocked ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}
                        >
                          {event.isLocked ? "Terkunci" : "Terbuka"}
                        </span>
                      </td>
                      <td className="py-2 px-4 border-b text-center">
                        <button
                          onClick={() => handlePrintPDF({ eventId: event._id })}
                          disabled={isPrinting}
                          className="bg-gray-800 hover:bg-black text-white text-xs py-1 px-3 rounded disabled:opacity-50"
                        >
                          {isPrinting ? "Menyiapkan PDF..." : "Cetak Ini"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* --- MODAL PREVIEW PDF --- */}
      {pdfPreviewUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl h-[90vh] flex flex-col overflow-hidden animate-fade-in">
            {/* Header Modal */}
            <div className="flex justify-between items-center p-4 border-b bg-gray-50">
              <h3 className="text-lg font-bold text-gray-800">
                Preview Laporan Presensi
              </h3>
              <button
                onClick={closePdfPreview}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded transition-colors"
              >
                Tutup
              </button>
            </div>

            {/* Konten PDF (Berbeda untuk Desktop dan Mobile) */}
            <div className="flex-1 w-full bg-gray-200 p-2 flex flex-col items-center justify-center">
              {/* Tampilan Desktop (Menggunakan iframe) */}
              <iframe
                src={pdfPreviewUrl}
                title="PDF Preview"
                className="hidden md:block w-full h-full rounded border border-gray-400 shadow-inner"
              />

              {/* Tampilan Mobile (Pesan & Tombol Buka) */}
              <div className="md:hidden flex flex-col items-center justify-center text-center p-6 h-full">
                <div className="bg-white p-6 rounded-xl shadow-sm border">
                  <AlertCircle className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                  <h4 className="text-lg font-bold text-gray-800 mb-2">
                    Preview Tidak Tersedia di HP
                  </h4>
                  <p className="text-gray-600 mb-6 text-sm">
                    Browser perangkat seluler membatasi pratinjau dokumen di
                    dalam halaman. Silakan buka atau unduh file untuk
                    melihatnya.
                  </p>
                  <div className="flex flex-col gap-3">
                    {/* Tombol Buka di Tab Baru (Memicu PDF Viewer bawaan HP) */}
                    <a
                      href={pdfPreviewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                    >
                      Buka Laporan PDF
                    </a>

                    {/* Tombol Download (Opsional, karena sudah ada di header modal) */}
                    <a
                      href={pdfPreviewUrl}
                      download={pdfFileName}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 px-6 rounded-lg border transition-colors"
                    >
                      Download File
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LaporanKehadiran;
