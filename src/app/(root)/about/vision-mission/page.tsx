import AboutPageHeader from "@/src/components/about/AboutPageHeader";
import VisionMission from "@/src/components/about/VisionMission";

export default function VisionMissionPage() {
  return (
    <>
      <AboutPageHeader
        title="Vision & Mission"
        subtitle="Our guiding principles and strategic direction"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About Us", href: "/about" },
          { label: "Vision & Mission" },
        ]}
      />
      <VisionMission />
    </>
  );
}
