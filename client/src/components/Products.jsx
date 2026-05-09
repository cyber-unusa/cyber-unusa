import { useState } from "react";
import useProducts from "../hooks/useProducts";
import { formatRupiah, formatDate } from "../utils/utils";
import { X } from "lucide-react";

export default function Products() {
  const { products } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState(null);

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
              const isClosed =
                product.endDate && new Date(product.endDate) < new Date();
              return (
                <div
                  key={product._id}
                  onClick={() => setSelectedProduct(product)}
                  className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col group cursor-pointer"
                >
                  <div className="overflow-hidden h-64">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6 text-left flex-grow flex flex-col">
                    <h2 className="font-bold text-xl text-gray-800 mb-1 line-clamp-1">
                      {product.name}
                    </h2>

                    {product.endDate && (
                      <p className="text-xs font-semibold text-red-500 mb-3">
                        Batas PO: {formatDate(product.endDate)}
                      </p>
                    )}

                    <p className="font-poppins text-sm text-gray-600 leading-relaxed mb-3 line-clamp-2">
                      {product.description}
                    </p>
                    <p className="font-bold text-lg text-[#13A085] mt-auto mb-4">
                      {formatRupiah(product.price)}
                    </p>

                    <div className="flex gap-2 w-full mt-auto">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProduct(product);
                        }}
                        className="flex-1 text-center bg-white border border-[#26B99A] text-[#26B99A] hover:bg-[#26B99A] hover:text-white font-bold py-2 px-2 rounded-lg transition duration-300 text-sm"
                      >
                        Detail
                      </button>

                      {isClosed ? (
                        <div
                          className="flex-1 text-center bg-gray-400 text-white font-bold py-2 px-2 rounded-lg cursor-not-allowed select-none text-sm"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Ditutup
                        </div>
                      ) : (
                        <a
                          href={whatsappURL}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex-1 text-center bg-[#26B99A] hover:bg-[#13A085] text-white font-bold py-2 px-2 rounded-lg transition duration-300 text-sm"
                        >
                          Pesan
                        </a>
                      )}
                    </div>
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

      {/* POP-UP MODAL DETAIL MERCHANDISE */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-2xl max-w-4xl w-full relative overflow-hidden flex flex-col md:flex-row max-h-[90vh] shadow-2xl animate-fade-in-up">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-10 bg-white/80 p-2 rounded-full text-gray-600 hover:text-red-500 hover:bg-white transition-colors"
            >
              <X size={24} />
            </button>

            {/* Sisi Kiri: Gambar (Flex) */}
            <div className="md:w-1/2 bg-gray-50 flex items-center justify-center p-4">
              <img
                src={selectedProduct.imageUrl}
                alt={selectedProduct.name}
                className="w-full h-auto max-h-80 md:max-h-full object-contain rounded-lg"
                loading="lazy"
              />
            </div>

            {/* Sisi Kanan: Info Teks */}
            <div className="md:w-1/2 p-6 md:p-8 flex flex-col overflow-y-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gray-800">
                {selectedProduct.name}
              </h2>
              <p className="text-2xl font-bold text-[#13A085] mb-4">
                {formatRupiah(selectedProduct.price)}
              </p>

              {selectedProduct.endDate && (
                <div className="inline-block bg-red-100 text-red-600 text-sm px-3 py-1 rounded-full mb-4 font-semibold self-start">
                  Batas PO: {formatDate(selectedProduct.endDate)}
                </div>
              )}

              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Deskripsi Produk:
              </h3>
              <p className="text-gray-600 whitespace-pre-wrap leading-relaxed mb-8 flex-1">
                {selectedProduct.description}
              </p>

              {(() => {
                const isClosed =
                  selectedProduct.endDate &&
                  new Date() > new Date(selectedProduct.endDate);
                if (isClosed) {
                  return (
                    <div className="block w-full text-center bg-gray-400 text-white font-bold py-3 px-4 rounded-lg cursor-not-allowed mt-auto">
                      Pre-Order Ditutup
                    </div>
                  );
                } else {
                  const message = `Halo UKM Cyber, saya tertarik untuk memesan merchandise: ${selectedProduct.name}`;
                  const encodedMessage = encodeURIComponent(message);
                  const whatsappURL = `https://wa.me/${selectedProduct.nomorWa}?text=${encodedMessage}`;
                  return (
                    <a
                      href={whatsappURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center bg-[#26B99A] hover:bg-[#13A085] text-white font-bold py-3 px-4 rounded-lg transition duration-300 mt-auto"
                    >
                      Pesan via WhatsApp
                    </a>
                  );
                }
              })()}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
