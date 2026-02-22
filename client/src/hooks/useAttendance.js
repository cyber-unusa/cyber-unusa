import { useState, useCallback, useEffect } from "react";
import {
  fetchAttendances,
  createAttendanceEvent,
  deleteAttendanceEvent,
  fetchAttendanceRecordsByEvent,
  updateAttendanceRecord,
  toggleAttendanceEventLock,
  getAttendanceReportList,
  printAttendanceReport,
} from "../services/attendanceService";
import { toast } from "react-toastify";

export default function useAttendance() {
  const [attendances, setAttendances] = useState([]);
  const [loading, setLoading] = useState(false);

  //? State Fitur Cetak
  const [reportStartDate, setReportStartDate] = useState("");
  const [reportEndDate, setReportEndDate] = useState("");
  const [reportList, setReportList] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState(null);
  const [pdfFileName, setPdfFileName] = useState("Laporan.pdf");

  const getAttendances = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchAttendances();
      setAttendances(data);
    } catch (error) {
      toast.error(error.message || "Gagal mengambil data presensi");
    } finally {
      setLoading(false);
    }
  }, []);

  const getRecordsByEvent = useCallback(async (eventId) => {
    setLoading(true);
    try {
      const records = await fetchAttendanceRecordsByEvent(eventId);
      return records;
    } catch (error) {
      toast.error(error.message || "Gagal mengambil data record presensi");
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getAttendances();
    getRecordsByEvent();
  }, [getAttendances, getRecordsByEvent]);

  const addAttendanceEvent = async (eventData) => {
    try {
      const response = await createAttendanceEvent(eventData);
      // After creation, refresh the list to get the canonical data from server
      await getAttendances();
      toast.success(response.message || "Acara presensi berhasil dibuat");
      return true;
    } catch (error) {
      toast.error(error.message || "Gagal membuat acara presensi");
      return false;
    }
  };

  const editAttendanceRecord = async (recordId, status) => {
    try {
      const res = await updateAttendanceRecord(recordId, status);
      if (res.success) {
        return true;
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Gagal update record presensi",
      );
      return false;
    }
  };

  const toggleAttendanceLock = async (eventId) => {
    try {
      const res = await toggleAttendanceEventLock(eventId);
      if (res.success) {
        toast.success(res.message);
        return res.isLocked;
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Gagal mengubah status kunci presensi",
      );
      return null;
    }
  };

  const removeAttendanceEvent = async (eventId) => {
    try {
      await deleteAttendanceEvent(eventId);
      setAttendances((prev) => prev.filter((event) => event._id !== eventId));
      toast.success("Acara presensi berhasil dihapus");
    } catch (error) {
      toast.error(error.message || "Gagal menghapus acara presensi");
    }
  };

  //? Handler Fitur Cetak Laporan
  const handleGenerateReportList = async () => {
    if (!reportStartDate || !reportEndDate) {
      return;
    }
    setIsGenerating(true);
    try {
      const data = await getAttendanceReportList(
        reportStartDate,
        reportEndDate,
      );
      if (data.success) {
        setReportList(data.reportList);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePrintPDF = async (params) => {
    setIsPrinting(true);
    try {
      const blob = await printAttendanceReport(params);
      const fileUrl = URL.createObjectURL(blob);

      if (params.eventId) {
        setPdfFileName(`Laporan_Presensi_Acara.pdf`);
      } else if (params.startDate && params.endDate) {
        setPdfFileName(
          `Laporan_Presensi_${params.startDate}_sd_${params.endDate}.pdf`,
        );
      }

      setPdfPreviewUrl(fileUrl);
    } catch (error) {
      console.error(error);
    } finally {
      setIsPrinting(false);
    }
  };

  const closePdfPreview = () => {
    if (pdfPreviewUrl) {
      URL.revokeObjectURL(pdfPreviewUrl); // Bersihkan memori browser
    }
    setPdfPreviewUrl(null);
  };

  return {
    attendances,
    loading,
    addAttendanceEvent,
    removeAttendanceEvent,
    getAttendances,
    getRecordsByEvent,
    editAttendanceRecord,
    toggleAttendanceLock,

    //? Fitur Cetak Laporan
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
  };
}
