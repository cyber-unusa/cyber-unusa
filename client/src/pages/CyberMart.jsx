import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { money, bag, task } from "../assets/Icons";
import Products from "../components/Products";

export default function CyberMart() {
  return (
    <div className="bg-white">
      <Navbar />
      <section
        id="head"
        className="pt-24 lg:pt-28 pb-16 lg:pb-20 bg-gradient-to-br from-green-50 via-cyan-50 to-blue-50"
      >
        <div className="container mx-auto px-6 lg:px-16 flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0 lg:pr-12">
            <h1 className="text-4xl sm:text-4xl lg:text-5xl font-extrabold text-[#13A085] mb-4 leading-tight">
              CYBER{" "}
              <span className="bg-[#13A085] text-white px-4 py-1 rounded-lg inline-block shadow-md">
                MART
              </span>
            </h1>
            <h2 className="font-bold text-[#26B99A] text-2xl md:text-2xl mb-6 tracking-wide">
              PRODUK & MERCHANDISE RESMI UKM CYBER UNUSA
            </h2>
            <p className="font-poppins text-gray-600 text-lg mb-8 leading-relaxed">
              Jelajahi koleksi produk kami, dari merchandise keren seperti baju
              dan stiker hingga produk digital yang bermanfaat. Dibuat oleh
              anggota, untuk Anda.
            </p>
          </div>
          {/* Gambar */}
          <div className="lg:w-1/2">
            <img
              src="/asset/services-img.png"
              alt="Cyber Services Illustration"
              className="w-full h-auto object-contain max-w-lg mx-auto drop-shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="whyChooseUs" className="bg-gray-50 py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-3xl lg:text-4xl font-bold text-[#13A085] mb-16">
            MENGAPA MEMILIH KAMI?
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {/* Item 1 */}
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 flex flex-col items-center hover:shadow-lg transition-shadow duration-300">
              <div className="w-20 h-20 mb-12 text-[#FFDA44]">{money()}</div>
              <h2 className="text-xl font-semibold text-gray-700">
                Harga Terjangkau
              </h2>
              <p className="text-gray-500 mt-2 text-sm">
                Solusi berkualitas tanpa menguras kantong.
              </p>
            </div>
            {/* Item 2 */}
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 flex flex-col items-center hover:shadow-lg transition-shadow duration-300">
              <div className="w-20 h-20 mb-12 text-[#13A085]">{bag()}</div>
              <h2 className="text-xl font-semibold text-gray-700">
                Tim Profesional
              </h2>
              <p className="text-gray-500 mt-2 text-sm">
                Dikerjakan oleh mahasiswa IT berpengalaman.
              </p>
            </div>
            {/* Item 3 */}
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 flex flex-col items-center hover:shadow-lg transition-shadow duration-300">
              <div className="w-20 h-20 mb-12 text-[#FFDA44]">{task()}</div>
              <h2 className="text-xl font-semibold text-gray-700">
                Terpercaya & Terstruktur
              </h2>
              <p className="text-gray-500 mt-2 text-sm">
                Proses kerja jelas dan hasil memuaskan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bagian Produk */}
      <Products />

      <Footer />
    </div>
  );
}
