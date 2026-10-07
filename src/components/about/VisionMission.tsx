"use client";

import { motion } from "framer-motion";
import { Eye, Target } from "lucide-react";
import SectionTitle from "@/src/components/SectionTitle";
import { useMissionVision } from "@/src/components/mission-vision/useMissionVision";

const VisionMissionSkeleton = () => (
  <div className="animate-pulse">
    <div className="mb-8 lg:mb-10 flex flex-col items-center">
      <div className="h-8 w-56 rounded bg-light-dark" />
      <div className="mt-3 h-4 w-80 max-w-full rounded bg-light-dark" />
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
      {Array.from({ length: 2 }).map((_, index) => (
        <div
          key={index}
          className="rounded-2xl border border-border bg-card p-6 lg:p-8"
        >
          <div className="mb-5 h-14 w-14 rounded-xl bg-light-dark" />
          <div className="mb-4 h-8 w-40 rounded bg-light-dark" />
          <div className="space-y-2">
            <div className="h-4 w-full rounded bg-light-dark" />
            <div className="h-4 w-11/12 rounded bg-light-dark" />
            <div className="h-4 w-3/4 rounded bg-light-dark" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

/**
 * Heading and the two cards come from the singleton `/mission-vision` record,
 * edited on Content Management → About Us → Vision & Mission. Until that record
 * exists the hook serves the copy this page shipped with, so the section is
 * never blank. Bangla is stored on the record but not rendered — the public
 * site has no language switch yet.
 */
const VisionMission = () => {
  const { missionVision, isLoading } = useMissionVision();

  const cards = [
    {
      key: "vision",
      icon: <Eye size={24} />,
      title: missionVision.visionTitleEn,
      description: missionVision.visionDescriptionEn,
    },
    {
      key: "mission",
      icon: <Target size={24} />,
      title: missionVision.missionTitleEn,
      description: missionVision.missionDescriptionEn,
    },
  ];

  return (
    <section className="py-8 lg:py-20">
      <div className="container px-4 sm:px-6 lg:px-8">
        {isLoading ? (
          <VisionMissionSkeleton />
        ) : (
          
            <div className="container grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
              {cards.map((card, i) => (
                <motion.div
                  key={card.key}
                  className="rounded-2xl border border-border bg-card p-6 lg:p-8 shadow-sm hover:shadow-md transition-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                >
                  <div className="w-14 h-14 rounded-xl bg-liteBlue/10 text-liteBlue flex items-center justify-center mb-5">
                    {card.icon}
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-pBlue mb-4">
                    {card.title}
                  </h2>
                  <p className="text-lg lg:text-xl text-foreground leading-relaxed">
                    {card.description}
                  </p>
                </motion.div>
              ))}
            </div>
          
        )}
      </div>
    </section>
  );
};

export default VisionMission;
