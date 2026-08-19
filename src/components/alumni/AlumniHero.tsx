"use client";

import { motion } from "framer-motion";
import { Anchor, CalendarRange, GraduationCap, Users } from "lucide-react";

interface AlumniHeroProps {
  totalBatches: number;
  totalAlumni: number;
  /** "1997 – 2026", or null while the list is still loading. */
  yearsSpan: string | null;
}

const STATS = [
  { key: "batches", label: "Courses Conducted", icon: GraduationCap },
  { key: "alumni", label: "Alumni Trained", icon: Users },
  { key: "years", label: "Years of Training", icon: CalendarRange },
] as const;

/** Mirrors the notices hero (src/components/notices/NoticesHero.tsx). */
const AlumniHero = ({
  totalBatches,
  totalAlumni,
  yearsSpan,
}: AlumniHeroProps) => {
  const values: Record<(typeof STATS)[number]["key"], string> = {
    batches: totalBatches ? String(totalBatches) : "—",
    alumni: totalAlumni ? String(totalAlumni) : "—",
    years: yearsSpan ?? "—",
  };

  return (
    <section className="relative pt-44 pb-14 lg:pt-48 lg:pb-24 bg-pBlue overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-125 h-125 bg-blue-500 rounded-full blur-[120px] -mr-64 -mt-64" />
        <div className="absolute bottom-0 left-0 w-100 h-100 bg-cyan-500 rounded-full blur-[100px] -ml-48 -mb-48" />
      </div>

      <div className="relative container px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-blue-200 text-xs font-bold uppercase tracking-widest mb-6">
            <Anchor size={16} />
            BN Hydrographic Institute
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Course <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-300">
              Alumni
            </span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Every officer trained at the Bangladesh Navy Hydrographic &amp;
            Oceanographic Centre since 1997 — listed batch by batch, with rank,
            personal number and parent organization.
          </p>

          {/* Stat tiles */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {STATS.map(({ key, label, icon: Icon }, index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 + index * 0.08 }}
                className="rounded-xl border border-white/15 bg-white/5 px-5 py-4 backdrop-blur-sm"
              >
                <Icon className="mx-auto h-5 w-5 text-blue-300" />
                <p className="mt-2 text-2xl font-bold text-white tabular-nums">
                  {values[key]}
                </p>
                <p className="mt-0.5 text-xs font-medium uppercase tracking-wide text-blue-200/80">
                  {label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AlumniHero;
