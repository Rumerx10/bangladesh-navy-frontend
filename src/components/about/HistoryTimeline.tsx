"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Anchor,
  Compass,
  Cpu,
  Building2,
  Globe,
  ChevronRight,
  Calendar,
  MapPin,
  Users,
  Award,
  Ship,
  BookOpen,
  Sparkles,
} from "lucide-react";
import type { IHistoryEra, IHistoryMilestone } from "@/src/data/aboutData";

/* ─── icon helper ─── */
const eraIcons: Record<string, React.ReactNode> = {
  anchor: <Anchor size={22} />,
  compass: <Compass size={22} />,
  cpu: <Cpu size={22} />,
  building: <Building2 size={22} />,
  globe: <Globe size={22} />,
};

/* ─── gradient palette per era index ─── */
const eraGradients = [
  { from: "#0f4c81", to: "#1a6fb5", accent: "#2196F3" },
  { from: "#1b5e20", to: "#2e7d32", accent: "#4CAF50" },
  { from: "#4a148c", to: "#7b1fa2", accent: "#9C27B0" },
  { from: "#bf360c", to: "#e64a19", accent: "#FF5722" },
  { from: "#01579b", to: "#0288d1", accent: "#03A9F4" },
];

/* ─── key fact cards ─── */
interface KeyFact {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const keyFacts: KeyFact[] = [
  { icon: <Calendar size={20} />, label: "Established", value: "2001" },
  { icon: <MapPin size={20} />, label: "Location", value: "Chattogram" },
  { icon: <Ship size={20} />, label: "Parent Org", value: "Bangladesh Navy" },
  { icon: <Award size={20} />, label: "IHO Member Since", value: "2001" },
  { icon: <Users size={20} />, label: "Personnel", value: "300+" },
  { icon: <BookOpen size={20} />, label: "Charts Produced", value: "100+" },
];

/* ────────────────────────────────────────────────── */
/*  MAIN COMPONENT                                    */
/* ────────────────────────────────────────────────── */

interface HistoryTimelineProps {
  eras: IHistoryEra[];
  milestones: IHistoryMilestone[];
}

export default function HistoryTimeline({ eras, milestones }: HistoryTimelineProps) {
  const [activeEra, setActiveEra] = useState(0);

  return (
    <div className="history-page">
      {/* ── Intro Section ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="history-intro"
      >
        <div className="history-intro__badge">
          <Sparkles size={14} />
          <span>Our Legacy</span>
        </div>
        <h2 className="history-intro__title">
          From Liberation to <span>Global Leadership</span>
        </h2>
        <p className="history-intro__desc">
          The Bangladesh Navy Hydrographic &amp; Oceanographic Centre traces its
          roots to the 1971 Liberation War. Over five decades, it has grown from
          a small chart depot into a nationally recognized centre charting
          Bangladesh&apos;s maritime future.
        </p>
      </motion.div>

      {/* ── Key Facts Ribbon ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="history-facts"
      >
        {keyFacts.map((fact, i) => (
          <div className="history-facts__card" key={i}>
            <div className="history-facts__icon">{fact.icon}</div>
            <span className="history-facts__value">{fact.value}</span>
            <span className="history-facts__label">{fact.label}</span>
          </div>
        ))}
      </motion.div>

      {/* ── Era Navigation ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
        className="history-era-nav"
      >
        {eras.map((era, idx) => {
          const isActive = activeEra === idx;
          const gradient = eraGradients[idx % eraGradients.length];

          return (
            <button
              key={era.id}
              onClick={() => setActiveEra(idx)}
              className={`history-era-nav__btn ${isActive ? "active" : ""}`}
              style={
                isActive
                  ? ({
                      "--era-from": gradient.from,
                      "--era-to": gradient.to,
                    } as React.CSSProperties)
                  : undefined
              }
            >
              <span className="history-era-nav__icon">
                {eraIcons[era.icon] ?? <Anchor size={22} />}
              </span>
              <span className="history-era-nav__label">{era.era}</span>
              <span className="history-era-nav__years">{era.yearRange}</span>
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
          className="history-era-detail"
          style={
            {
              "--era-from": eraGradients[activeEra % eraGradients.length].from,
              "--era-to": eraGradients[activeEra % eraGradients.length].to,
              "--era-accent": eraGradients[activeEra % eraGradients.length].accent,
            } as React.CSSProperties
          }
        >
          {/* header strip */}
          <div className="history-era-detail__header">
            <div className="history-era-detail__icon-wrap">
              {eraIcons[eras[activeEra].icon] ?? <Anchor size={22} />}
            </div>
            <div>
              <p className="history-era-detail__years">
                {eras[activeEra].yearRange}
              </p>
              <h3 className="history-era-detail__title">
                {eras[activeEra].title}
              </h3>
            </div>
          </div>

          {/* summary */}
          <p className="history-era-detail__summary">
            {eras[activeEra].summary}
          </p>

          {/* detail points */}
          <ul className="history-era-detail__list">
            {eras[activeEra].details.map((d, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.08 * i }}
              >
                <ChevronRight size={16} className="history-era-detail__bullet" />
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
              className="history-era-detail__highlight"
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
        className="history-milestones"
      >
        <h3 className="history-milestones__heading">Key Milestones</h3>
        <div className="history-milestones__track">
          <div className="history-milestones__line" />
          {milestones.map((m, idx) => (
            <div
              key={idx}
              className={`history-milestones__item ${m.highlight ? "highlight" : ""}`}
            >
              <div className="history-milestones__dot" />
              <span className="history-milestones__year">{m.year}</span>
              <span className="history-milestones__event">{m.event}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
