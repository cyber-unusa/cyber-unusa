import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  const { userData } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <section
      className="relative w-full min-h-screen flex items-center justify-center bg-cover bg-center z-0"
      style={{
        backgroundImage: `url(${assets.heroSection})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      aria-label="Hero Section"
    >
      <div className="absolute inset-0 bg-[#0d2f4a]/70" aria-hidden="true" />
      <div className="relative flex flex-col items-center justify-center w-full max-w-xl px-4 py-20 sm:py-32 text-center text-white isolate overflow-hidden">
        <h1 className="flex items-center gap-2 text-xl sm:text-3xl font-semibold mb-2">
          Hallo{" "}
          <span className="font-semibold">
            {userData ? userData.name : "Coders"}
          </span>
          !{" "}
          <span role="img" aria-label="Waving Hand">
            👋
          </span>
        </h1>
        <h2 className="text-3xl sm:text-5xl font-semibold mb-4">
          Selamat Datang di Web Cyber Unusa
        </h2>
        <p className="mb-7 max-w-md">
          UKM CYBER merupakan sebuah wadah bagi mahasiswa UNUSA untuk
          mempelajari tentang dunia teknologi baik itu web developer, jaringan
          komputer, AR/VR, dan masih banyak lagi.
        </p>
        <button
          onClick={() => navigate("/about")}
          className="border border-green-500 rounded-full px-8 py-2.5 hover:bg-green-100 hover:text-gray-800 transition-all flex items-center focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
          aria-label="Read more about Cyber"
        >
          Read More
          <ArrowRight className="ml-2" size={20} strokeWidth={1.5} />
        </button>
      </div>
    </section>
  );
}
