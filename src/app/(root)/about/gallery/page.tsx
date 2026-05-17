import AboutHero from "@/src/components/about/AboutHero";
import GalleryGrid from "@/src/components/about/GalleryGrid";

export default function GalleryPage() {
  return (
    <>
      <AboutHero
        title="Gallery"
        description="Visual documentation of our operations, events, and facilities"
      />
      <GalleryGrid />
    </>
  );
}
