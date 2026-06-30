"use client";

import type { ISurveyShip } from "@/src/components/about/types";
import { motion } from "framer-motion";
import { Anchor, Info } from "lucide-react";
import Image from "next/image";

interface SurveyShipDetailProps {
  ship: ISurveyShip;
}

export default function SurveyShipDetail({ ship }: SurveyShipDetailProps) {
  return (
    <section className="mt-40">
      <div className="container pb-10">
        <motion.div
          className="relative w-full min-h-100 rounded-2xl overflow-hidden mb-8 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {ship.image ? (
            <Image
              src={ship.image}
              alt={ship.name}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full bg-linear-to-br from-[#001836] to-[#003f71] flex items-center justify-center">
              <Anchor size={80} className="text-white/10" />
            </div>
          )}
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-linear-to-t from-[#001836]/80 via-transparent to-transparent" />
          {/* Ship name overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-blue-200 text-xs font-semibold uppercase tracking-widest mb-1">
                  {ship.designation}
                </p>
                <h1 className="text-2xl lg:text-3xl font-bold text-white">
                  {ship.name}
                </h1>
              </div>
              <span
                className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold backdrop-blur-md ${
                  ship.status === "active"
                    ? "bg-green-500/20 text-green-300 border border-green-400/30"
                    : ship.status === "under-maintenance"
                    ? "bg-amber-500/20 text-amber-300 border border-amber-400/30"
                    : "bg-gray-500/20 text-gray-300 border border-gray-400/30"
                }`}
              >
                {ship.status === "active"
                  ? "● Active"
                  : ship.status === "under-maintenance"
                  ? "● Maintenance"
                  : "● Retired"}
              </span>
            </div>
          </div>
        </motion.div>

        {/* ── Quick Summary ── */}
        <motion.div
          className="rounded-xl bg-[#f7f9fc] border border-[#e8edf3] p-5 mb-8 flex items-start gap-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Info size={18} className="text-[#003f71] mt-0.5 shrink-0" />
          <p className="text-sm text-gray-600 leading-relaxed">
            {ship.description}
          </p>
        </motion.div>

        {/* ── Specifications Grid ── */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.15 }}
        >
          <h2 className="text-base font-bold text-[#001836] mb-4 uppercase tracking-wide">
            Specifications
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {Object.entries(ship.specifications).map(([key, value]) => (
              <div
                key={key}
                className="rounded-xl border border-gray-100 bg-white p-4 text-center hover:shadow-md hover:border-[#003f71]/15 transition-all duration-300 flex flex-col items-center justify-center"
              >
                <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mb-1.5">
                  {key}
                </p>
                <p className="text-sm lg:text-base text-[#001836] font-bold">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Detailed Content ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.2 }}
        >
          <h2 className="text-base font-bold text-[#001836] mb-4 uppercase tracking-wide">
            About {ship.name}
          </h2>
          <div className="space-y-4">
            {ship.details.map((paragraph, i) => (
              <p
                key={i}
                className="text-sm text-gray-600 leading-[1.8]"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
