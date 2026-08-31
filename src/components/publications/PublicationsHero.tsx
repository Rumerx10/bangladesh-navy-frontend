"use client";

import { motion } from "framer-motion";
import { BookOpen, FileText, Library } from "lucide-react";

/** Mirrors the sibling Notices to Mariners hero (src/components/notices/NoticesHero.tsx). */
const PublicationsHero = () => {
  return (
    <section className="relative pt-44 pb-10 lg:pt-48 lg:pb-32 bg-pBlue overflow-hidden">
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-blue-200 text-xs font-bold uppercase tracking-widest mb-6">
            <Library size={16} />
            Hydrographic Publications
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Official <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-300">
              Publications
            </span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Sailing directions, tide tables, lists of lights and other
            reference publications issued by the Bangladesh Navy Hydrographic
            &amp; Oceanographic Centre.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-8">
            <div className="flex items-center gap-3 text-white/80">
              <BookOpen className="text-blue-400" size={20} />
              <span className="text-sm font-medium">Reference Publications</span>
            </div>
            <div className="flex items-center gap-3 text-white/80">
              <FileText className="text-blue-400" size={20} />
              <span className="text-sm font-medium">Chart Corrections</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PublicationsHero;
