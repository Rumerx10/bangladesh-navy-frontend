"use client";

import { surveyShips } from "@/src/data/aboutData";
import { motion } from "framer-motion";
import { Anchor, ArrowRight, Ship } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function SurveyShips() {
  return (
    <section className="py-8 lg:py-12">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {surveyShips.map((ship, i) => (
            <motion.div
              key={ship.id}
              className="rounded-2xl border border-gray-100 bg-white overflow-hidden hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="flex flex-col lg:flex-row">
                <div className="lg:w-1/3 aspect-video lg:aspect-auto relative bg-gradient-to-br from-[#001836] to-[#003f71] overflow-hidden">
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
                </div>
                <div className="flex-1 p-6 lg:p-8">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-[#003f71]/10 text-[#003f71] flex items-center justify-center shrink-0">
                      <Anchor size={18} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#001836]">
                        {ship.name}
                      </h3>
                      <p className="text-sm text-[#003f71] font-medium">
                        {ship.designation}
                      </p>
                    </div>
                    <span
                      className={`ml-auto px-3 py-1 rounded-full text-xs font-semibold ${
                        ship.status === "active"
                          ? "bg-green-50 text-green-600"
                          : ship.status === "under-maintenance"
                          ? "bg-amber-50 text-amber-600"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {ship.status === "active"
                        ? "Active"
                        : ship.status === "under-maintenance"
                        ? "Maintenance"
                        : "Retired"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    {ship.description}
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
                    {Object.entries(ship.specifications).map(([key, value]) => (
                      <div key={key} className="bg-gray-50 rounded-lg px-3 py-2">
                        <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
                          {key}
                        </p>
                        <p className="text-sm text-[#001836] font-medium mt-0.5">
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>
                  <Link
                    href={`/about/survey-ships/${ship.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#003f71] hover:text-[#001836] transition-colors group"
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
          ))}
        </div>
      </div>
    </section>
  );
}
