"use client";

import { useGet } from "@/src/hooks/useGet";
import { motion } from "framer-motion";
import { Anchor, Radar, Ship } from "lucide-react";
import Image from "next/image";

interface SurveyShipItem {
  id: string;
  nameEn: string;
  nameBn: string;
  descriptionEn: string;
  length: string;
  beam: string;
  draft: string;
  crew: string;
  surveyEquipment: string;
  image: string;
  status: "ACTIVE" | "INACTIVE";
  surveyCategory: {
    id: string;
    nameEn: string;
    nameBn: string;
  };
}

export default function SurveyShips() {
  const { data, isLoading } = useGet<SurveyShipItem[]>("/survey-ships/list", [
    "survey-ships-list",
  ]);

  const ships: SurveyShipItem[] = Array.isArray(data?.data) ? data.data : [];

  if (isLoading) {
    return (
      <section className="py-8 lg:py-20">
        <div className="container px-4 sm:px-6 lg:px-8 space-y-6">
          {Array.from({ length: 2 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-gray-100 bg-white h-64 animate-pulse"
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 lg:py-20">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {ships.map((ship, i) => {
            const equipmentList = ship.surveyEquipment
              ? ship.surveyEquipment.split(",").map((e) => e.trim()).filter(Boolean)
              : [];

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
                  {/* Image */}
                  <div className="lg:w-1/3 aspect-video lg:aspect-auto relative bg-linear-to-br from-pBlue to-liteBlue overflow-hidden">
                    {ship.image ? (
                      <Image
                        src={ship.image}
                        alt={ship.nameEn}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full p-8">
                        <Ship size={80} className="text-white/20" />
                      </div>
                    )}
                    <span
                      className={`absolute top-3 right-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md ${
                        ship.status === "ACTIVE"
                          ? "bg-green-500 text-white border border-green-400/30"
                          : "bg-gray-500/20 text-gray-300 border border-gray-400/30"
                      }`}
                    >
                      {ship.status === "ACTIVE" ? "● Active" : "● Inactive"}
                    </span>
                  </div>

                  {/* Right section */}
                  <div className="flex-1 p-6 lg:p-8 flex flex-col gap-4">
                    {/* Header */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-liteBlue/10 text-liteBlue flex items-center justify-center shrink-0">
                        <Anchor size={18} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-pBlue leading-tight">
                          {ship.nameEn}
                        </h3>
                        <p className="text-sm text-liteBlue font-medium">
                          {ship.surveyCategory.nameEn}
                        </p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {ship.descriptionEn}
                    </p>

                    {/* Two cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Vessel Specifications */}
                      <div className="rounded-xl overflow-hidden border border-liteBlue/12">
                        <div className="flex items-center gap-2 px-4 py-2.5 bg-liteBlue">
                          <Ship size={13} className="text-white/70 shrink-0" />
                          <span className="text-base font-medium text-white uppercase tracking-widest">
                            Basic Information
                          </span>
                        </div>
                        <div className="bg-[#f7f9fc] p-4 grid grid-cols-2 gap-x-4 gap-y-3">
                          {[
                            { label: "Length", value: ship.length },
                            { label: "Beam", value: ship.beam },
                            { label: "Draft", value: ship.draft },
                            { label: "Crew", value: ship.crew },
                          ].map(({ label, value }) => (
                            <div key={label}>
                              <p className="text-xs font-medium uppercase tracking-wider text-gray-400 mb-0.5">
                                {label}
                              </p>
                              <p className="text-base font-bold text-pBlue">
                                {value || "—"}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Survey Equipment */}
                      <div className="rounded-xl overflow-hidden border border-cyan-200/50 bg-[#f0f8ff]/60">
                        <div className="flex items-center gap-2 px-4 py-2.5 bg-pBlue">
                          <Radar size={13} className="text-cyan-400/80 shrink-0" />
                          <span className="text-base font-medium text-white uppercase tracking-widest">
                            Capabilities
                          </span>
                        </div>
                        <div className="p-4 flex flex-col gap-2.5">
                          {equipmentList.length > 0 ? (
                            equipmentList.map((eq) => (
                              <div key={eq} className="flex items-start gap-2.5">
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-liteBlue shrink-0" />
                                <span className="text-base text-pBlue font-medium leading-snug">
                                  {eq}
                                </span>
                              </div>
                            ))
                          ) : (
                            <p className="text-sm text-gray-400">—</p>
                          )}
                        </div>
                      </div>
                    </div>
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
