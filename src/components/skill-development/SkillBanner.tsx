"use client";

import { motion } from "framer-motion";
import { BookOpen, GraduationCap, Shield } from "lucide-react";

export default function SkillBanner() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-pBlue overflow-hidden">
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
            <GraduationCap size={16} />
            Professional Excellence
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            BN HYDROGRAPHIC INSTITUTE
          </h1>
          
          <div className="flex flex-wrap items-center justify-center gap-6">
            <div className="flex items-center gap-3 text-white/80">
              <Shield className="text-blue-400" size={24} />
              <span className="text-sm font-medium">IHO Certified</span>
            </div>
            <div className="flex items-center gap-3 text-white/80">
              <BookOpen className="text-blue-400" size={24} />
              <span className="text-sm font-medium">
                Industry Expert Instructors
              </span>
            </div>
          </div>
        </motion.div>
      </div>      
    </section>
  );
}
