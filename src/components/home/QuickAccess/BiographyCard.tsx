"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronRight, Quote } from "lucide-react";
import { chiefMessage } from "@/src/data/homeData";

const BiographyCard = ({ openModal }: { openModal: () => void }) => {
  return (
    <motion.div
      className="w-full lg:w-[20%] lg:sticky lg:top-28 lg:self-start"
      initial={{
        opacity: 0,
        x: 30,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.6,
        delay: 0.2,
      }}
    >
      <div className="relative rounded-2xl overflow-hidden bg-white shadow-md border border-gray-300">
        {/* Chief title - at top */}
        <div className="underline px-4 pt-4 text-sm sm:text-md text-center font-semibold text-[#ffb900] tracking-wider bg-white">
          Chief Hydrographer
        </div>

        {/* Chief image */}
        <div className="relative h-64 sm:h-72 md:h-80 lg:h-72 xl:h-80 2xl:h-96 overflow-hidden">
          <Image
            src="/CHIEF.jpeg"
            alt={chiefMessage.name}
            fill
            className="object-cover p-4"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
          />
        </div>

        {/* Content panel */}
        <div className="relative flex flex-col items-center justify-center px-4 sm:px-5 pb-4 sm:pb-6 pt-2 sm:pt-3 bg-white">
          <Quote size={20} className="text-gray-400 mb-1 sm:mb-2" />

          <h3 className="text-pBlue text-center font-bold text-sm sm:text-base leading-snug">
            {chiefMessage.name}
          </h3>
          <p className="text-gray-500 text-center text-xs font-semibold uppercase tracking-wider mt-0.5 mb-3 sm:mb-4">
            {chiefMessage.designation}
          </p>

          <button
            onClick={openModal}
            className="mt-4 sm:mt-6 lg:mt-10 cursor-pointer group w-full flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-gray-50 hover:bg-gray-200 border border-gray-200 hover:border-gray-400 transition-all duration-200"
          >
            <span className="text-gray-700 text-xs sm:text-sm font-semibold">
              Read Full Biography
            </span>
            <ChevronRight
              size={14}
              className="text-gray-500 transition-transform duration-200 group-hover:translate-x-1 sm:size-4"
            />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default BiographyCard;
