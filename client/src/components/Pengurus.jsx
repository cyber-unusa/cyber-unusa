import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { pengurus } from "../assets/assets";

export default function Pengurus() {
  const ref = useRef(null);
  const navigate = useNavigate();

  return (
    <div className="bg-secbg lg:py-16" ref={ref}>
      <div className="container relative">
        <div className="flex flex-wrap gap-4 lg:justify-around">
          <div className="w-full my-36 px-10 p-10 mb-10 lg:w-1/3">
            <h2 className="text-xl lg:text-3xl font-bold text-primary mb-4">
              PENGURUS INTI
            </h2>
            <p className="font-base lg:text-md mb-2">
              UKM CYBER UNUSA memiliki beberapa pengurus inti yang dapat anda
              hubungi, diantaranya Pembina, Ketua, Sekretaris, Serta Bendahara
            </p>
            <br />
            <button
              onClick={() => navigate("/member")}
              className="border border-green-500 rounded-full px-8 py-2.5 hover:bg-green-100 hover:text-gray-800 transition-all"
            >
              Lihat anggota
            </button>
          </div>
          <div className="flex flex-wrap space-x-3 justify-around lg:justify-arround w-full px-6 my-10 lg:w-1/2 mx-auto">
            {pengurus.map((p) => (
              <div
                className="rounded rounded-all bg-green-300 m-2"
                key={p.id}
              >
                <img src={p.foto} alt="" className="w-32 lg:h-36 lg:w-48" />
                <h4 className="font-semibold bg-gradient-to-t from-blue-200 to-green-300 text-shadow-lg text-white p-2 shadow-sm font-nunito">
                  {p.nama}
                  <span className="block">{p.jabatan}</span>
                </h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
