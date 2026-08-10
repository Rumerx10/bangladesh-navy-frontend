import { Metadata } from "next";
import AboutHero from "@/src/components/about/AboutHero";
import VisionMission from "@/src/components/about/VisionMission";

export const metadata: Metadata = {
  title:
    "Vision & Mission | Bangladesh Navy Hydrographic & Oceanographic Center",
  description: "Our guiding principles and strategic direction.",
};

export default function VisionMissionPage() {
  return (
    <>
      <AboutHero
        title="Vision & Mission"
        description="Our guiding principles and strategic direction"
      />
      <VisionMission />
    </>
  );
}
