import { Metadata } from "next";
import AboutHero from "@/src/components/about/AboutHero";
import SurveyShips from "@/src/components/about/SurveyShips";

export const metadata: Metadata = {
  title: "Survey Ships | Bangladesh Navy Hydrographic & Oceanographic Center",
  description:
    "Our fleet of hydrographic survey and oceanographic research vessels.",
};

const SurveyShipsPage = () => {
  return (
    <>
      <AboutHero
        title="Survey Ships"
        description="Our fleet of hydrographic survey and oceanographic research vessels"
      />
      <SurveyShips />
    </>
  );
};

export default SurveyShipsPage;
