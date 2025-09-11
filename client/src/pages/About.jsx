import React from "react";
import { Target, Award, CheckCircle } from "lucide-react";
import Navbar from "../components/Navbar";

export default function About() {
  return (
    <>
      <div className="pt-2 mt-24 lg:mt-14">
        <Navbar />
      </div>
      <section id="tentang" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block mb-4 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
                Tentang Kami
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Mitra Terpercaya untuk Kesuksesan Bisnis Anda
              </h2>
              <p className="text-gray-600 mb-6">
                Didirikan dengan visi untuk menjadi mitra strategis bagi
                perusahaan dalam menghadapi tantangan bisnis modern. Kami
                memiliki tim ahli yang berpengalaman dan berkomitmen untuk
                memberikan solusi terbaik.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Tim profesional berpengalaman</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Solusi yang disesuaikan dengan kebutuhan</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Dukungan 24/7 untuk klien</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white rounded-lg border p-6 hover:shadow-lg transition-shadow">
                <Target className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="font-semibold mb-2">Visi</h3>
                <p className="text-sm text-gray-600">
                  Menjadi perusahaan konsultan bisnis terdepan di Indonesia
                </p>
              </div>
              <div className="bg-white rounded-lg border p-6 hover:shadow-lg transition-shadow">
                <Award className="h-12 w-12 text-green-600 mb-4" />
                <h3 className="font-semibold mb-2">Misi</h3>
                <p className="text-sm text-gray-600">
                  Memberikan solusi inovatif untuk pertumbuhan bisnis
                  berkelanjutan
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
