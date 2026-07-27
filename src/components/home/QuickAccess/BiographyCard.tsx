"use client";

import Image from "next/image";
import { IBiography } from "../../types";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface BiographyCardProps {
  data: IBiography;
  openModal: () => void;
}

const BiographyCard = ({ data, openModal }: BiographyCardProps) => {
  return (
    <motion.div
      className="w-full lg:w-[20%] lg:sticky lg:top-28 lg:self-start"
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="rounded-xl overflow-hidden bg-white shadow-md border border-gray-200">
        {/* Navy header */}
        <div className="bg-[#1B2A4A] px-4 py-3 text-center">
          <span className="text-white font-bold text-sm tracking-wide">
            {data.designationEn || "Chairman"}
          </span>
        </div>

        {/* Portrait image */}
        <div className="relative h-64 sm:h-72 md:h-80 lg:h-72 xl:h-80 2xl:h-96 overflow-hidden bg-gray-50">
          <Image
            src={data.imageUrl || "/CHIEF.jpeg"}
            alt={data.nameEn}
            fill
            className="object-cover object-top"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
          />
        </div>

        {/* Name + button */}
        <div className="px-4 py-4 flex flex-col items-center text-center gap-1">
          <h3 className="text-[#1B2A4A] font-bold text-sm sm:text-base leading-snug">
            {data.nameEn}
          </h3>
          <p className="text-gray-500 text-xs font-medium">
            {data.designationEn}
          </p>

          <button
            onClick={openModal}
            className="mt-4 cursor-pointer flex items-center gap-2.5 pl-6 pr-1.5 py-1.5 bg-[#1B2A4A] hover:bg-[#243660] text-white text-sm font-semibold rounded-full transition-colors duration-200"
          >
            View Profile
            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-amber-400">
              <ArrowUpRight size={15} className="text-[#1B2A4A]" />
            </span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default BiographyCard;
