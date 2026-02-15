import useProducts from "../hooks/useProducts";
import { formatRupiah, formatDate } from "../utils/utils";

export default function Products() {
  const { products } = useProducts();

  return (
    <>
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-3xl lg:text-4xl font-bold text-[#13A085] mb-16">
          MERCHANDISE KAMI
        </h1>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => {
              //Todo 1. Buat pesan dan Encode pesan agar valid di URL
              const message = `Halo UKM Cyber, saya tertarik untuk memesan merchandise: ${product.name}`;
              const encodedMessage = encodeURIComponent(message);
              //Todo 2. Nomor WhatsApp PC
              const NOMOR_WA = product.nomorWa;

              //Todo 3. Buat URL WhatsApp lengkap
              const whatsappURL = `https://wa.me/${NOMOR_WA}?text=${encodedMessage}`;

              //Todo 4. Cek apakah PO sudah ditutup
              const isClosed = product.endDate && new Date(product.endDate) < new Date();
              return (
                <div
                  key={product._id}
                  className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden transition-shadow duration-300 hover:shadow-xl flex flex-col group"
                >
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6 text-left flex-grow flex flex-col">
                    <h2 className="font-bold text-xl text-gray-800 mb-1">
                      {product.name}
                    </h2>

                    {/* Tampilkan Info Batas Waktu PO */}
                    {product.endDate && (
                      <p className="text-xs font-semibold text-red-500 mb-3">
                        Batas PO: {formatDate(product.endDate)}
                      </p>
                    )}

                    <p className="font-poppins text-sm text-gray-600 leading-relaxed mb-3">
                      {product.description}
                    </p>
                    <p className="font-bold text-lg text-[#13A085] mt-auto mb-4">
                      {formatRupiah(product.price)}
                    </p>

                    {/* Render Kondisional untuk Tombol PO */}
                    {isClosed ? (
                      <div className="block w-full text-center bg-gray-400 text-white font-bold py-3 px-4 rounded-lg cursor-not-allowed select-none">
                        PO Ditutup
                      </div>
                    ) : (
                      <a
                        href={whatsappURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full text-center bg-[#26B99A] hover:bg-[#13A085] text-white font-bold py-3 px-4 rounded-lg transition duration-300"
                      >
                        Pesan Sekarang
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-zinc-200 p-6 text-center hover:shadow-lg transition-shadow w-full max-w-xs mx-auto">
            <p className="text-center text-gray-600 text-xl font-bold">
              Belum ada Merchandise yang Tersedia.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
