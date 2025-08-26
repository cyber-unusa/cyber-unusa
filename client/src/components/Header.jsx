import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/appContext";

export default function Header() {
  const { userData } = useContext(AppContext);

  return (
    <div className="flex flex-col items-center mt-20 px-4 text-center text-gray-800 relative isolate overflow-hidden">
      {/* <img
        src={assets.header_img}
        alt=""
        className="absolute inset-0 -z-10 size-full object-cover object-right opacity-30 md:object-center bg-green-500"
      /> */}

      <h1 className="flex items-center gap-2 text-xl sm:text-3xl font-medium mb-2">
        Hallo {userData ? userData.name : "Coders"}! 👋
      </h1>

      <h2 className="text-3xl sm:text-5xl font-semibold mb-4">
        Selamat Datang di Website Cyber
      </h2>

      <p className="mb-7 max-w-md">
        UKM CYBER merupakan sebuah wadah bagi mahasiswa UNUSA untuk mempelajari
        tentang dunia teknologi baik itu web developer, jaringan komputer,
        AR/VR, dan masih banyak lagi.
      </p>
      <button className="border border-green-500 rounded-full px-8 py-2.5 hover:bg-green-100 transition-all">
        Get Started
      </button>
    </div>
  );
}
