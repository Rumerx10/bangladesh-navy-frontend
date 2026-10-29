import { Metadata } from "next";
import PageHero from "@/src/components/shared/PageHero";
import SurveyShips from "@/src/components/about/SurveyShips";

export const metadata: Metadata = {
  title: "Survey Ships | Bangladesh Navy Hydrographic & Oceanographic Center",
  description:
    "Our fleet of hydrographic survey and oceanographic research vessels.",
};

const SurveyShipsPage = () => {
  return (
    <>
      <PageHero
        title="Survey Ships"
        description="Our fleet of hydrographic survey and oceanographic research vessels"
        parents={[{ label: "About Us", href: "/about" }]}
      />
      <SurveyShips />
    </>
  );
};

export default SurveyShipsPage;
