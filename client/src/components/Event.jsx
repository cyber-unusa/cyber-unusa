import { Link } from "react-router-dom";

export default function Event() {
  return (
    <>
      <h2 className="text-3xl lg:text-2xl font-bold text-center mb-16 text-yel font-rubik">
        KEGIATAN UKM CYBER
      </h2>

      <div className="container mx-auto px-6 flex flex-wrap gap-6 justify-center relative">
        <img
          src="asset/vector/v2.png"
          alt="decoration"
          className="absolute right-1 -top-44 w-60 hidden lg:block "
        />
        <div className="rounded-lg shadow-lg overflow-hidden mb-10 lg:w-72">
          <img src="/asset/banner/ux.jpg" alt="banner" className="w-full" />
          <div className="py-6 px-4">
            <div className="font-semibold text-xl font-nunito">
              Pelatihan Desaim UI/UX
            </div>
            <div className="font-semibold mb-2 text-lg font-nunito">
              Tanggal : -
            </div>
            <div className="font-semibold text-xl text-end">
              <p className="font-normal text-sm mb-4 text-left font-poppin">
                Pelatihan UI/UX dari dasar sampai mahir, dengan instruktur yang
                sudah ber kompeten di bidangnya
              </p>
            </div>
            <Link
              to="/cooming"
              className="py-1 px-1 text-base font-bold rounded-lg text-white bg-lowprim hover:shadow-lg hover:opacity-90 transition duration-300 ease-in-out text-right font-poppin"
            >
              Cooming soon...
            </Link>
          </div>
        </div>
        <div className="rounded-lg shadow-lg overflow-hidden mb-10 lg:w-72">
          <img src="/asset/banner/ads.jpg" alt="banner" className="w-full" />
          <div className="py-6 px-4">
            <div className="font-semibold text-xl font-nunito">
              Pelatihan Digital Marketing
            </div>
            <div className="font-semibold mb-2 text-lg font-nunito">
              Tanggal : -{" "}
            </div>
            <div className="font-semibold text-xl text-end">
              <p className="font-normal text-sm mb-4 text-left font-poppin">
                Pelatihan digital Marketing dari pemula sampai bisa, dan
                tentunya akan dibimbing dengan instruktur yang sudah
                berpengalaman
              </p>
              <Link
                to="/cooming"
                className="py-1 px-1 text-base font-bold rounded-lg text-white bg-lowprim hover:shadow-lg hover:opacity-90 transition duration-300 ease-in-out text-right font-poppin"
              >
                Cooming soon...
              </Link>
            </div>
          </div>
        </div>
        <div className="rounded-lg shadow-lg overflow-hidden mb-10 lg:w-72">
          <img src="/asset/banner/react.jpg" alt="banner" className="w-full" />
          <div className="py-6 px-4">
            <div className="font-semibold text-xl font-nunito">
              Pelatihan React JS
            </div>
            <div className="font-semibold mb-2 text-lg font-nunito">
              Tanggal :{" "}
            </div>
            <div className="font-semibold text-xl text-end">
              <p className="font-normal text-sm mb-4 text-left font-poppin">
                Pengen menjadi web front end handal, ikuti pelatihan react js
              </p>
              <Link
                to="/cooming"
                className="py-1 px-1 text-base font-bold rounded-lg text-white bg-lowprim hover:shadow-lg hover:opacity-90 transition duration-300 ease-in-out text-right font-poppin"
              >
                Cooming soon...
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
