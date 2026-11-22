"use client";

import { motion } from "framer-motion";
import { Compass, Eye } from "lucide-react";
import {
  LighthouseScene,
  SurveyShipScene,
} from "@/src/components/about/VisionMissionScenes";
import { useMissionVision } from "@/src/components/mission-vision/useMissionVision";
import Container from "@/src/components/shared/Container";

const VisionMissionSkeleton = () => (
  <div className="mx-auto grid max-w-6xl animate-pulse gap-6 md:grid-cols-2 lg:gap-8">
    {Array.from({ length: 2 }).map((_, index) => (
      <div
        key={index}
        className="overflow-hidden rounded-2xl bg-card ring-1 ring-border"
      >
        <div className="aspect-5/3 bg-light-dark" />
        <div className="space-y-3 p-6 lg:p-8">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-light-dark" />
            <div className="h-6 w-36 rounded bg-light-dark" />
          </div>
          <div className="h-4 w-full rounded bg-light-dark" />
          <div className="h-4 w-11/12 rounded bg-light-dark" />
          <div className="h-4 w-2/3 rounded bg-light-dark" />
        </div>
      </div>
    ))}
  </div>
);

const VisionMission = () => {
  const { missionVision, isLoading } = useMissionVision();

  const items = [
    {
      key: "vision",
      tag: "Where we are heading",
      icon: Eye,
      Scene: LighthouseScene,
      title: missionVision.visionTitleEn,
      description: missionVision.visionDescriptionEn,
    },
    {
      key: "mission",
      tag: "What we do every day",
      icon: Compass,
      Scene: SurveyShipScene,
      title: missionVision.missionTitleEn,
      description: missionVision.missionDescriptionEn,
    },
  ];

  return (
    <section className="py-14 lg:py-24">
      <Container>
        {isLoading ? (
          <VisionMissionSkeleton />
        ) : (
          <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:gap-8">
            {items.map(
              ({ key, tag, icon: Icon, Scene, title, description }, i) => (
                <motion.article
                  key={key}
                  className="flex flex-col overflow-hidden rounded-2xl bg-card shadow-[0_24px_48px_-28px_rgb(0_24_54/0.45)] ring-1 ring-border transition-[translate,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_32px_56px_-28px_rgb(0_24_54/0.55)]"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.15,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <div className="relative aspect-5/3 overflow-hidden bg-brand-navy">
                    <Scene className="absolute inset-0 h-full w-full" />
                    <span className="absolute top-4 left-4 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white ring-1 ring-white/20 backdrop-blur-sm">
                      {tag}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col gap-3 p-6 lg:p-8">
                    <div className="flex items-center gap-3">
                      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-liteBlue/10 text-liteBlue">
                        <Icon size={20} />
                      </span>
                      <h2 className="text-xl font-semibold text-pBlue lg:text-2xl">
                        {title}
                      </h2>
                    </div>
                    <p className="text-base leading-relaxed text-pretty text-muted-foreground lg:text-lg">
                      {description}
                    </p>
                  </div>
                </motion.article>
              )
            )}
          </div>
        )}
      </Container>
    </section>
  );
};

export default VisionMission;
