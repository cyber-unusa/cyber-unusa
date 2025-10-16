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
} from "../assets/Icons";

export default function CyberMart() {
  return (
    <>
      <Navbar />
      <section id="head" className="">
        <div className="container px-4 lg:px-16 pb-12 flex flex-col lg:flex-row mt-12">
          <div className="contens md:w-1/2 lg:w-2/4 pt-10 md:pt-20 lg:pt-36">
            <h1 className="max-sm:text-4xl sm:text-4xl md:text-4xl lg:text-5xl font-bold text-[var(--primary)]">
              PERLU
              <span className="font-bold border-0 rounded-md bg-[var(--primary)] text-white m-4">
                <span className="px-4 py-6">WEBSITE</span>
              </span>
            </h1>
            <h1 className="max-sm:text-4xl sm:text-4xl md:text-4xl lg:text-5xl font-bold text-[var(--primary)] mt-4">
              TENANG ADA KAMI !!!
            </h1>
            <h2 className="font-semibold text-[var(--lowprim)] mt-2 text-xl md:text-2xl">
              CYBERIN AJA
            </h2>
            <p className="font-poppin mt-4 md:mt-10">
              CYBERIN AJA bakal bikin kamu naik level dengan website dan jasa
              kami yang lainnya. Bantu bisnismu ataupun yang lain menjadi
              digital dan biar orang tau tentang kamu. Yuk jangan lupa
              CYBERINAJA
            </p>
          </div>
          <div className="contens-img md:w-1/2 lg:w-2/4 md:mt-12 lg:mt-4">
            <img
              src="/asset/services-img.png"
              alt=""
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      <section id="whyChooseMe" className="bg-[var(--secbg)]">
        <div className="container text-center py-12">
          <h1 className="text-xl lg:text-3xl font-bold text-[var(--primary)]">
            WHY CHOOSE ME?
          </h1>
          <div className="itemsz flex flex-col md:flex-row text-center pt-16">
            <div className="basis-3/4 px-4 md:px-10 lg:px-16 mb-8 md:mb-0">
              <div className="m-auto w-2/4">{money()}</div>
              <h1 className="mt-12">Paling Murah Dan Terjangkau !!!</h1>
            </div>
            <div className="basis-3/4 px-4 md:px-10 lg:px-16 mb-8 md:mb-0">
              <div className="m-auto w-2/4">{bag()}</div>
              <h1 className="mt-12">Professional Team</h1>
            </div>
            <div className="basis-3/4 px-4 md:px-10 lg:px-16">
              <div className="m-auto w-2/4">{task()}</div>
              <h1 className="mt-12">Terpercaya Dan Terstruktur</h1>
            </div>
          </div>
        </div>
      </section>

      <section id="WhatWeDo?">
        <div className="container text-center py-8 px-4">
          <h1 className="text-xl lg:text-3xl font-bold text-[var(--primary)]">
            WHAT WE DO?
          </h1>
          <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20 ">
            <div
              id="webDeveloper"
              className="basis-3/4 rounded-md shadow-lg mx-2 lg:mx-8 mt-2 lg:mt h-[400px]"
            >
              <div className="images">
                <span>{webDev()}</span>
              </div>
              <div className="contens text-white bg-[var(--primary)] py-4 px-4 h-[200px] rounded-b-lg mt-4">
                <h2 className="font-extrabold text-2xl">Web Developer</h2>
                <p className="font-bold text-sm pt-4">
                  Bikin bisnismu ataupun apapun yang kamu inginkan menjadi
                  digital yuk
                </p>
              </div>
            </div>
            <div
              id="uiUx"
              className="basis-3/4 rounded-md shadow-lg mx-2 lg:mx-8 mt-2 lg:mt h-[400px]"
            >
              <div className="images">
                <span>{uiux()}</span>
              </div>
              <div className="contens text-white bg-[var(--primary)] py-4 px-4 h-[200px] rounded-b-lg mt-4">
                <h2 className="font-extrabold text-2xl">UI/UX Desain</h2>
                <p className="font-bold text-sm pt-4">
                  Perbagus tampilanmu yuk agar orang-orang betah
                </p>
              </div>
            </div>
            <div
              id="rakitPc"
              className="basis-3/4 rounded-md shadow-lg mx-2 lg:mx-8 mt-2 lg:mt h-[400px]"
            >
              <div className="images">
                <span>{rakitPc()}</span>
              </div>
              <div className="contens text-white bg-[var(--primary)] py-4 px-4 h-[200px] rounded-b-lg mt-4">
                <h2 className="font-extrabold text-2xl">Rakit PC</h2>
                <p className="font-bold pt-4 text-sm">
                  Bingung mau beli komputer dan laptop. Titip kami aja , nanti
                  dicari kan yang bagus dan sesuai
                </p>
              </div>
            </div>
            <div
              id="webDeveloper"
              className="basis-3/4 rounded-md shadow-lg mx-2 lg:mx-8 mt-2 lg:mt h-[400px]"
            >
              <div className="images">
                <span>{fastWorking()}</span>
              </div>
              <div className="contens text-white bg-[var(--primary)] py-4 px-4 h-[200px] rounded-b-lg mt-4">
                <h2 className="font-extrabold text-2xl">Instalasi Laptop</h2>
                <p className="font-bold pt-4 text-sm">
                  Bingung mau instal ulang windows, aplikasi lain dan
                  sebagainya. Serah kan kami aja. Gak sampai 1 hari !!
                </p>
              </div>
            </div>
            <div
              id="webDeveloper"
              className="basis-3/4 rounded-md shadow-lg mx-2 lg:mx-8 mt-2 lg:mt h-[400px]"
            >
              <div className="images">
                <span>{undangan()}</span>
              </div>
              <div className="contens text-white bg-[var(--primary)] py-4 px-4 h-[200px] rounded-b-lg mt-4">
                <h2 className="font-extrabold text-2xl">Undangan Digital</h2>
                <p className="font-bold pt-4 text-sm">
                  Gak perlu pusing bikin undangan lagi!!. Digitalin aja disini!!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="Konsultasi" className="bg-[var(--secbg)] overflow-hidden lg:mt-28">
        <div className="container flex flex-col md:flex-row p-12 lg:p-20">
          <div className="item1 basis-2/4 md:basis-1/2 md:pt-0 lg:basis-1/2 relative pt-24 ] ">
            <h1 className="text-[var(--primary)] font-extrabold lg:text-3xl max-sm:text-xl md:text-2xl">
              Kami sudah membantu beberapa
            </h1>
            <h1 className="text-[var(--primary)] font-extrabold lg:text-3xl max-sm:text-xl md:text-2xl">
              Orang untuk naik level. Kamu kapan?
            </h1>
            <h1 className="font-extrabold lg:text-4xl max-sm:text-xl  bg-[var(--primary)] md:w-2/4 max-sm:w-2/4 lg:w-56 p-2  text-white rounded-md mt-4 md:text-2xl">
              #DIGITALIN <span className="block">AJA</span>
            </h1>
            <span className="absolute z-10 lg:-top-24 lg:right-24 max-sm:-top-4 max-sm:left-[18rem] max-sm:w-32 md:-top-20 md:right-0 lg:w-36">
              {icons1()}
            </span>
            <div className="absolute z-10 lg:bottom-56 lg:right-36  max-sm:-bottom-24 max-sm:right-16 md:-right-4 md:bottom-72">
              {rocket()}
            </div>
            <div className="absolute z-10 lg:bottom-32 lg:-left-16 max-sm:-bottom-36 max-sm:-left-8 md:bottom-52 md:-left-8">
              {codesBracket()}
            </div>
          </div>
          {/**konsul */}
          <div className="item2 basis-2/4 md:basis-1/2 lg:basis-1/2 max-sm:mt-52 md:ml-8 lg:pl-32">
            <div className="headTitle flex">
              <div className="contens1 max-sm:m-auto">
                <h1 className="text-[var(--primary)] font-extrabold lg:text-3xl max-sm:text-3xl sm:text-3xl  md:text-xl">
                  Yuk Konsultasi <span className="block">Sekarang Juga</span>
                </h1>
              </div>
              <div className="contens2 pl-4 items-center pt-1">
                <h1 className="text-white font-extrabold rounded-md lg:text-4xl max-sm:text-3xl sm:text-4xl bg-[var(--primary)] p-3 md:text-2xl">
                  GRATIS
                </h1>
              </div>
            </div>
            <div className="formulir mt-16 max-sm:text-center max-sm:m-auto max-sm:mt-20">
              <p className="lg:text-start md:text-center text-[var(--primary)] font-bold">
                Isi formulir dibawah ini agar kami bisa membantu anda
              </p>
              <form action="" className="pt-8">
                <div className="flex">
                  <div id="nama" className="basis-2/4">
                    <span className="block text-[var(--primary)] font-bold">Nama</span>
                    <input
                      type="text"
                      className="bg-[var(--primary)] w-3/5 rounded-md p-2 text-white"
                    />
                  </div>
                  <div id="email" className="basis-2/4">
                    <span className="block text-[var(--primary)] font-bold ">Email</span>
                    <input
                      type="text"
                      className="bg-[var(--primary)] w-3/5 rounded-md p-2 text-white"
                    />
                  </div>
                </div>

                <div id="layanans" className="pt-4 ">
                  <span className="block text-[var(--primary)] font-bold">
                    Layanan Yang Diperlukan
                  </span>
                  <select
                    name="layanan"
                    className="bg-[var(--primary)] p-2 mt-2 text-white font-bold rounded-md w-4/5"
                  >
                    <option value="">Web Development</option>
                    <option value="">UI/UX Desain</option>
                    <option value="">Rakit PC</option>
                    <option value="">Instalasi Komputer</option>
                    <option value="">Undangan Digital</option>
                  </select>
                </div>
                <div id="kendalas" className="pt-4">
                  <span className="block text-[var(--primary)] font-bold">
                    Kendala Yang Dihadapi
                  </span>
                  <textarea
                    rows="6"
                    className="bg-[var(--primary)] mt-2 w-4/5 rounded-md p-3 text-white resize-none"
                  ></textarea>
                  <Link to="/cooming">
                    <button className="bg-[var(--yellow)] p-2 block rounded-md mt-4 text-[var(--primary)] font-bold max-sm:m-auto max-sm:mt-4">
                      SUBMIT
                    </button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
