import AboutPageHeader from "@/src/components/about/AboutPageHeader";
import SurveyShips from "@/src/components/about/SurveyShips";

export default function SurveyShipsPage() {
  return (
    <>
      <AboutPageHeader
        title="Survey Ships"
        subtitle="Our fleet of hydrographic survey and oceanographic research vessels"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About Us", href: "/about" },
          { label: "Survey Ships" },
        ]}
      />
      <SurveyShips />
    </>
  );
}
