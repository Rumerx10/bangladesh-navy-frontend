"use client";

import { motion } from "framer-motion";
import { Anchor, FileText, MapPin } from "lucide-react";

const HydrographicHero = () => {
  return (
    <section className="relative overflow-hidden bg-pBlue pt-32 pb-20 lg:pt-48 lg:pb-32">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 h-125 w-125 -mr-64 -mt-64 rounded-full bg-blue-500 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-100 w-100 -mb-48 -ml-48 rounded-full bg-cyan-500 blur-[100px]" />
      </div>

      <div className="container relative px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-blue-200">
            <FileText size={16} />
            Hydrographic Note
          </div>

          <h1 className="mb-6 text-4xl font-bold leading-tight text-white lg:text-6xl">
            Submit a Hydrographic Note
            <br />
            <span className="bg-linear-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Help Us Chart Safely
            </span>
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-gray-300">
            Report navigational hazards, depth anomalies, or other hydrographic
            observations to the Bangladesh Navy Hydrographic &amp; Oceanographic
            Center.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-8">
            <div className="flex items-center gap-3 text-white/80">
              <Anchor className="text-blue-400" size={20} />
              <span className="text-sm font-medium">Maritime Safety</span>
            </div>
            <div className="flex items-center gap-3 text-white/80">
              <MapPin className="text-blue-400" size={20} />
              <span className="text-sm font-medium">Positional Accuracy</span>
            </div>
            <div className="flex items-center gap-3 text-white/80">
              <FileText className="text-blue-400" size={20} />
              <span className="text-sm font-medium">Official Record</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HydrographicHero;
