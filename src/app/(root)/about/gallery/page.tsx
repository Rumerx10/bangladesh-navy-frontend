import { Metadata } from "next";
import PageHero from "@/src/components/shared/PageHero";
import GalleryGrid from "@/src/components/about/GalleryGrid";

export const metadata: Metadata = {
  title: "Gallery | Bangladesh Navy Hydrographic & Oceanographic Center",
  description:
    "Visual documentation of BNHOC operations, events, and facilities.",
};

const GalleryPage = () => {
  return (
    <>
      <PageHero
        title="Gallery"
        description="Visual documentation of our operations, events, and facilities"
        parents={[{ label: "About Us", href: "/about" }]}
      />
      <GalleryGrid />
    </>
  );
};

export default GalleryPage;
