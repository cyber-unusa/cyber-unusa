import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import {
  money,
  bag,
  task,
  webDev,
  uiux,
  rakitPc,
  undangan,
  fastWorking,
  codesBracket,
  rocket,
  icons1,
} from "../assets/Icons"; // Pastikan path Icons.jsx benar

export default function CyberMart() {
  return (
    <div className="bg-white">
      <Navbar />

      {/* Hero Section */}
      <section
        id="head"
        className="pt-28 lg:pt-32 bg-gradient-to-br from-green-50 via-cyan-50 to-blue-50"
      >
        <div className="container mx-auto px-6 lg:px-16 flex flex-col lg:flex-row items-center">
          {/* Teks */}
          <div className="lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0 lg:pr-12">
            <h1 className="text-4xl sm:text-4xl lg:text-5xl font-extrabold text-[#13A085] mb-4 leading-tight">
              PERLU{" "}
              <span className="bg-[#13A085] text-white px-4 py-1 rounded-lg inline-block shadow-md">
                WEBSITE
              </span>
              ?
            </h1>
            <h1 className="text-4xl sm:text-4xl lg:text-5xl font-extrabold text-[#13A085] mb-6 leading-tight">
              TENANG ADA KAMI!
            </h1>
            <h2 className="font-bold text-[#26B99A] text-2xl md:text-2xl mb-6 tracking-wide">
              CYBERIN AJA
            </h2>
            <p className="font-poppins text-gray-600 text-lg mb-8 leading-relaxed">
              Tingkatkan level bisnis Anda dengan layanan digital kami. Jadikan
              kehadiran online Anda lebih profesional dan jangkau lebih banyak
              orang. Yuk, #CyberinAja!
            </p>
          </div>
          {/* Gambar */}
          <div className="lg:w-1/2">
            <img
              src="/asset/services-img.png" // Pastikan path ini benar
              alt="Cyber Services Illustration"
              className="w-full h-auto object-contain max-w-lg mx-auto drop-shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="whyChooseMe" className="bg-gray-50 py-16 lg:py-24">
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

      {/* What We Do */}
      <section id="WhatWeDo" className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-3xl lg:text-4xl font-bold text-[#13A085] mb-16">
            LAYANAN KAMI
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden transition-shadow duration-300 hover:shadow-xl flex flex-col group">
              <div className="h-48 flex items-center justify-center p-6 bg-gradient-to-br from-cyan-50 to-blue-100 overflow-hidden relative">
                <div className="transform transition-transform duration-500 group-hover:scale-110">
                  {webDev()}
                </div>
              </div>
              <div className="p-6 text-left flex-grow">
                <h2 className="font-bold text-xl text-gray-800 mb-2">
                  Web Development
                </h2>
                <p className="font-poppins text-sm text-gray-600 leading-relaxed">
                  Wujudkan ide Anda menjadi website profesional, mulai dari
                  profil bisnis hingga toko online.
                </p>
              </div>
            </div>
            {/* Card 2 */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden transition-shadow duration-300 hover:shadow-xl flex flex-col group">
              <div className="h-48 flex items-center justify-center p-6 bg-gradient-to-br from-green-50 to-teal-100 overflow-hidden relative">
                <div className="transform transition-transform duration-500 group-hover:scale-110">
                  {uiux()}
                </div>
              </div>
              <div className="p-6 text-left flex-grow">
                <h2 className="font-bold text-xl text-gray-800 mb-2">
                  UI/UX Desain
                </h2>
                <p className="font-poppins text-sm text-gray-600 leading-relaxed">
                  Ciptakan tampilan aplikasi atau website yang menarik dan mudah
                  digunakan oleh pengunjung.
                </p>
              </div>
            </div>
            {/* Card 3 */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden transition-shadow duration-300 hover:shadow-xl flex flex-col group">
              <div className="h-48 flex items-center justify-center p-6 bg-gradient-to-br from-yellow-50 to-amber-100 overflow-hidden relative">
                <div className="transform transition-transform duration-500 group-hover:scale-110">
                  {rakitPc()}
                </div>
              </div>
              <div className="p-6 text-left flex-grow">
                <h2 className="font-bold text-xl text-gray-800 mb-2">
                  Rakit PC
                </h2>
                <p className="font-poppins text-sm text-gray-600 leading-relaxed">
                  Bingung spesifikasi PC? Kami bantu rakit komputer sesuai
                  kebutuhan dan budget Anda.
                </p>
              </div>
            </div>
            {/* Card 4 */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden transition-shadow duration-300 hover:shadow-xl flex flex-col group">
              <div className="h-48 flex items-center justify-center p-6 bg-gradient-to-br from-indigo-50 to-purple-100 overflow-hidden relative">
                <div className="transform transition-transform duration-500 group-hover:scale-110">
                  {fastWorking()}
                </div>
              </div>
              <div className="p-6 text-left flex-grow">
                <h2 className="font-bold text-xl text-gray-800 mb-2">
                  Instalasi Software
                </h2>
                <p className="font-poppins text-sm text-gray-600 leading-relaxed">
                  Instal ulang Windows, Office, atau software lainnya? Serahkan
                  pada kami, cepat dan beres!
                </p>
              </div>
            </div>
            {/* Card 5 */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden transition-shadow duration-300 hover:shadow-xl flex flex-col group">
              <div className="h-48 flex items-center justify-center p-6 bg-gradient-to-br from-pink-50 to-rose-100 overflow-hidden relative">
                <div className="transform transition-transform duration-500 group-hover:scale-110">
                  {undangan()}
                </div>
              </div>
              <div className="p-6 text-left flex-grow">
                <h2 className="font-bold text-xl text-gray-800 mb-2">
                  Undangan Digital
                </h2>
                <p className="font-poppins text-sm text-gray-600 leading-relaxed">
                  Buat undangan pernikahan, acara, atau lainnya lebih modern dan
                  praktis dengan format digital.
                </p>
              </div>
            </div>
            {/* Card 6 (Bisa ditambahkan layanan lain atau kosongkan) */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden transition-shadow duration-300 hover:shadow-xl flex flex-col group">
              <div className="h-48 flex items-center justify-center p-6 bg-gradient-to-br from-gray-50 to-slate-100 overflow-hidden relative">
                <div className="transform transition-transform duration-500 group-hover:scale-110">
                  {codesBracket()}
                </div>
              </div>
              <div className="p-6 text-left flex-grow">
                <h2 className="font-bold text-xl text-gray-800 mb-2">
                  Layanan Lain?
                </h2>
                <p className="font-poppins text-sm text-gray-600 leading-relaxed">
                  Punya kebutuhan IT lainnya? Jangan ragu untuk diskusikan
                  dengan kami!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Konsultasi */}
      <section
        id="Konsultasi"
        className="bg-gradient-to-br from-green-50 via-cyan-50 to-blue-50 py-16 lg:py-24 overflow-hidden"
      >
        <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Ilustrasi & Teks Kiri */}
          <div className="lg:w-1/2 relative text-center lg:text-left">
            {/* Decorative Icons */}
            <span className="absolute z-0 -top-20 -left-10 w-32 md:w-48 lg:w-40 opacity-10 transform rotate-12">
              {icons1()}
            </span>
            <span className="absolute z-0 bottom-10 -right-10 w-40 md:w-56 lg:w-48 opacity-10 transform -rotate-12">
              {codesBracket()}
            </span>
            <span className="absolute z-0 top-1/2 left-1/4 w-24 md:w-32 lg:w-28 opacity-10 transform -translate-y-1/2 rotate-6">
              {rocket()}
            </span>

            {/* Main Text */}
            <div className="relative z-10">
              <h1 className="text-[#13A085] font-extrabold text-3xl md:text-4xl lg:text-5xl leading-tight mb-4">
                Sudah siap untuk Go Digital?
              </h1>
              <h2 className="text-gray-700 font-semibold text-xl md:text-2xl lg:text-3xl leading-tight mb-8">
                Diskusikan kebutuhan Anda bersama kami.
              </h2>
              <div className="inline-block bg-[#13A085] text-white font-extrabold text-2xl md:text-3xl lg:text-4xl px-5 py-3 rounded-lg shadow-lg transform -rotate-2">
                #DIGITALIN{" "}
                <span className="block text-center lg:inline">AJA</span>
              </div>
            </div>
          </div>

          {/* Form Konsultasi */}
          <div className="lg:w-1/2 w-full max-w-lg mx-auto lg:mx-0 bg-white p-8 rounded-xl shadow-xl z-10">
            <div className="flex items-center mb-6 gap-3 justify-center lg:justify-start">
              <h2 className="text-[#13A085] font-bold text-2xl md:text-3xl">
                Konsultasi Gratis!
              </h2>
            </div>
            <p className="text-gray-600 mb-6 text-center lg:text-left text-sm">
              Isi formulir di bawah ini, tim kami akan segera menghubungi Anda.
            </p>
            <form action="" className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="nama"
                    className="block text-gray-600 font-medium mb-1 text-sm"
                  >
                    Nama
                  </label>
                  <input
                    type="text"
                    id="nama"
                    className="w-full border border-gray-300 rounded-md p-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#26B99A] focus:border-transparent transition duration-200"
                    placeholder="Nama Lengkap"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-gray-600 font-medium mb-1 text-sm"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full border border-gray-300 rounded-md p-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#26B99A] focus:border-transparent transition duration-200"
                    placeholder="email@anda.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="layanan"
                  className="block text-gray-600 font-medium mb-1 text-sm"
                >
                  Layanan Yang Diperlukan
                </label>
                <select
                  id="layanan"
                  name="layanan"
                  className="w-full border border-gray-300 rounded-md p-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#26B99A] focus:border-transparent transition duration-200 appearance-none bg-white pr-8 bg-no-repeat bg-right" // Added appearance-none and background for arrow styling
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: "right 0.5rem center",
                    backgroundSize: "1.5em 1.5em",
                  }} // Simple arrow
                >
                  <option value="">-- Pilih Layanan --</option>
                  <option value="Web Development">Web Development</option>
                  <option value="UI/UX Desain">UI/UX Desain</option>
                  <option value="Rakit PC">Rakit PC</option>
                  <option value="Instalasi Komputer">Instalasi Komputer</option>
                  <option value="Undangan Digital">Undangan Digital</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="kendala"
                  className="block text-gray-600 font-medium mb-1 text-sm"
                >
                  Pesan / Kendala
                </label>
                <textarea
                  id="kendala"
                  rows="4"
                  className="w-full border border-gray-300 rounded-md p-2.5 text-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-[#26B99A] focus:border-transparent transition duration-200"
                  placeholder="Ceritakan kebutuhan atau kendala Anda..."
                ></textarea>
              </div>

              <Link to="/cooming" className="block pt-2">
                <button
                  type="button"
                  className="w-full bg-gradient-to-r from-[#26B99A] to-[#13A085] hover:from-[#13A085] hover:to-[#26B99A] text-white font-bold py-3 px-4 rounded-lg transition duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#13A085]"
                >
                  KIRIM KONSULTASI
                </button>
              </Link>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
