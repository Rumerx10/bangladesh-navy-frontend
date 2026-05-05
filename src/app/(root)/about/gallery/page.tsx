import AboutPageHeader from "@/src/components/about/AboutPageHeader";
import GalleryGrid from "@/src/components/about/GalleryGrid";

export default function GalleryPage() {
  return (
    <>
      <AboutPageHeader
        title="Gallery"
        subtitle="Visual documentation of our operations, events, and facilities"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About Us", href: "/about" },
          { label: "Gallery" },
        ]}
      />
      <GalleryGrid />
    </>
  );
}
