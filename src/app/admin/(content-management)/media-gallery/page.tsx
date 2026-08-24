import { Metadata } from "next";
import MediaGallery from "@/src/components/admin/ContentManagement/MediaGallery/MediaGallery";

export const metadata: Metadata = {
  title: "Media Gallery",
  description: "Manage uploaded media assets used across the site.",
};

const MediaGalleryPage = () => {
  return <MediaGallery />;
};

export default MediaGalleryPage;
