"use client";

import AboutHero from "@/src/components/about/AboutHero";
import { useMissionVision } from "@/src/components/mission-vision/useMissionVision";

/**
 * Hero for `/about/vision-mission`, fed by the heading and subtitle on the
 * `/mission-vision` record. The hook serves the default copy until the record
 * loads (or if none exists), so the hero is never blank.
 */
const VisionMissionHero = () => {
  const { missionVision } = useMissionVision();

  return (
    <AboutHero
      title={missionVision.titleEn}
      description={missionVision.subTitleEn?.trim() || undefined}
    />
  );
};

export default VisionMissionHero;
