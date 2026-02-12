import React, { useRef, useMemo } from "react";
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";
import {
  kadiv,
  staffPsdm,
  staffPendidikan,
  staffPengmas,
  staffInnovation,
} from "../utils/constants";
import CircularGallery from "../components/common/CircularGallery";
import { ArrowDown } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

const Member = () => {
  const staffSectionRef = useRef(null);

  const handleClick = () => {
    staffSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Data for Devisi (Kepala Divisi)
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

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  // Komponen Card untuk Kepala Divisi
  function DevisiCard({ foto, nama, jabatan, color }) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-4 text-center shadow-md hover:shadow-lg transition-shadow duration-300 w-full max-w-xs mx-auto flex flex-col items-center">
        <div
          className={`h-24 w-24 ${color.bg} rounded-full flex items-center justify-center mb-4 overflow-hidden border-2 border-white shadow-sm`}
        >
          <img
            src={foto}
            alt={`Foto ${nama}`}
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="font-semibold text-lg mb-1 text-gray-800">{nama}</h3>
        <p className={`${color.text} text-sm font-medium`}>{jabatan}</p>
      </div>
    );
  }

  // Memoize data items untuk CircularGallery
  const psdmItems = useMemo(
    () => staffPsdm.map((staff) => ({ image: staff.foto, text: staff.nama })),
    [],
  );
  const pendidikanItems = useMemo(
    () =>
      staffPendidikan.map((staff) => ({ image: staff.foto, text: staff.nama })),
    [],
  );
  const pengmasItems = useMemo(
    () =>
      staffPengmas.map((staff) => ({ image: staff.foto, text: staff.nama })),
    [],
  );
  const innovationItems = useMemo(
    () =>
      staffInnovation.map((staff) => ({ image: staff.foto, text: staff.nama })),
    [],
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      {/* Main Hero */}
      <section
        id="memberHero"
        className="pt-24 lg:pt-28 pb-16 lg:pb-20 bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50"
      >
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap lg:flex-nowrap items-center justify-between gap-12 lg:gap-16">
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <h1 className="text-3xl lg:text-4xl font-extrabold text-[#13A085] mb-4">
                Struktur Divisi <br /> UKM Cyber UNUSA
              </h1>
              <p className="font-poppins text-gray-600 text-lg lg:text-xl mb-8 leading-relaxed">
                UKM CYBER UNUSA memiliki 4 divisi utama: PSDM, Pendidikan,
                Pengabdian Masyarakat (Pengmas), serta Inovasi &
                Entrepreneurship. Setiap divisi dipimpin oleh seorang Kepala
                Divisi (Kadiv) dan didukung oleh staff yang berdedikasi.
              </p>
              <button
                onClick={handleClick}
                className="py-3 px-6 text-base font-semibold rounded-lg text-white bg-[#26B99A] hover:bg-[#13A085] shadow-md hover:shadow-lg transition duration-300 ease-in-out inline-flex items-center group"
              >
                Lihat Staff Divisi
                <ArrowDown className="ml-2 h-5 w-5 transform transition-transform duration-300 group-hover:translate-y-1" />
              </button>
            </div>
            {/* Kartu Divisi di Kanan */}
            <motion.div
              className="w-full lg:w-1/2"
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {devisiList.map((item, idx) => (
                  <motion.div variants={itemVariants}>
                    <DevisiCard key={idx} {...item} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Member Slider Section */}
      <section
        id="staffDivisi"
        ref={staffSectionRef}
        className="py-16 lg:py-24 bg-white"
      >
        <div className="container mx-auto px-6">
          <h2 className="text-center font-bold text-3xl lg:text-4xl text-[#13A085] mb-16">
            Staff Divisi
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
            {/* Staff PSDM */}
            <div className="border border-gray-200 p-6 bg-white text-center rounded-xl shadow-md">
              <h3 className="text-blue-600 text-2xl font-bold mb-6">
                Staff PSDM
              </h3>
              {/* Hapus 'relative' dari pembungkus div ini */}
              <div className="h-80 w-full">
                <CircularGallery
                  bend={0}
                  textColor="#333"
                  borderRadius={0.05}
                  scrollEase={0.03}
                  items={psdmItems}
                />
              </div>
            </div>

            {/* Staff Pendidikan */}
            <div className="border border-gray-200 p-6 bg-white text-center rounded-xl shadow-md">
              <h3 className="text-green-600 text-2xl font-bold mb-6">
                Staff Pendidikan
              </h3>
              {/* Hapus 'relative' dari pembungkus div ini */}
              <div className="h-80 w-full">
                <CircularGallery
                  bend={0}
                  textColor="#333"
                  borderRadius={0.05}
                  scrollEase={0.03}
                  items={pendidikanItems}
                />
              </div>
            </div>

            {/* Staff Pengmas */}
            <div className="border border-gray-200 p-6 bg-white text-center rounded-xl shadow-md">
              <h3 className="text-purple-600 text-2xl font-bold mb-6">
                Staff Pengmas
              </h3>
              {/* Hapus 'relative' dari pembungkus div ini */}
              <div className="h-80 w-full">
                <CircularGallery
                  bend={0}
                  textColor="#333"
                  borderRadius={0.05}
                  scrollEase={0.03}
                  items={pengmasItems}
                />
              </div>
            </div>

            {/* Staff Innovation */}
            <div className="border border-gray-200 p-6 bg-white text-center rounded-xl shadow-md">
              <h3 className="text-[var(--yel)] text-2xl font-bold mb-6">
                Staff Innovation & Entrepreneur
              </h3>
              {/* Hapus 'relative' dari pembungkus div ini */}
              <div className="h-80 w-full">
                <CircularGallery
                  bend={0}
                  textColor="#333"
                  borderRadius={0.05}
                  scrollEase={0.03}
                  items={innovationItems}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Member;
