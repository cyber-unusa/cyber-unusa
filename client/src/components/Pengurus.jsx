import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { pengurus } from "../assets/assets";

export default function Pengurus() {
  const ref = useRef(null);
  const navigate = useNavigate();

  return (
    <section id="tim" className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Badan Pengurus Cyber
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Devisi kami terdiri dari profesional berpengalaman di berbagai
            bidang yang siap membantu mewujudkan visi dan misi bisnis Anda.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-lg border p-6 mt-10 text-center hover:shadow-lg transition-shadow">
            <div className="h-20 w-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-semibold">
              AB
            </div>
            <h3 className="font-semibold text-lg mb-1">Ahmad Budi</h3>
            <p className="text-blue-600 text-sm mb-3">CEO & Founder</p>
            <p className="text-gray-600 text-sm">
              15+ tahun pengalaman dalam konsultasi bisnis dan pengembangan
              strategi
            </p>
          </div>

          <div className="bg-white rounded-lg border p-6 text-center hover:shadow-lg transition-shadow">
            <div className="h-20 w-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-semibold">
              SP
            </div>
            <h3 className="font-semibold text-lg mb-1">Sari Putri</h3>
            <p className="text-green-600 text-sm mb-3">Head of HR</p>
            <p className="text-gray-600 text-sm">
              Spesialis manajemen SDM dengan keahlian dalam pengembangan talent
            </p>
          </div>

          <div className="bg-white rounded-lg border p-6 mt-10 text-center hover:shadow-lg transition-shadow">
            <div className="h-20 w-20 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-semibold">
              RH
            </div>
            <h3 className="font-semibold text-lg mb-1">Riko Hartono</h3>
            <p className="text-purple-600 text-sm mb-3">
              Digital Marketing Lead
            </p>
            <p className="text-gray-600 text-sm">
              Expert dalam strategi pemasaran digital dan growth hacking
            </p>
          </div>
        </div>

        <div className="text-center mb-16">
          <div className="inline-block mb-4 bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-semibold">
            Devisi Cyber
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Devisi kami terdiri dari profesional berpengalaman di berbagai
            bidang yang siap membantu mewujudkan visi dan misi bisnis Anda.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          <div className="bg-white rounded-lg border p-6 text-center hover:shadow-lg transition-shadow">
            <div className="h-20 w-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-semibold">
              AB
            </div>
            <h3 className="font-semibold text-lg mb-1">Ahmad Budi</h3>
            <p className="text-blue-600 text-sm mb-3">CEO & Founder</p>
            <p className="text-gray-600 text-sm">
              15+ tahun pengalaman dalam konsultasi bisnis dan pengembangan
              strategi
            </p>
          </div>

          <div className="bg-white rounded-lg border p-6 text-center hover:shadow-lg transition-shadow">
            <div className="h-20 w-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-semibold">
              AB
            </div>
            <h3 className="font-semibold text-lg mb-1">Ahmad Budi</h3>
            <p className="text-blue-600 text-sm mb-3">CEO & Founder</p>
            <p className="text-gray-600 text-sm">
              15+ tahun pengalaman dalam konsultasi bisnis dan pengembangan
              strategi
            </p>
          </div>

          <div className="bg-white rounded-lg border p-6 text-center hover:shadow-lg transition-shadow">
            <div className="h-20 w-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-semibold">
              SP
            </div>
            <h3 className="font-semibold text-lg mb-1">Sari Putri</h3>
            <p className="text-green-600 text-sm mb-3">Head of HR</p>
            <p className="text-gray-600 text-sm">
              Spesialis manajemen SDM dengan keahlian dalam pengembangan talent
            </p>
          </div>

          <div className="bg-white rounded-lg border p-6 text-center hover:shadow-lg transition-shadow">
            <div className="h-20 w-20 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-semibold">
              RH
            </div>
            <h3 className="font-semibold text-lg mb-1">Riko Hartono</h3>
            <p className="text-purple-600 text-sm mb-3">
              Digital Marketing Lead
            </p>
            <p className="text-gray-600 text-sm">
              Expert dalam strategi pemasaran digital dan growth hacking
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
