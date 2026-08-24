import { Metadata } from "next";
import AboutHero from "@/src/components/about/AboutHero";
import GalleryGrid from "@/src/components/about/GalleryGrid";

export const metadata: Metadata = {
  title: "Gallery | Bangladesh Navy Hydrographic & Oceanographic Center",
  description:
    "Visual documentation of BNHOC operations, events, and facilities.",
};

const GalleryPage = () => {
  return (
    <>
      <AboutHero
        title="Gallery"
        description="Visual documentation of our operations, events, and facilities"
      />
      <GalleryGrid />
    </>
  );
};

export default GalleryPage;
