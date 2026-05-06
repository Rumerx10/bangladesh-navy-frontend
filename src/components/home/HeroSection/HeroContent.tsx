"use client";

import { IHeroButton } from "@/src/components/home/types";
import { motion } from "framer-motion";
import Link from "next/link";
import HeroBadge from "./HeroBadge";

interface HeroContentProps {
  subtitle: string;
  title: string;
  highlightTitle?: string;
  description: string;
  buttons: IHeroButton[];
}

export default function HeroContent({
  title,
  highlightTitle,
  description,
  buttons,
}: HeroContentProps) {
  return (
    <div className="max-w-xl lg:max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <HeroBadge />
      </motion.div>

      <motion.h1
        className="mt-5 text-3xl sm:text-4xl lg:text-5xl xl:text-[56px] font-bold text-white leading-tight"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {title}
        {highlightTitle && (
          <>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">
              {highlightTitle}
            </span>
          </>
        )}
      </motion.h1>

      <motion.p
        className="mt-5 text-sm sm:text-base lg:text-lg text-gray-300 leading-relaxed max-w-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {description}
      </motion.p>

      <motion.div
        className="mt-7 flex flex-col sm:flex-row items-start gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {buttons.map((button, i) => (
          <Link
            key={i}
            href={button.href}
            className={`inline-flex items-center justify-center gap-2 px-6 h-[44px] py-[16px] rounded-lg font-medium text-base transition-all duration-200 ${
              button.variant === "primary"
                ? "bg-[#003f71] hover:bg-[#004d8a] text-white shadow-lg shadow-blue-900/30"
                : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
            }`}
          >
            {button.text}
          </Link>
        ))}
      </motion.div>
    </div>
  );
}
