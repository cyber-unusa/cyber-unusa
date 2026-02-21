import {
  Lock,
  Unlock,
  Trash2,
  Plus,
  Calendar,
  Users,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { formatDate } from "../../utils/utils";

const AttendanceDetail = ({
  selectedEvent,
  records,
  stats,
  onDelete,
  onUpdateStatus,
  onToggleLock,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col h-full">
      {/* Header Detail */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              {selectedEvent.eventName}
              {selectedEvent.isLocked && (
                <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs rounded-full border border-red-200 font-medium flex items-center gap-1">
                  <Lock className="w-3 h-3" /> Terkunci
                </span>
              )}
            </h3>
            <p className="text-gray-500 text-sm mt-1 flex items-center gap-2">
              <Calendar className="w-4 h-4" /> {formatDate(selectedEvent.date)}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => onToggleLock(selectedEvent._id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all ${
                selectedEvent.isLocked
                  ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200 border border-yellow-200"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200"
              }`}
            >
              {selectedEvent.isLocked ? (
                <Unlock className="w-4 h-4" />
              ) : (
                <Lock className="w-4 h-4" />
              )}
              {selectedEvent.isLocked ? "Buka Kunci" : "Kunci Presensi"}
            </button>
            <button
              onClick={() => onDelete(selectedEvent._id)}
              className="px-4 py-2 bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 rounded-lg text-sm font-medium flex items-center gap-2 transition-all"
            >
              <Trash2 className="w-4 h-4" /> Hapus
            </button>
          </div>
        </div>

        {/* Statistik Card */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 text-center">
            <span className="block text-2xl font-bold text-blue-600">
              {stats.Total}
            </span>
            <span className="text-xs text-blue-500 font-medium uppercase">
              Total
            </span>
          </div>
          <div className="bg-green-50 p-3 rounded-lg border border-green-100 text-center">
            <span className="block text-2xl font-bold text-green-600">
              {stats.Hadir}
            </span>
            <span className="text-xs text-green-500 font-medium uppercase">
              Hadir
            </span>
          </div>
          <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-100 text-center">
            <span className="block text-2xl font-bold text-yellow-600">
              {stats.Izin}
            </span>
            <span className="text-xs text-yellow-500 font-medium uppercase">
              Izin
            </span>
          </div>
          <div className="bg-red-50 p-3 rounded-lg border border-red-100 text-center">
            <span className="block text-2xl font-bold text-red-600">
              {stats.Alpa}
            </span>
            <span className="text-xs text-red-500 font-medium uppercase">
              Alpa
            </span>
          </div>
        </div>
      </div>

      {/* Tabel Presensi */}
      <div className="overflow-x-auto">
        <div className="min-w-full inline-block align-middle">
          <div className="bg-gray-50 border-b px-6 py-3 grid grid-cols-12 gap-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
            <div className="col-span-5">Nama Anggota</div>
            <div className="col-span-7 text-center">Status Kehadiran</div>
          </div>

          <div className="divide-y divide-gray-100">
            {records.length === 0 ? (
              <div className="text-center py-12 text-gray-400 flex flex-col items-center">
                <Users className="w-10 h-10 mb-2 opacity-20" />
                <p>Tidak ada data anggota.</p>
              </div>
            ) : (
              records.map((record) => (
                <div
                  key={record._id}
                  className="px-6 py-3 grid grid-cols-12 gap-4 items-center hover:bg-gray-50 transition-colors"
                >
                  <div
                    className="col-span-5 font-medium text-gray-800 truncate"
                    title={record.memberName}
                  >
                    {record.memberName}
                  </div>
                  <div className="col-span-7 flex justify-center gap-2">
                    {[
                      {
                        label: "Hadir",
                        color: "green",
                        icon: CheckCircle,
                      },
                      {
                        label: "Izin",
                        color: "yellow",
                        icon: AlertCircle,
                      },
                      { label: "Alpa", color: "red", icon: XCircle },
                    ].map((statusBtn) => {
                      const isActive = record.status === statusBtn.label;
                      const isDisabled = selectedEvent.isLocked;

                      // Dynamic Classes
                      let btnClass =
                        "flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium transition-all border ";
                      if (isActive) {
                        if (statusBtn.color === "green")
                          btnClass +=
                            "bg-green-500 text-white border-green-600 shadow-sm";
                        else if (statusBtn.color === "yellow")
                          btnClass +=
                            "bg-yellow-500 text-white border-yellow-600 shadow-sm";
                        else
                          btnClass +=
                            "bg-red-500 text-white border-red-600 shadow-sm";

                        if (isDisabled)
                          btnClass += " opacity-60 cursor-not-allowed";
                        else btnClass += " scale-105";
                      } else {
                        btnClass +=
                          "bg-white text-gray-500 border-gray-200 hover:bg-gray-50";
                        if (isDisabled)
                          btnClass +=
                            " opacity-30 cursor-not-allowed bg-gray-100";
                      }

                      return (
                        <button
                          key={statusBtn.label}
                          disabled={isDisabled}
                          onClick={() =>
                            onUpdateStatus(record._id, statusBtn.label)
                          }
                          className={btnClass}
                        >
                          <statusBtn.icon className="w-3 h-3" />
                          <span className="hidden sm:inline">
                            {statusBtn.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceDetail;
