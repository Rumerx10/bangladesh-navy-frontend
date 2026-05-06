"use client";

import NavyWatermark from "@/src/components/shared/NavyWatermark";
import { chiefMessage } from "@/src/data/homeData";
import { motion } from "framer-motion";
import { Award, GraduationCap, Quote, Ship } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ChiefMessage() {
  return (
    <section className="relative py-20 lg:py-32 bg-white overflow-hidden">
      {/* Dynamic Watermarks for visual depth */}
      <div className="absolute -right-24 top-20 text-[#001836] opacity-10">
        <NavyWatermark variant="anchor" size={450} opacity={0.3} animate="float" />
      </div>
      <div className="absolute -left-32 bottom-20 text-[#001836] opacity-10">
        <NavyWatermark variant="lighthouse" size={400} opacity={0.3} animate="drift" />
      </div>

      <div className="relative container px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
          
          {/* Left Column: Image & Badges */}
          <motion.div 
            className="w-full lg:w-[40%] sticky top-32"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="relative group">
              {/* Main Decorative Frame */}
              <div className="absolute -inset-4 border-2 border-[#001836]/10 rounded-2xl transform rotate-2 group-hover:rotate-0 transition-transform duration-500" />
              <div className="absolute -inset-4 border-2 border-[#003f71]/10 rounded-2xl transform -rotate-2 group-hover:rotate-0 transition-transform duration-500" />
              
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden shadow-2xl border-8 border-white">
                <Image
                  src="/CHIEF.png"
                  alt={chiefMessage.name}
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                
                {/* Bottom Overlay Info */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#001836] via-[#001836]/80 to-transparent p-6 text-white">
                  <h3 className="text-xl font-bold leading-tight">{chiefMessage.name}</h3>
                  <p className="text-sm text-blue-200 mt-1">{chiefMessage.designation}</p>
                </div>
              </div>

              {/* Floating BN Badge or Emblem decoration */}
              <div className="absolute -top-6 -right-6 w-20 h-20 bg-[#001836] rounded-full flex items-center justify-center border-4 border-white shadow-xl z-10">
                <Ship className="text-white w-10 h-10" />
              </div>
            </div>

            {/* Quick Highlights beneath photo */}
            <div className="grid grid-cols-2 gap-4 mt-10">
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex flex-col items-center text-center">
                <Award className="text-[#003f71] mb-2" size={24} />
                <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Award</span>
                <span className="text-xs font-bold text-[#001836]">NGP, Shuddachar Award</span>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex flex-col items-center text-center">
                <GraduationCap className="text-[#003f71] mb-2" size={24} />
                <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Education</span>
                <span className="text-xs font-bold text-[#001836]">MBA, MSc (Hydrography)</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Message Content */}
          <motion.div 
            className="w-full lg:w-[60%]"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            {/* Section Header */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-1 bg-[#003f71]" />
                <span className="text-sm font-bold text-[#003f71] uppercase tracking-widest">
                  Official Biography
                </span>
              </div>
              <h2 className="text-3xl lg:text-5xl font-bold text-[#001836] leading-tight mb-6">
                {chiefMessage.title}
              </h2>
              <Quote size={48} className="text-[#001836]/5 -mb-6 ml-[-10px]" />
            </div>

            {/* Biography Paragraphs */}
            <div className="space-y-6 relative z-10">
              {chiefMessage.content.map((para, i) => (
                <motion.p
                  key={i}
                  className="text-base lg:text-lg text-gray-600 leading-relaxed font-light"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                >
                  {/* Highlighting MIST link if present in text */}
                  {para.includes("Military Institute of Science and Technology (MIST)") ? (
                    <>
                      {para.split("Military Institute of Science and Technology (MIST)")[0]}
                      <Link 
                        href="https://mist.ac.bd/" 
                        target="_blank" 
                        className="text-[#003f71] font-semibold underline underline-offset-4 hover:text-blue-600 transition-colors"
                      >
                        Military Institute of Science and Technology (MIST)
                      </Link>
                      {para.split("Military Institute of Science and Technology (MIST)")[1]}
                    </>
                  ) : (
                    para
                  )}
                </motion.p>
              ))}
            </div>

            {/* Signature Area */}
            <div className="mt-12 pt-10 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <p className="text-xl font-bold text-[#001836]">{chiefMessage.name}</p>
                <p className="text-sm text-[#003f71] font-medium tracking-wide uppercase mt-1">
                  {chiefMessage.designation}
                </p>
              </div>
              
              {/* Decorative BN Mark */}
              <div className="hidden sm:block">
                <div className="w-16 h-16 rounded-full border-2 border-dashed border-[#001836]/20 flex items-center justify-center p-2">
                  <div className="w-full h-full rounded-full bg-[#001836]/5 flex items-center justify-center text-[#001836] font-bold text-lg">
                    BN
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
