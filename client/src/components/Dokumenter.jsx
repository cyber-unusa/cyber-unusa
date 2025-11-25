import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { AppContext } from "../context/appContext";
import { motion, AnimatePresence } from "framer-motion";

export default function Dokumenter() {
  const { backendUrl } = useContext(AppContext);
  const [dokumenters, setDokumenters] = useState([]);

  useEffect(() => {
    const fetchDokumenter = async () => {
      try {
        const { data } = await axios.get(backendUrl + "/api/dokumenter/get");
        if (data.success) {
          setDokumenters(data.allDokumenter || []);
        }
      } catch (error) {
        console.error("Gagal memuat dokumenter:", error);
      }
    };
    fetchDokumenter();
  }, [backendUrl]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  return (
    <>
      <h2 className="text-3xl lg:text-2xl font-bold text-center mb-16 text-green-500 pt-8 font-rubik">
        DOKUMENTER KEGIATAN CYBER
      </h2>

      {dokumenters && dokumenters.length > 0 ? (
        <motion.div
          className="container px-6 mx-auto flex flex-wrap gap-8 justify-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
        >
          {dokumenters.map((item, index) => (
            <motion.div
              key={index}
              className="rounded-lg shadow-md mb-10 bg-white overflow-hidden w-80 lg:w-72"
              variants={itemVariants}
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="py-6 px-4">
                <h3 className="font-semibold text-xl mb-2 font-nunito">
                  {item.title}
                </h3>
                <p className="font-poppin">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          className="bg-white rounded-lg border border-zinc-200 p-6 text-center hover:shadow-lg transition-shadow w-full max-w-xs mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="show"
          viewport={{ once: true, amount: 0.4 }}
        >
          <p className="text-center text-gray-600 text-xl font-bold">
            Belum ada kegiatan yang ditambahkan.
          </p>
        </motion.div>
      )}
    </>
  );
}
