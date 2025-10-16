import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Dot } from "lucide-react";

export default function About() {
  return (
    <>
      <Navbar />
      <div className="container flex mt-20 lg:px-12 sm:px-0 m-auto flex-wrap">
        <img
          src="/asset/cyber-logo-2.png"
          alt=""
          className="lg:w-5/12 max-sm:w-10/12 sm:w-2/12 pt-4 lg:basis-2/4 sm:basis-full max-sm:m-auto sm:m-auto"
        />
        <div className="contens lg:basis-2/4 sm:basis-full text-left lg:px-15 max-sm:px-8 sm:px-8 lg:pt-24 max-sm:mt-4">
          <p className="font-extrabold text-5xl max-sm:text-4xl sm:text-4xl  pt-[5px] text-[#13A085] font-rubik">
            SEJARAH UKM
          </p>
          <p className="font-extrabold text-5xl max-sm:text-4xl sm:text-4xl pt-[5px] text-[#13A085] font-rubik">
            CYBER SECURITY
          </p>
          <p className="text-[#26B99A] font-bold pt-[5px]">
            UNIVERSITAS NAHDLATUL ULAMA SURABAYA
          </p>
          <p className="pt-[20px] font-poppin bg-white rounded-lg border p-6 hover:shadow-lg transition-shadow">
            UKM Cyber Security Universitas Nahdlatul Ulama Surabaya dibentuk
            oleh mahasiswa angkatan 2018. Awal mula terbentuknya UKM ini adalah
            Cyber di bentuk berlatar belakang karena belum ada wadah yang dapat
            menaungi mahasiswa unusa dalam hal teknologi. UKM Cyber sendiri
            bergerak di bidang teknologi. Seperti editing, programming, dan
            networking
          </p>
          <p className="pt-[20px] font-poppin"></p>
        </div>
      </div>
      {/**penjelasan lambang */}
      <div className="container  lg:mt-16 max-sm:mt-12 sm:mt-12 max-sm:px-4 bg-[var(--secbg)] lg:p-12">
        <p className="text-center font-rubik font-extrabold text-3xl text-[var(--yel)]">
          MAKNA LAMBANG UKM CYBER SECURITY
        </p>
        <div className="container flex flex-wrap-reverse  mt-[60px] max-sm:mt-4px sm:mt-4px">
          <div className="contens lg:basis-2/4 max-sm:basis-full sm:basis-full text-left  max-sm:px-4 sm:px-4 max-sm:mt-8 sm:mt-8 ">
            <p className="font-poppin">
              9 Bintang melambangkan visi dari Unit Kegiatan Mahasiswa Cyber
              UNUSA yang rahmatan lil alamin
            </p>
            <p className="pt-12 font-poppin">
              Smarthphone, Komputer, Perisai Gembok, Internet/Browser: Dengan
              arti Unit Kegiatan Mahasiswa Cyber UNUSA fokus dalam bidang cyber
              security, namun juga bersifat open universal learning.
            </p>
            <p className="pt-12 font-poppin">
              Bentuk perisai: melambangkan keamanan
            </p>
          </div>
          <div className="lg:basis-2/4 max-sm:basis-full sm:basis-full">
            <img src="/asset/logo.png" alt="" className=" h-[400px] m-auto " />
          </div>
        </div>
      </div>
      {/**visi&misi */}
      <section id="visi&misi">
        <div className="container flex max-sm:flex-col p-4 mt-8 font-poppin">
          <div
            id="visi"
            className="lg:basis-1/2 max-sm:basis-full sm:basis-full text-center p-8"
          >
            <h1 className="font-bold lg:text-4xl text-[var(--primary)] max-sm:text-3xl sm:text-3xl">
              {" "}
              VISI
            </h1>
            <p className="mt-12 text-justify">
              Menjadi Unit Kegiatan Mahasiswa Cyber UNUSA terdepan yang berfokus
              keamanan, unggul di tingkat nasional dan internasional dengan
              membekali mahasiswa dengan ilmu IT serta meningkatkan softskill
              dan hardskill guna mengabdi pada masyarakat serta menuju
              entrepeneurship berasaskan rahmatan lil alamin.
            </p>
          </div>
          <div
            id="misi"
            className="lg:basis-1/2 max-sm:basis-full sm:basis-full p-8"
          >
            <h1 className="font-bold lg:text-4xl text-[var(--primary)] text-center max-sm:text-3xl sm:text-3xl">
              MISI
            </h1>
            <div className="mt-12 text-justify">
              <ul className="list-none space-y-1">
                <li className="flex items-start gap-2">
                  <Dot
                    className="inline mt-1"
                    color="green"
                    size={50}
                    strokeWidth="2"
                  />
                  <span>
                    Meningkatkan minat dan bakat dibidang IT dikalangan
                    mahasiswa UNUSA.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Dot
                    className="inline mt-1"
                    color="green"
                    size={50}
                    strokeWidth="2"
                  />
                  <span>
                    Mengembangkan softskill dan hardskill mahasiswa melalui
                    kegiatan progresif "Forum Cyber".
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Dot
                    className="inline mt-1"
                    color="green"
                    size={50}
                    strokeWidth="2"
                  />
                  <span>
                    Memfasilitasi kegiatan mahasiswa dibidang IT guna
                    mengembangkan enterpreneurship IT berdasarkan rahmatan lil
                    alamin.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Dot
                    className="inline mt-1"
                    color="green"
                    size={50}
                    strokeWidth="2"
                  />
                  <span>
                    Meningkatkan peran aktif mahasiswa dalam pengembangan dunia
                    IT dilingkunan Universitas Nahdlatul Ulama Surabaya.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Dot
                    className="inline mt-1"
                    color="green"
                    size={50}
                    strokeWidth="2"
                  />
                  <span>
                    Membentuk generasi yang memiliki kesiapan mental dalam
                    menghadapi perkembangan IT.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Dot
                    className="inline mt-1"
                    color="green"
                    size={50}
                    strokeWidth="2"
                  />
                  <span>
                    Aktif dalam membuat atau menjalankan kegiatan bertema IT
                    yang dapat memberikan dampak langsung terhadap masyarakat
                    sekitar.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
