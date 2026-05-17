"use client";

import { motion } from "framer-motion";

interface AboutHeroProps {
  title: string;
  description: string;
}

export default function AboutHero({ title, description }: AboutHeroProps) {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-[#001836] overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500 rounded-full blur-[120px] -mr-64 -mt-64" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-500 rounded-full blur-[100px] -ml-48 -mb-48" />
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

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-white overflow-hidden">
        <svg
          viewBox="0 0 1440 120"
          className="absolute bottom-0 w-full h-full text-white fill-current"
          preserveAspectRatio="none"
        >
          <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
        </svg>
      </div>
    </section>
  );
}
