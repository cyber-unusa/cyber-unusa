import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { AppContext } from "../context/appContext";

export default function Dokumenter() {
  const { backendUrl } = useContext(AppContext);
  const [dokumenters, setDokumenters] = useState([]);

  useEffect(() => {
    const fetchDokumenter = async () => {
      try {
        const { data } = await axios.get(backendUrl + "/api/dokumenter/get");
        if (data.success) {
          setDokumenters(data.allDokumenter || []);
        }
      } catch (error) {
        console.error("Gagal memuat dokumenter:", error);
      }
    };
    fetchDokumenter();
  }, [backendUrl]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  return (
    <>
      <h2 className="text-3xl lg:text-2xl font-bold text-center mb-16 text-green-500 pt-8 font-rubik">
        DOKUMENTER KEGIATAN CYBER
      </h2>

      {dokumenters && dokumenters.length > 0 ? (
        <div className="container px-6 mx-auto flex flex-wrap gap-8 justify-center">
          {dokumenters.map((item, index) => (
            <div
              key={index}
              className="rounded-lg shadow-md mb-10 bg-white overflow-hidden w-80 lg:w-72"
            >
              <img
                src={`${backendUrl}/${item.imageUrl}`}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="py-6 px-4">
                <h3 className="font-semibold text-xl mb-2 font-nunito">
                  {item.title}
                </h3>
                <p className="font-poppin">{item.description}</p>
                <p className="font-poppin mb-2 mt-3">{formatDate(item.date)}</p>
                <div className="font-semibold text-xl mb-2 mt-3 text-end text-green-500">
                  <a href="/cooming">
                    <p className="w-16 py-1 px-1 mb-4 text-base font-bold rounded-lg hover:shadow-lg hover:opacity-90 transition duration-300 ease-in-out font-poppin">
                      Lihat...
                    </p>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg border p-6 text-center hover:shadow-lg transition-shadow w-full max-w-xs mx-auto">
          <p className="text-center text-gray-600 text-xl font-bold">
            Belum ada kegiatan yang ditambahkan.
          </p>
        </div>
      )}
    </>
  );
}
