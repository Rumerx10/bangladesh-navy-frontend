"use client";

import { motion } from "framer-motion";

interface AboutHeroProps {
  title: string;
  description: string;
}

export default function AboutHero({ title, description }: AboutHeroProps) {
  return (
    <section className="relative mt-32 pt-32 pb-20 lg:pt-48 lg:pb-32 bg-pBlue overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-125 h-125 bg-blue-500 rounded-full blur-[120px] -mr-64 -mt-64" />
        <div className="absolute bottom-0 left-0 w-100 h-100 bg-cyan-500 rounded-full blur-[100px] -ml-48 -mb-48" />
      </div>

      <div className="relative container px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {title}
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {description}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
