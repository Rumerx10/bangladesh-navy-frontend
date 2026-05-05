"use client";

import { quickAccessItems } from "@/src/data/homeData";
import NavyWatermark from "@/src/components/shared/NavyWatermark";
import { motion } from "framer-motion";
import QuickAccessCard from "./QuickAccessCard";

export default function QuickAccess() {
  return (
    <section className="relative py-16 lg:py-25 bg-gray-50 overflow-hidden">
      {/* Watermark */}
      <div className="absolute -right-10 top-1/2 -translate-y-1/2 text-[#001836]">
        <NavyWatermark variant="helm" size={400} opacity={0.025} animate="rotate" />
      </div>
      <div className="absolute -left-20 -bottom-10 text-[#001836]">
        <NavyWatermark variant="waves" size={300} opacity={0.03} animate="bob" />
      </div>

      <div className="relative container px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-8 lg:mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl lg:text-3xl font-bold text-[#001836]">
            Quick Access
          </h2>
          <p className="mt-2 text-sm lg:text-base text-gray-500">
            Access our most popular products and services with a single click
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {quickAccessItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <QuickAccessCard item={item} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
