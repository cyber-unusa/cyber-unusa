import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { AppContext } from "../context/appContext";

export default function Kegiatan() {
  const { backendUrl } = useContext(AppContext);
  const [kegiatans, setKegiatans] = useState([]);

  useEffect(() => {
    const fetchKegiatan = async () => {
      try {
        const { data } = await axios.get(backendUrl + "/api/kegiatan/get");
        if (data.success) {
          setKegiatans(data.allKegiatan || []);
        }
      } catch (error) {
        console.error("Gagal memuat data kegiatan:", error);
      }
    };
    fetchKegiatan();
  }, [backendUrl]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  return (
    <>
      <h2 className="text-3xl lg:text-2xl font-bold text-center mb-16 text-[var(--yel)] font-rubik">
        KEGIATAN UKM CYBER
      </h2>

      {kegiatans && kegiatans.length > 0 ? (
        <div className="container px-6 mx-auto flex flex-wrap gap-8 justify-center">
          {kegiatans.map((item) => (
            <div className="rounded-lg shadow-lg overflow-hidden mb-10 lg:w-72">
              <img
                src={`${backendUrl}/${item.imageUrl}`}
                alt="banner"
                className="w-full"
              />
              <div className="py-6 px-4">
                <div className="font-semibold text-xl font-nunito">
                  {item.title}
                </div>
                <div className="mb-2 font-nunito">
                  <p className="text-sm text-left font-poppin">
                    {formatDate(item.date)} - {formatDate(item.endDate)}
                  </p>
                </div>
                <div className="font-semibold text-xl text-end">
                  <p className="font-normal text-sm mb-4 text-left font-poppin">
                    {item.description}
                  </p>
                </div>
                <a
                  href={item.link}
                  className="py-1 px-1 text-base font-bold rounded-lg text-white bg-[var(--lowprim)] hover:shadow-lg hover:opacity-90 transition duration-300 ease-in-out text-right font-poppin"
                >
                  Daftar Sekarang
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-zinc-200 p-6 text-center hover:shadow-lg transition-shadow w-full max-w-xs mx-auto">
          <p className="text-center text-gray-600 text-xl font-bold">
            Belum ada kegiatan yang ditambahkan.
          </p>
        </div>
      )}
    </>
  );
}
