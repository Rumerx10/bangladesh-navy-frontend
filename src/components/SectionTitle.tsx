"use client";
import { motion } from "framer-motion";

const SectionTitle = ({
  title,
  desc,
  position = "center",
}: {
  title: string;
  desc?: string;
  position?: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={`mb-8 lg:mb-10 flex flex-col items-${position} justify-${position} `}
    >
      <h2 className="text-3xl lg:text-5xl font-bold text-pBlue">{title}</h2>
      <p
        className={`max-w-3xl text-${position} mt-2 text-sm lg:text-base text-gray-500`}
      >
        {desc}
      </p>
    </motion.div>
  );
};

export default SectionTitle;
