"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Anchor, ChevronRight, Sparkles } from "lucide-react";
import type { IHistoryEra, IHistoryMilestone } from "@/src/data/aboutData";
import { eraIcons, keyFacts } from "@/src/data/historyHelpers";

interface HistoryTimelineProps {
  eras: IHistoryEra[];
  milestones: IHistoryMilestone[];
}

export default function HistoryTimeline({ eras, milestones }: HistoryTimelineProps) {
  const [activeEra, setActiveEra] = useState(0);

  return (
    <div className="flex flex-col gap-10">
      {/* ── Intro Section ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-[740px] mx-auto"
      >
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[var(--primary,#003f71)] text-white text-xs font-semibold uppercase tracking-wider mb-4">
          <Sparkles size={14} />
          <span>Our Legacy</span>
        </div>
        <h2 className="text-[clamp(1.6rem,3.2vw,2.25rem)] font-extrabold text-[#001836] leading-tight mb-3">
          From Liberation to{" "}
          <span className="text-[var(--primary,#003f71)]">Global Leadership</span>
        </h2>
        <p className="text-[0.95rem] text-[#5a6a7a] leading-relaxed max-w-[620px] mx-auto">
          The Bangladesh Navy Hydrographic &amp; Oceanographic Centre traces its
          roots to the 1971 Liberation War. Over five decades, it has grown from
          a small chart depot into a nationally recognized centre charting
          Bangladesh&apos;s maritime future.
        </p>
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
              className={`flex-none flex flex-col items-center gap-1 py-3.5 px-5 rounded-[14px] border-[1.5px] cursor-pointer transition-all duration-300 min-w-[120px] sm:min-w-40 ${
                isActive
                  ? "bg-[var(--primary,#003f71)] border-transparent text-white shadow-[0_6px_24px_rgba(0,63,113,0.25)] -translate-y-0.5"
                  : "bg-white border-[#e0e6ed] hover:border-[var(--primary,#003f71)] hover:bg-[#f0f4f8]"
              }`}
            >
              <span
                className={`flex items-center justify-center w-[38px] h-[38px] rounded-[10px] transition-all duration-300  ${
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-[rgba(0,63,113,0.08)] text-[var(--primary,#003f71)]"
                }`}
              >
                {eraIcons[era.icon] ?? <Anchor size={22} />}
              </span>
              <span
                className={`text-[0.82rem] font-bold transition-colors duration-300 ${
                  isActive ? "text-white" : "text-[#001836]"
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
      <AnimatePresence mode="wait">
        <motion.div
          key={activeEra}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.4 }}
          className="rounded-[20px] bg-white border border-[#e8edf3] overflow-hidden shadow-[0_4px_32px_rgba(0,24,54,0.06)]"
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
          <ul className="list-none px-5 md:px-8 pt-5 m-0 flex flex-col gap-3">
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
                  className="shrink-0 mt-[3px] text-[var(--primary,#003f71)]"
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
      </AnimatePresence>

      {/* ── Milestones Ribbon ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="pt-2"
      >
        <h3 className="text-lg font-extrabold text-[#001836] mb-6 text-center">
          Key Milestones
        </h3>
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
                className={`w-2.5 h-2.5 rounded-full absolute -top-[5px] left-5 border-2 border-white ${
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
