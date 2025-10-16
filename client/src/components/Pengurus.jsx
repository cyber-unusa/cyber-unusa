// import { useNavigate } from "react-router-dom";
// import { useRef } from "react";
import { bph } from "../assets/assets";

// Card for BPH (Badan Pengurus Harian)
function BphCard({ foto, nama, jabatan, color }) {
  return (
    <div
      className={`bg-white rounded-lg border border-zinc-200 p-6 text-center hover:shadow-lg transition-shadow w-full max-w-xs mx-auto ${
        color?.mt || ""
      }`}
    >
      <div className="flex items-center justify-center mx-auto mb-4">
        <img
          src={foto}
          alt=""
          className="rounded-full w-24 h-24 sm:w-28 sm:h-28 md:w-30 md:h-30 object-cover"
        />
      </div>
      <h3 className="font-semibold text-lg mb-1">{nama}</h3>
      <p className={`${color?.text || "text-green-600"} text-sm mb-3`}>
        {jabatan}
      </p>
    </div>
  );
}

export default function Pengurus() {
  // Data for BPH
  const bphList = [
    {
      ...bph.ketum,
      color: { text: "text-blue-600", mt: "lg:mt-10" },
    },
    {
      ...bph.pembina,
      color: { text: "text-green-600" },
    },
    {
      ...bph.watum,
      color: { text: "text-[var(--yel)]", mt: "lg:mt-10" },
    },
    {
      ...bph.sekre1,
      color: { text: "text-blue-600" },
    },
    {
      ...bph.sekre2,
      color: { text: "text-green-600" },
    },
    {
      ...bph.bendahara,
      color: { text: "text-[var(--yel)]" },
    },
  ];

  return (
    <section id="tim">
      <div className="container px-8 lg:px-20">
        {/* Judul dan deskripsi BPH */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-green-600 mb-4 mx-5">
            Badan Pengurus Cyber
          </h2>
          <p className="text-gray-600 max-w-2xl mx-5 sm:mx-auto">
            Cyber Unusa terdiri dari individu berpengalaman di berbagai bidang
            yang siap membantu mewujudkan visi dan misi UKM Cyber.
          </p>
        </div>

        {/* BPH Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 my-10">
          {bphList.map((item, idx) => (
            <BphCard key={idx} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
