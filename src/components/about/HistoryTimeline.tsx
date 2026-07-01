"use client";

import type { IHistoryEra, IHistoryMilestone } from "@/src/data/aboutData";
import { eraIcons } from "@/src/data/historyHelpers";
import { AnimatePresence, motion } from "framer-motion";
import { Anchor, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import SectionTitle from "../SectionTitle";

const historyNarrative: string[] = [
  "To ensure the safe and efficient utilization of maritime routes and resources, the Government of Bangladesh established the Bangladesh Navy Hydrographic Department (BNHD) on May 12, 1983. BNHD was tasked with surveying the nation's coastal and marine areas, producing nautical charts, and providing other navigational aids for safe navigation, benefiting both domestic and foreign vessels.",
  "The department began its operations under the name \"BN Chart Depot\" on November 4, 1983, by collecting charts and navigational items from Bhatiary Ship Breaking Yards. BNHD started nautical charting journey with a historic chart titled 'St. Martin Island to Teknaf'. It was an ammonia-printed chart, published with manually collected survey data.",
  "With the assistance of the French government through the Hydro Bangla Projects (1 & 2), the department stepped into digital survey era. Recognizing the need for better coordination in surveying activities, data management, and chart production, BN Hydrographic and Oceanographic Center (BNHOC) was officially established on March 15, 2001, at the BN Chart Depot.",
  "BNHOC rapidly advanced the production of navigational charts and tide tables, processing hydrographic data from survey ships. In 2001, Bangladesh joined the International Hydrographic Organization as its 70th member, reflecting its adherence to international survey standards. BNHOC has played a significant role in maritime delimitation with India and Myanmar. Its contributions to maritime stake holders are noteworthy. Publications such as the BN Tide Table, BN Chart Catalog, and Notice to Mariners have been instrumental in ensuring safe navigation within Bangladesh sea waters.",
  "BNHOC has published 55 paper charts and 17 electronic navigational charts covering Bangladesh sea areas at Bay of Bengal. These include 09 international series paper charts and 11 international series electronic navigational charts. Those charts not only enhance the country's global reputation but also generate foreign exchange through international sales. Additionally, BNHOC supports Bangladesh Navy by publishing daily marine weather forecasts and reviewing Hydrographic, Oceanographic, and Meteorological data collected by BN ships. These efforts have significantly contributed to the growth of the blue economy.",
  "Over the past two decades, BNHOC has made remarkable progress in maritime boundary demarcation, safe navigation, and sustainable marine resource use. The organization remains committed to its mission of \"Ensuring Safe & Efficient Navigation for Sustainable Bangladesh,\" aligning with the nation's goals for a secure and sustainable maritime environment.",
];

interface HistoryTimelineProps {
  eras: IHistoryEra[];
  milestones: IHistoryMilestone[];
}

export default function HistoryTimeline({
  eras,
  milestones,
}: HistoryTimelineProps) {
  const [activeEra, setActiveEra] = useState(0);

  return (
    <div className="flex flex-col gap-10">
      {/* ── History Narrative ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container px-4 mx-auto"
      >
        <div className="text-[1.05rem] md:text-[1.15rem] text-[#3a4858] leading-[1.9] text-justify">
          <div className="float-left mr-7 mb-4 w-60 md:w-90 shrink-0">
            <Image
              src="/shipImages/bns-darshak.png"
              alt="BNS Darshak – Bangladesh Navy Hydrographic Survey Ship"
              width={360}
              height={240}
              className="rounded-xl object-cover w-full shadow-md"
            />
          </div>
          {historyNarrative.map((para, i) => (
            <p key={i} className="mb-5 last:mb-0">{para}</p>
          ))}
          <div className="clear-both" />
        </div>
      </motion.div>

      {/* ── Era Navigation (centered) ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
        className="flex justify-center flex-wrap gap-2.5 pb-1 mt-10"
      >
        {eras.map((era, idx) => {
          const isActive = activeEra === idx;

          return (
            <button
              key={era.id}
              onClick={() => setActiveEra(idx)}
              className={`flex-none flex flex-col items-center gap-1 py-3.5 px-5 rounded-[14px] border-[1.5px] cursor-pointer transition-all duration-300 min-w-30 sm:min-w-40 ${
                isActive
                  ? "bg-[var(--primary,#003f71)] border-transparent text-white shadow-[0_6px_24px_rgba(0,63,113,0.25)] -translate-y-0.5"
                  : "bg-white border-[#e0e6ed] hover:border-[var(--primary,#003f71)] hover:bg-[#f0f4f8]"
              }`}
            >
              <span
                className={`flex items-center justify-center w-9.5 h-9.5 rounded-[10px] transition-all duration-300  ${
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-[rgba(0,63,113,0.08)] text-[var(--primary,#003f71)]"
                }`}
              >
                {eraIcons[era.icon] ?? <Anchor size={22} />}
              </span>
              <span
                className={`text-[0.82rem] font-bold transition-colors duration-300 ${
                  isActive ? "text-white" : "text-pBlue"
                }`}
              >
                {era.era}
              </span>
              <span
                className={`text-[0.68rem] font-medium transition-colors duration-300 ${
                  isActive ? "text-white/75" : "text-[#8494a7]"
                }`}
              >
                {era.yearRange}
              </span>
            </button>
          );
        })}
      </motion.div>

      {/* ── Active Era Detail ── */}

        <motion.div
          key={activeEra}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.4 }}
          className="rounded-lg bg-white border border-[#e8edf3] overflow-hidden shadow-[0_4px_32px_rgba(0,24,54,0.06)]"
        >
          {/* header strip */}
          <div className="flex items-center gap-4 px-5 py-5 md:px-8 md:py-6 bg-[var(--primary,#003f71)] text-white">
            <div className="w-12 h-12 rounded-xl bg-white/18 flex items-center justify-center shrink-0">
              {eraIcons[eras[activeEra].icon] ?? <Anchor size={22} />}
            </div>
            <div>
              <p className="text-[0.72rem] font-semibold uppercase tracking-wider opacity-80 mb-0.5">
                {eras[activeEra].yearRange}
              </p>
              <h3 className="text-lg md:text-xl font-extrabold leading-tight">
                {eras[activeEra].title}
              </h3>
            </div>
          </div>

          {/* summary */}
          <p className="px-5 md:px-8 pt-6 text-[0.92rem] text-[#4a5568] leading-relaxed">
            {eras[activeEra].summary}
          </p>

          {/* detail points */}
          <ul className="pb-6 list-none px-5 md:px-8 pt-5 m-0 flex flex-col gap-3">
            {eras[activeEra].details.map((d, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.08 * i }}
                className="flex items-start gap-2 text-sm text-[#374151] leading-relaxed"
              >
                <ChevronRight
                  size={16}
                  className="shrink-0 mt-0.75 text-(--primary,#003f71)"
                />
                <span>{d}</span>
              </motion.li>
            ))}
          </ul>

          {/* highlight quote */}
          {eras[activeEra].highlight && (
            <motion.blockquote
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="mx-5 md:mx-8 mt-5 mb-7 px-5 py-4 rounded-xl bg-[rgba(0,63,113,0.05)] border-l-4 border-[var(--primary,#003f71)] text-[0.85rem] italic text-[#1a3a5c] leading-relaxed"
            >
              {eras[activeEra].highlight}
            </motion.blockquote>
          )}
        </motion.div>
 

      {/* ── Milestones Ribbon ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="pt-2"
      >
        <SectionTitle title="Key Milestones" />
        <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-x-4 gap-y-5 pt-5">
          {milestones.map((m, idx) => (
            <div
              key={idx}
              className={`relative flex flex-col gap-1 p-4 px-5 rounded-xl border transition-all duration-300 hover:bg-white hover:shadow-[0_4px_16px_rgba(0,63,113,0.07)] hover:-translate-y-0.5 ${
                m.highlight
                  ? "border-[var(--primary,#003f71)] bg-[rgba(0,63,113,0.04)]"
                  : "bg-[#f7f9fc] border-[#e8edf3]"
              }`}
            >
              {/* dot */}
              <div
                className={`w-2.5 h-2.5 rounded-full absolute -top-1.25 left-5 border-2 border-white ${
                  m.highlight
                    ? "bg-[var(--primary,#003f71)] shadow-[0_0_0_3px_rgba(0,63,113,0.2)]"
                    : "bg-[#c4d0dc] shadow-[0_0_0_2px_#e8edf3]"
                }`}
              />
              <span className="text-[0.7rem] font-bold text-[var(--primary,#003f71)] uppercase tracking-wider">
                {m.year}
              </span>
              <span className="text-[0.8rem] text-[#4a5568] leading-normal">
                {m.event}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
