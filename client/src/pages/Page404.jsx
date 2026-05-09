import React from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function Page404() {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <main className="grid min-h-full place-items-center bg-white pt-8">
        <div className="flex flex-col text-center items-center justify-center">
          <p className="text-base font-semibold text-red-600">404</p>
          <h1 className="mt-2 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
            Halaman Tidak Ditemukan
          </h1>
          <img
            src="/asset/com.webp"
            alt="Logo"
            className="object-cover w-64 mb-8 rounded-full"
            loading="lazy"
          />
          <p className="mt-4 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
            Maaf, kami tidak dapat menemukan halaman yang Anda cari.
            <span className="font-bold text-xl">Mbalik O Ae</span>
          </p>
          <div className="mt-8 flex items-center justify-center gap-x-6">
            <button
              onClick={() => navigate("/")}
              className="bg-[var(--lowprim)] hover:shadow-lg hover:opacity-90 transition duration-300 ease-in-out text-white px-4 py-2 rounded-md"
            >
              Go back
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
