"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { Anchor, ChevronDown, Radar, Ship } from "lucide-react";
import { SurveyShipItem } from "@/src/types/global/global.types";

const EQUIPMENT_LIMIT = 4;
const DESCRIPTION_LIMIT = 320;

const ShipCard = ({ ship, index }: { ship: SurveyShipItem; index: number }) => {
  const [expanded, setExpanded] = useState(false);

  const equipmentList = Array.isArray(ship.surveyEquipment)
    ? ship.surveyEquipment
    : [];

  const description = ship.descriptionEn ?? "";
  const hasMore =
    equipmentList.length > EQUIPMENT_LIMIT ||
    description.length > DESCRIPTION_LIMIT;

  const visibleEquipment =
    expanded || equipmentList.length <= EQUIPMENT_LIMIT
      ? equipmentList
      : equipmentList.slice(0, EQUIPMENT_LIMIT);

  const hiddenEquipmentCount = equipmentList.length - visibleEquipment.length;

  return (
    <motion.div
      className="rounded-2xl border border-gray-100 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="flex flex-col lg:flex-row lg:items-center">
        {/* Image — fixed aspect ratio so it never stretches with the content */}
        <div className="w-full lg:w-1/3 shrink-0 p-4 lg:p-5">
          <div className="relative aspect-4/3 w-full rounded-xl overflow-hidden border">
            {ship.image ? (
              <Image
                src={ship.image}
                alt={ship.nameEn}
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-fit"
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
        </div>

        {/* Right section */}
        <div className="flex-1 min-w-0 p-6 pt-2 lg:p-8 lg:pl-3 flex flex-col gap-4">
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
                {ship.surveyCategory?.nameEn}
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1">
            <p
              className={`text-sm text-gray-500 leading-relaxed text-justify ${
                expanded ? "" : "line-clamp-4"
              }`}
            >
              {description}
            </p>
            {hasMore && (
              <button
                type="button"
                onClick={() => setExpanded((prev) => !prev)}
                className="inline-flex items-center gap-1 text-xs font-semibold text-liteBlue hover:text-pBlue transition-colors cursor-pointer"
              >
                {expanded ? "See less" : "See more"}
                <ChevronDown
                  size={14}
                  className={`transition-transform ${
                    expanded ? "rotate-180" : ""
                  }`}
                />
              </button>
            )}
          </div>

          {/* Two cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-stretch">
            {/* Vessel Specifications */}
            <div className="flex flex-col rounded-xl overflow-hidden border border-liteBlue/12 bg-[#f7f9fc]">
              <div className="flex items-center gap-2 px-4 py-2.5 bg-liteBlue">
                <Ship size={13} className="text-white/70 shrink-0" />
                <span className="text-base font-medium text-white uppercase tracking-widest">
                  Basic Information
                </span>
              </div>
              <div className="flex-1 p-4 grid grid-cols-2 gap-x-4 gap-y-3 content-start">
                {[
                  { label: "Length", value: ship.length },
                  { label: "Beam", value: ship.beam },
                  { label: "Draft", value: ship.draft },
                  { label: "Displacement", value: ship.crew },
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
            <div className="flex flex-col rounded-xl overflow-hidden border border-cyan-200/50 bg-[#f0f8ff]/60">
              <div className="flex items-center gap-2 px-4 py-2.5 bg-pBlue">
                <Radar size={13} className="text-cyan-400/80 shrink-0" />
                <span className="text-base font-medium text-white uppercase tracking-widest">
                  Survey Capabilities
                </span>
              </div>
              <div className="flex-1 p-4 flex flex-col gap-2.5">
                {visibleEquipment.length > 0 ? (
                  visibleEquipment.map((eq) => (
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
                {hiddenEquipmentCount > 0 && (
                  <button
                    type="button"
                    onClick={() => setExpanded(true)}
                    className="self-start text-xs font-semibold text-liteBlue hover:text-pBlue transition-colors cursor-pointer"
                  >
                    +{hiddenEquipmentCount} more
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ShipCard;
