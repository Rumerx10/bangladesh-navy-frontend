"use client";

import { chiefMessage } from "@/src/data/homeData";
import NavyWatermark from "@/src/components/shared/NavyWatermark";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export default function ChiefMessage() {
  return (
    <section className="relative py-16 lg:py-24 bg-gradient-to-b from-white to-[#f0f4f8] overflow-hidden">
      {/* Watermark */}
      <div className="absolute -right-16 -top-10 text-[#001836]">
        <NavyWatermark variant="anchor" size={350} opacity={0.025} />
      </div>
      <div className="absolute -left-20 bottom-0 text-[#001836]">
        <NavyWatermark variant="lighthouse" size={300} opacity={0.03} />
      </div>

      <div className="relative container px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Section title */}
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl lg:text-3xl font-bold text-[#001836]">
              {chiefMessage.title}
            </h2>
          </motion.div>

          <motion.div
            className="relative bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {/* Top decorative gradient bar */}
            <div className="h-1.5 bg-gradient-to-r from-[#001836] via-[#003f71] to-[#0069b4]" />

            <div className="px-6 sm:px-10 lg:px-14 py-10 lg:py-14">
              {/* Profile — centered on top */}
              <div className="flex flex-col items-center mb-8">
                <div className="relative">
                  <div className="w-28 h-28 lg:w-32 lg:h-32 rounded-full bg-gradient-to-br from-[#001836] to-[#003f71] flex items-center justify-center text-white text-3xl lg:text-4xl font-bold ring-4 ring-white shadow-xl">
                    {chiefMessage.initials}
                  </div>
                  {/* Decorative ring */}
                  <div className="absolute -inset-2 rounded-full border-2 border-dashed border-[#003f71]/20 animate-[spin_30s_linear_infinite]" />
                </div>
                <div className="text-center mt-5">
                  <p className="text-lg font-bold text-[#001836]">
                    {chiefMessage.name}
                  </p>
                  <p className="text-sm text-[#003f71] font-medium mt-0.5">
                    {chiefMessage.designation}
                  </p>
                </div>
              </div>

              {/* Quote icon */}
              <div className="flex justify-center mb-6">
                <Quote size={32} className="text-[#003f71]/15 rotate-180" />
              </div>

              {/* Message content */}
              <div className="space-y-5 max-w-2xl mx-auto">
                {chiefMessage.content.map((para, i) => (
                  <motion.p
                    key={i}
                    className="text-sm lg:text-base text-gray-600 leading-relaxed text-center"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                  >
                    {para}
                  </motion.p>
                ))}
              </div>

              {/* Bottom quote */}
              <div className="flex justify-center mt-6">
                <Quote size={32} className="text-[#003f71]/15" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
