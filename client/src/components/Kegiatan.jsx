import useKegiatan from "../hooks/useKegiatans";
import { formatDate } from "../utils/utils";

export default function Kegiatan() {
  const { kegiatans } = useKegiatan();

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
                className="rounded-lg shadow-lg overflow-hidden mb-10 lg:w-72 flex flex-col bg-white"
                id={item._id}
                key={item._id}
              >
                {/* Menambahkan object-cover agar gambar banner konsisten ukurannya */}
                <img
                  src={item.imageUrl}
                  alt="banner"
                  className="w-full h-48 object-cover"
                />

                {/* Menggunakan flex-col agar konten di dalam card tersusun rapi hingga ke bawah */}
                <div className="py-6 px-4 flex flex-col flex-1">
                  <div className="font-semibold text-xl font-nunito mb-1">
                    {item.title}
                  </div>
                  <div className="mb-3 font-nunito">
                    <p className="text-sm text-left font-poppin text-gray-500">
                      {formatDate(item.date)} - {formatDate(item.endDate)}
                    </p>
                  </div>
                  <div className="flex-1 mb-5">
                    <p className="font-normal text-sm text-left font-poppin text-gray-700">
                      {item.description}
                    </p>
                  </div>

                  {/* Render Kondisional untuk Tombol Pendaftaran */}
                  {isClosed ? (
                    <div className="py-2 px-4 text-center text-sm font-bold rounded-lg text-white bg-gray-400 cursor-not-allowed font-poppin w-full select-none">
                      Pendaftaran Sudah Ditutup
                    </div>
                  ) : (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
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
    </>
  );
}
