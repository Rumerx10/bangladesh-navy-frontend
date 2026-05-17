import AboutHero from "@/src/components/about/AboutHero";
import SurveyShips from "@/src/components/about/SurveyShips";

export default function SurveyShipsPage() {
  return (
    <>
      <AboutHero
        title="Survey Ships"
        description="Our fleet of hydrographic survey and oceanographic research vessels"
      />
      <SurveyShips />
    </>
  );
}
