import { Metadata } from "next";
import GalleryManagement from "@/src/components/admin/ContentManagement/about-us/gallery-management/GalleryManagement";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Manage photo gallery items for the About Us section.",
};

const page = () => {
  return <GalleryManagement />;
};

export default page;
