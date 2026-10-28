import { Metadata } from "next";
import VisionMission from "@/src/components/about/VisionMission";
import VisionMissionHero from "@/src/components/about/VisionMissionHero";

export const metadata: Metadata = {
  title:
    "Vision & Mission | Bangladesh Navy Hydrographic & Oceanographic Center",
  description: "Our guiding principles and strategic direction.",
};

const VisionMissionPage = () => {
  return (
    <>
      <VisionMissionHero />
      <VisionMission />
    </>
  );
};

export default VisionMissionPage;
