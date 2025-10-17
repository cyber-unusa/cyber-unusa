import React, { useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { kadiv } from "../assets/assets";
import CircularGallery from "../components/CircularGallery";
import {
  staffPsdm,
  staffPendidikan,
  staffPengmas,
  staffInnovation,
} from "../assets/assets";

const Member = () => {
  const ref = useRef(null);

  const handleClick = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Data for Devisi
  const devisiList = [
    {
      ...kadiv.psdm,
      color: { bg: "bg-blue-100", text: "text-blue-600" },
    },
    {
      ...kadiv.pendidikan,
      color: { bg: "bg-green-100", text: "text-green-600" },
    },
    {
      ...kadiv.pengmas,
      color: { bg: "bg-purple-100", text: "text-purple-600" },
    },
    {
      ...kadiv.inovation,
      color: { bg: "bg-[var(--yel)]", text: "text-[var(--yel)]" },
    },
  ];

  function DevisiCard({ foto, nama, jabatan, color }) {
    return (
      <div className="bg-white rounded-lg border border-zinc-200 p-3 text-center hover:shadow-lg transition-shadow w-full max-w-xs mx-auto ">
        <div
          className={`h-20 w-20 ${color.bg} ${color.text} rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-semibold overflow-hidden`}
        >
          <img
            src={foto}
            alt=""
            className="rounded-full w-20 h-20 object-cover"
          />
        </div>
        <h3 className="font-semibold text-lg mb-1">{nama}</h3>
        <p className={`${color.text} text-sm mb-3`}>{jabatan}</p>
      </div>
    );
  }

  const psdmItems = staffPsdm.map((staff) => ({
    image: staff.foto,
    text: staff.nama,
  }));

  const pendidikanItems = staffPendidikan.map((staff) => ({
    image: staff.foto,
    text: staff.nama,
  }));

  const pengmasItems = staffPengmas.map((staff) => ({
    image: staff.foto,
    text: staff.nama,
  }));

  const innovationItems = staffInnovation.map((staff) => ({
    image: staff.foto,
    text: staff.nama,
  }));

  return (
    <div>
      <Navbar />

      {/* Main Hero */}
      <section id="memberHero" className="pt-2 mt-20 lg:mt-14">
        <div className="container">
          <div className="flex flex-wrap">
            <div className="w-full self-center px-4 mx-auto lg:w-1/2">
              <h1 className="text-2xl lg:text-5xl font-bold text-[var(--primary)] mb-4">
                Devisi KAMI <span className="block">DI UKM CYBER</span>
              </h1>
              <p className="font-base lg:text-md mb-8">
                UKM CYBER UNUSA memiliki 4 divisi utama, yaitu Devisi PSDM,
                Devisi Pendidikan, Devisi Pengmas dan yang terakhir Devisi
                Innovation & Entrepreneur. Ke empat divisi ini dibentuk dalam
                rangka memenuhi kebutuhan struktur kepengurusan organisasi di
                UKM CYBER.{" "}
              </p>
              <button
                onClick={handleClick}
                className="py-3 px-4 text-base font-bold rounded-lg text-white bg-lowprim hover:shadow-lg hover:opacity-90 transition duration-300 ease-in-out hidden lg:inline"
              >
                Read More
              </button>
            </div>
            <div className="w-full self-center px-4 py-8 mx-auto lg:w-1/3">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
                {devisiList.map((item, idx) => (
                  <DevisiCard key={idx} {...item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Member Slider */}
      <h2 className="text-center font-bold text-2xl lg:text-4xl text-[var(--primary)] pt-28">
        Staff Devisi
      </h2>
      <section id="divisi1" className="mt-20 mx-2 sm:mx-4 md:mx-8 lg:mx-10">
        <div className="container flex flex-col lg:flex-row gap-4 pb-8 lg:pb-10 lg:m-auto">
          <div
            id="staff-psdm"
            className="border p-3 bg-primary w-full lg:w-1/2 text-center rounded-2xl"
          >
            <h1 className="text-blue-600 text-xl lg:text-2xl font-bold text-center mb-4">
              Staff PSDM
            </h1>
            <div
              style={{ height: "300px", width: "100%", position: "relative" }}
            >
              <CircularGallery
                bend={0}
                textColor="#000"
                borderRadius={0.05}
                scrollEase={0.02}
                items={psdmItems}
              />
            </div>
          </div>
          <div
            id="staff-pendidikan"
            className="border p-3 w-full lg:w-1/2 text-center rounded-2xl"
          >
            <h1 className="text-green-600 text-xl lg:text-2xl font-bold text-center mb-4">
              Staff Pendidikan
            </h1>
            <div
              style={{ height: "300px", width: "100%", position: "relative" }}
            >
              <CircularGallery
                bend={0}
                textColor="#000"
                borderRadius={0.05}
                scrollEase={0.02}
                items={pendidikanItems}
              />
            </div>
          </div>
        </div>
      </section>

      <section
        id="divisi2"
        className="mb-20 lg:mb-32 mx-2 sm:mx-4 md:mx-8 lg:mx-10"
      >
        <div className="container flex flex-col lg:flex-row gap-4 pb-8 lg:pb-10 lg:m-auto">
          <div
            id="staff-pengmas"
            className="border p-3 w-full lg:w-1/2 text-center rounded-2xl"
          >
            <h1 className="text-purple-600 text-xl lg:text-2xl font-bold text-center mb-4">
              Staff Pengmas
            </h1>
            <div
              style={{ height: "300px", width: "100%", position: "relative" }}
            >
              <CircularGallery
                bend={0}
                textColor="#000"
                borderRadius={0.05}
                scrollEase={0.02}
                items={pengmasItems}
              />
            </div>
          </div>
          <div
            id="staff-inovation"
            className="border p-3 w-full lg:w-1/2 text-center rounded-2xl"
          >
            <h1 className="text-[var(--yel)] text-xl lg:text-2xl font-bold text-center mb-4">
              Staff Innovation & Entrepreneur
            </h1>
            <div
              style={{ height: "300px", width: "100%", position: "relative" }}
            >
              <CircularGallery
                bend={0}
                textColor="#000"
                borderRadius={0.05}
                scrollEase={0.02}
                items={innovationItems}
              />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Member;
