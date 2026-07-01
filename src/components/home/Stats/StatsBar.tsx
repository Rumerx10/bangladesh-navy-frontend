"use client";

import { statsItems } from "@/src/data/homeData";
import NavyWatermark from "@/src/components/shared/NavyWatermark";
import StatItem from "./StatItem";


export default function StatsBar() {
  return (
    <section className="relative bg-pBlue py-10 lg:py-56 overflow-hidden">
      {/* Watermark */}
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-white">
        <NavyWatermark variant="ship" size={500} opacity={0.04} animate="pulse" />
      </div>

      <div className="relative container px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {statsItems.map((stat) => (
            <StatItem key={stat.id} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
