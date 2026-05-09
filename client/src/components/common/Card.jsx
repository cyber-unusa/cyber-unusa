// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

// Card for BPH (Badan Pengurus Harian)
export default function BphCard({ foto, nama, jabatan, color }) {
  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  return (
    <motion.div
      className={`bg-white rounded-lg border border-zinc-200 p-6 text-center hover:shadow-lg transition-shadow w-full max-w-xs mx-auto ${
        color?.mt || ""
      }`}
      variants={itemVariants}
    >
      <div className="flex items-center justify-center mx-auto mb-4">
        <img
          src={foto}
          alt=""
          className="rounded-full w-24 h-24 sm:w-28 sm:h-28 md:w-30 md:h-30 object-cover"
          loading="lazy"
        />
      </div>
      <h3 className="font-semibold text-lg mb-1">{nama}</h3>
      <p className={`${color?.text || "text-green-600"} text-sm mb-3`}>
        {jabatan}
      </p>
    </motion.div>
  );
}
