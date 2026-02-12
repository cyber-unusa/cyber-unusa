// import { useNavigate } from "react-router-dom";
// import { useRef } from "react";
import { bph } from "../utils/constants";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import BphCard from "./common/Card";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Pengurus() {
  // Data for BPH
  const bphList = [
    {
      ...bph.ketum,
      color: { text: "text-blue-600", mt: "lg:mt-10" },
    },
    {
      ...bph.pembina,
      color: { text: "text-green-600" },
    },
    {
      ...bph.watum,
      color: { text: "text-[var(--yel)]", mt: "lg:mt-10" },
    },
    {
      ...bph.sekre1,
      color: { text: "text-blue-600" },
    },
    {
      ...bph.sekre2,
      color: { text: "text-green-600" },
    },
    {
      ...bph.bendahara,
      color: { text: "text-[var(--yel)]" },
    },
  ];

  return (
    <section id="tim">
      <div className="container px-8 lg:px-20 mx-auto">
        {/* Judul dan deskripsi BPH */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-green-600 mb-4 mx-5">
            Badan Pengurus Cyber
          </h2>
          <p className="text-gray-600 max-w-2xl mx-5 sm:mx-auto">
            Cyber Unusa terdiri dari individu berpengalaman di berbagai bidang
            yang siap membantu mewujudkan visi dan misi UKM Cyber.
          </p>
        </div>

        {/* BPH Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 my-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
        >
          {bphList.map((item, idx) => (
            <BphCard key={idx} {...item} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
