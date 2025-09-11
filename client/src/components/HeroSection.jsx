import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const { userData } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <section
      className="absolute w-full h-screen bg-cover bg-center flex items-center justify-center top-0 left-0 z-0"
      style={{
        background: `url(${assets.heroSection})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-[#0d2f4a]/70" />
      <div className="flex flex-col items-center mt-20 px-4 text-center text-white relative isolate overflow-hidden">
        <h1 className="flex items-center gap-2 text-xl sm:text-3xl font-ligth mb-2">
          Hallo {userData ? userData.name : "Coders"}! 👋
        </h1>

        <h2 className="text-3xl sm:text-5xl font-semibold mb-4">
          Selamat Datang di Website Cyber
        </h2>

        <p className="mb-7 max-w-md">
          UKM CYBER merupakan sebuah wadah bagi mahasiswa UNUSA untuk
          mempelajari tentang dunia teknologi baik itu web developer, jaringan
          komputer, AR/VR, dan masih banyak lagi.
        </p>
        <button
          onClick={() => navigate("/about")}
          className="border border-green-500 rounded-full px-8 py-2.5 hover:bg-green-100 hover:text-gray-800 transition-all"
        >
          Read More
        </button>
      </div>
    </section>
  );
}
