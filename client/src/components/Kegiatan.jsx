import { useState } from "react";
import useKegiatan from "../hooks/useKegiatans";
import { formatDate } from "../utils/utils";
import { X } from "lucide-react";

export default function Kegiatan() {
  const { kegiatans } = useKegiatan();
  const [selectedKegiatan, setSelectedKegiatan] = useState(null);

  return (
    <>
      <h2 className="text-3xl lg:text-2xl font-bold text-center mb-16 text-[var(--yel)] font-rubik">
        KEGIATAN UKM CYBER
      </h2>

      {kegiatans && kegiatans.length > 0 ? (
        <div className="container px-6 mx-auto flex flex-wrap gap-8 justify-center">
          {kegiatans.map((item) => {
            const isClosed = new Date(item.endDate) < new Date();

            return (
              <div
                className="rounded-lg shadow-lg overflow-hidden mb-10 lg:w-72 flex flex-col bg-white group cursor-pointer hover:-translate-y-1 transition-all duration-300"
                id={item._id}
                key={item._id}
                onClick={() => selectedKegiatan(item)} // Buka modal saat kartu diklik
              >
                <div className="overflow-hidden h-48">
                  <img
                    src={item.imageUrl}
                    alt="banner"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <div className="py-6 px-4 flex flex-col flex-1">
                  <div className="font-semibold text-xl font-nunito mb-1 line-clamp-2">
                    {item.title}
                  </div>
                  <div className="mb-3 font-nunito">
                    <p className="text-sm text-left font-poppin text-gray-500">
                      {formatDate(item.date)} - {formatDate(item.endDate)}
                    </p>
                  </div>
                  <div className="flex-1 mb-5">
                    {/* line-clamp-3 akan memotong teks berlebih menjadi "..." */}
                    <p className="font-normal text-sm text-left font-poppin text-gray-700 line-clamp-3">
                      {item.description}
                    </p>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Mencegah bentrok dengan klik kartu
                      setSelectedKegiatan(item);
                    }}
                    className="mb-2 py-2 px-4 text-center text-sm font-bold rounded-lg text-[var(--lowprim)] border border-[var(--lowprim)] hover:bg-[var(--lowprim)] hover:text-white transition duration-300 ease-in-out font-poppin w-full block"
                  >
                    Lihat Detail
                  </button>

                  {isClosed ? (
                    <div
                      className="py-2 px-4 text-center text-sm font-bold rounded-lg text-white bg-gray-400 cursor-not-allowed font-poppin w-full select-none"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Pendaftaran Sudah Ditutup
                    </div>
                  ) : (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="py-2 px-4 text-center text-sm font-bold rounded-lg text-white bg-[var(--lowprim)] hover:shadow-lg hover:opacity-90 transition duration-300 ease-in-out font-poppin w-full block"
                    >
                      Daftar Sekarang
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-zinc-200 p-6 text-center hover:shadow-lg transition-shadow w-full max-w-xs mx-auto">
          <p className="text-center text-gray-600 text-xl font-bold">
            Belum ada kegiatan yang diselenggarakan.
          </p>
        </div>
      )}

      {/* POP-UP MODAL DETAIL KEGIATAN */}
      {selectedKegiatan && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-2xl max-w-3xl w-full relative overflow-hidden flex flex-col max-h-[90vh] shadow-2xl animate-fade-in-up">
            <button
              onClick={() => setSelectedKegiatan(null)}
              className="absolute top-4 right-4 z-10 bg-white/80 p-2 rounded-full text-gray-600 hover:text-red-500 hover:bg-gray-100 transition-colors"
            >
              <X size={24} />
            </button>
            <div className="overflow-y-auto">
              <img
                src={selectedKegiatan.imageUrl}
                alt={selectedKegiatan.title}
                className="w-full h-80 object-contain bg-gray-50"
              />
              <div className="p-6 md:p-8">
                <h2 className="text-3xl font-bold mb-2 text-gray-800">
                  {selectedKegiatan.title}
                </h2>
                <div className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full mb-4 font-semibold">
                  {formatDate(selectedKegiatan.date)} s/d{" "}
                  {formatDate(selectedKegiatan.endDate)}
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  Deskripsi Kegiatan:
                </h3>
                <p className="text-gray-600 whitespace-pre-wrap leading-relaxed mb-6">
                  {selectedKegiatan.description}
                </p>

                {new Date() > new Date(selectedKegiatan.endDate) ? (
                  <div className="block w-full text-center bg-gray-400 text-white font-bold py-3 px-4 rounded-lg cursor-not-allowed">
                    Pendaftaran Ditutup
                  </div>
                ) : (
                  <a
                    href={selectedKegiatan.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-[var(--lowprim)] hover:opacity-90 text-white font-bold py-3 px-4 rounded-lg transition duration-300"
                  >
                    Daftar Sekarang
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
