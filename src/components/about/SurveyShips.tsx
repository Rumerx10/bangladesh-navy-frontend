"use client";

import { surveyShips } from "@/src/data/aboutData";
import { motion } from "framer-motion";
import { Anchor, ArrowRight, Radar, Ship } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function SurveyShips() {
  return (
    <section className="py-8 lg:py-20">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {surveyShips.map((ship, i) => {
            const basicSpecs = Object.entries(ship.specifications).filter(
              ([k]) => k !== "Survey Equipment"
            );
            const surveyEquipment =
              ship.specifications["Survey Equipment"]?.split(", ") ?? [];

            return (
              <motion.div
                key={ship.id}
                className="rounded-2xl border border-gray-100 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="flex flex-col lg:flex-row">
                  {/* ── Image ── */}
                  <div className="lg:w-1/3 aspect-video lg:aspect-auto relative bg-linear-to-br from-pBlue to-liteBlue overflow-hidden">
                    {ship.image ? (
                      <Image
                        src={ship.image}
                        alt={ship.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full p-8">
                        <Ship size={80} className="text-white/20" />
                      </div>
                    )}
                    {/* status pill over image */}
                    <span
                      className={`absolute top-3 right-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md ${
                        ship.status === "active"
                          ? "bg-green-500 text-white border border-green-400/30"
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

                  {/* ── Right section ── */}
                  <div className="flex-1 p-6 lg:p-8 flex flex-col gap-4">
                    {/* Header */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-liteBlue/10 text-liteBlue flex items-center justify-center shrink-0">
                        <Anchor size={18} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-pBlue leading-tight">
                          {ship.name}
                        </h3>
                        <p className="text-sm text-liteBlue font-medium">
                          {ship.designation}
                        </p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {ship.description}
                    </p>

                    {/* ── Two Cards ── */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Card 1 — Vessel Specifications */}
                      <div className="rounded-xl overflow-hidden border border-liteBlue/12">
                        <div className="flex items-center gap-2 px-4 py-2.5 bg-liteBlue">
                          <Ship size={13} className="text-white/70 shrink-0" />
                          <span className="text-base font-medium text-white uppercase tracking-widest">
                            Basic Information
                          </span>
                        </div>
                        <div className="bg-[#f7f9fc] p-4 grid grid-cols-2 gap-x-4 gap-y-3">
                          {basicSpecs.map(([key, value]) => (
                            <div key={key}>
                              <p className="text-xs font-medium uppercase tracking-wider text-gray-400 mb-0.5">
                                {key}
                              </p>
                              <p className="text-base font-bold text-pBlue">
                                {value}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Card 2 — Survey Equipment */}
                      <div className="rounded-xl overflow-hidden border border-cyan-200/50 bg-[#f0f8ff]/60">
                        <div className="flex items-center gap-2 px-4 py-2.5 bg-pBlue">
                          <Radar
                            size={13}
                            className="text-cyan-400/80 shrink-0"
                          />
                          <span className="text-base font-medium text-white uppercase tracking-widest">
                            Survey Equipment
                          </span>
                        </div>
                        <div className="p-4 flex flex-col gap-2.5">
                          {surveyEquipment.map((eq) => (
                            <div key={eq} className="flex items-start gap-2.5">
                              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-liteBlue shrink-0" />
                              <span className="text-base text-pBlue font-medium leading-snug">
                                {eq}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Link */}
                    <Link
                      href={`/about/survey-ships/${ship.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-liteBlue hover:text-pBlue transition-colors group w-fit"
                    >
                      Read Details
                      <ArrowRight
                        size={16}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
