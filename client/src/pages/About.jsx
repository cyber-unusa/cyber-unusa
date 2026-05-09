import Footer from "../components/layouts/Footer";
import Navbar from "../components/layouts/Navbar";
import { Dot } from "lucide-react";
import { Helmet } from "react-helmet-async";

export default function About() {
  return (
    <>
      <Helmet>
        <title>Tentang Kami — Cyber UNUSA</title>
        <meta
          name="description"
          content="Sejarah, visi, misi, dan makna lambang UKM Cyber Security Universitas Nahdlatul Ulama Surabaya."
        />
      </Helmet>

      <Navbar />
      {/* Section 1: Sejarah UKM */}
      <div className="container mx-auto mt-20 px-4 sm:px-6 lg:px-8 py-12 flex flex-col lg:flex-row items-center">
        {/* Gambar Sejarah */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-start mb-8 lg:mb-0 lg:pr-8">
          <img
            src="/asset/cyber-logo-2.webp" // Pastikan path ini benar
            alt="Logo UKM Cyber UNUSA dengan latar"
            className="w-3/4 sm:w-1/2 lg:w-full max-w-md object-contain" // Ukuran lebih konsisten
            loading="lazy"
          />
        </div>
        {/* Konten Teks Sejarah */}
        <div className="w-full lg:w-1/2 text-left">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-[var(--primary)] font-rubik mb-2">
            SEJARAH UKM
          </h1>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-[var(--primary)] font-rubik mb-2">
            CYBER SECURITY
          </h1>
          <p className="text-[var(--lowprim)] font-bold text-lg mb-6">
            UNIVERSITAS NAHDLATUL ULAMA SURABAYA
          </p>
          <p className="font-poppin text-base leading-relaxed text-gray-700 bg-white rounded-lg border border-zinc-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            UKM Cyber Security Universitas Nahdlatul Ulama Surabaya dibentuk
            oleh mahasiswa angkatan 2018. Latar belakang terbentuknya adalah
            belum adanya wadah yang dapat menaungi mahasiswa UNUSA dalam hal
            teknologi. UKM Cyber bergerak di bidang teknologi, seperti editing,
            programming, dan networking.
          </p>
        </div>
      </div>

      {/* Section 2: Makna Lambang */}
      <div className="bg-[var(--secbg)] py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <h2 className="text-center font-rubik font-extrabold text-3xl text-[var(--yel)] mb-12">
            MAKNA LAMBANG UKM CYBER SECURITY
          </h2>
          <div className="flex flex-col-reverse lg:flex-row items-center">
            {/* Teks Makna Lambang */}
            <div className="w-full lg:w-1/2 text-left lg:pr-12 space-y-6 mt-8 lg:mt-0">
              <p className="font-poppin text-gray-700 leading-relaxed">
                <strong className="text-gray-800">9 Bintang:</strong>{" "}
                Melambangkan visi UKM Cyber UNUSA yang Rahmatan Lil Alamin.
              </p>
              <p className="font-poppin text-gray-700 leading-relaxed">
                <strong className="text-gray-800">Ikon Teknologi:</strong>{" "}
                Smartphone, komputer, perisai gembok, dan browser melambangkan
                fokus UKM pada *cyber security*, namun tetap terbuka untuk
                pembelajaran universal di bidang IT.
              </p>
              <p className="font-poppin text-gray-700 leading-relaxed">
                <strong className="text-gray-800">Bentuk Perisai:</strong>{" "}
                Melambangkan aspek keamanan.
              </p>
            </div>
            {/* Gambar Lambang */}
            <div className="w-full lg:w-1/2 flex justify-center">
              <img
                src="/asset/logo.webp"
                alt="Logo UKM Cyber UNUSA"
                loading="lazy"
                className="w-1/2 sm:w-1/3 lg:w-1/2 max-w-xs h-auto object-contain" // Ukuran disesuaikan
              />
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: Visi & Misi */}
      <section
        id="visi-misi"
        className="container mx-auto py-16 px-4 sm:px-6 lg:px-8"
      >
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          {/* Visi */}
          <div id="visi" className="w-full lg:w-1/2 text-center lg:text-left">
            <h2 className="font-bold text-3xl lg:text-4xl text-[var(--primary)] mb-6">
              VISI
            </h2>
            <p className="font-poppin text-base leading-relaxed text-gray-700 text-justify">
              Menjadi Unit Kegiatan Mahasiswa Cyber UNUSA terdepan yang berfokus
              keamanan, unggul di tingkat nasional dan internasional dengan
              membekali mahasiswa dengan ilmu IT serta meningkatkan *softskill*
              dan *hardskill* guna mengabdi pada masyarakat serta menuju
              *entrepeneurship* berasaskan Rahmatan Lil Alamin.
            </p>
          </div>
          {/* Misi */}
          <div id="misi" className="w-full lg:w-1/2">
            <h2 className="font-bold text-3xl lg:text-4xl text-[var(--primary)] text-center lg:text-left mb-6">
              MISI
            </h2>
            <ul className="list-none space-y-4 font-poppin text-base text-gray-700">
              {[
                "Meningkatkan minat dan bakat dibidang IT dikalangan mahasiswa UNUSA.",
                'Mengembangkan softskill dan hardskill mahasiswa melalui kegiatan progresif "Forum Cyber".',
                "Memfasilitasi kegiatan mahasiswa dibidang IT guna mengembangkan enterpreneurship IT berdasarkan rahmatan lil alamin.",
                "Meningkatkan peran aktif mahasiswa dalam pengembangan dunia IT dilingkunan Universitas Nahdlatul Ulama Surabaya.",
                "Membentuk generasi yang memiliki kesiapan mental dalam menghadapi perkembangan IT.",
                "Aktif dalam membuat atau menjalankan kegiatan bertema IT yang dapat memberikan dampak langsung terhadap masyarakat sekitar.",
              ].map((misi, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Dot // Ukuran diperkecil dan warna disesuaikan
                    className="inline text-[var(--primary)] mt-1 flex-shrink-0"
                    size={24} // Ukuran ikon diperkecil
                    strokeWidth="3"
                  />
                  <span className="text-justify leading-relaxed">{misi}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
