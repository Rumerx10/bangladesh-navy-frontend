"use client";

import PageHero from "@/src/components/shared/PageHero";
import { useMissionVision } from "@/src/components/mission-vision/useMissionVision";

/**
 * Hero for `/about/vision-mission`, fed by the heading and subtitle on the
 * `/mission-vision` record. The hook serves the default copy until the record
 * loads (or if none exists), so the hero is never blank.
 */
const VisionMissionHero = () => {
  const { missionVision } = useMissionVision();

  return (
    <PageHero
      title={missionVision.titleEn}
      description={missionVision.subTitleEn?.trim() || undefined}
      parents={[{ label: "About Us", href: "/about" }]}
      breadcrumbLabel="Vision & Mission"
    />
  );
};

export default VisionMissionHero;
