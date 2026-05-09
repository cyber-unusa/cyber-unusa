import { useState } from "react";
import useDokumenter from "../hooks/useDokumenter";
import { X } from "lucide-react";

export default function Dokumenter() {
  const { dokumenters } = useDokumenter();
  const [selectedDokumenter, setSelectedDokumenter] = useState(null);

  return (
    <>
      <div className="container mx-auto px-8 lg:px-20 text-center">
        <h2 className="text-3xl lg:text-2xl font-bold text-center mb-16 text-green-500 pt-8 font-rubik">
          DOKUMENTER KEGIATAN CYBER
        </h2>

        {dokumenters.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {dokumenters.map((doc) => (
              <div
                key={doc._id}
                onClick={() => setSelectedDokumenter(doc)}
                className="relative overflow-hidden rounded-xl shadow-lg cursor-pointer group aspect-video bg-gray-100"
              >
                <img
                  src={doc.imageUrl}
                  alt={doc.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Overlay Hitam Transparan saat Hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <p className="text-white font-bold px-4 text-center line-clamp-2">
                    {doc.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-zinc-200 p-6 text-center hover:shadow-lg transition-shadow w-full max-w-xs mx-auto">
            <p className="text-center text-gray-600 text-xl font-bold">
              Belum ada Kegiatan yang Dokumentasikan.
            </p>
          </div>
        )}
      </div>

      {/* POP-UP MODAL ZOOM DOKUMENTER (LIGHTBOX) */}
      {selectedDokumenter && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm transition-opacity"
          onClick={() => setSelectedDokumenter(null)}
        >
          <div
            className="bg-white rounded-lg max-w-4xl w-full relative overflow-hidden shadow-2xl animate-fade-in-up"
            onClick={(e) => e.stopPropagation()} // Supaya klik di dalam kotak tidak menutup modal
          >
            <button
              onClick={() => setSelectedDokumenter(null)}
              className="absolute top-4 right-4 z-10 bg-black/50 p-2 rounded-full text-white hover:bg-red-500 transition-colors"
            >
              <X size={24} />
            </button>
            <img
              src={selectedDokumenter.imageUrl}
              alt={selectedDokumenter.title}
              className="w-full h-[50vh] md:h-[70vh] object-contain bg-black"
            />
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {selectedDokumenter.title}
              </h2>
              {/* Render deskripsi jika datanya ada di model dokumenter kamu */}
              {selectedDokumenter.description && (
                <p className="text-gray-600">
                  {selectedDokumenter.description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
