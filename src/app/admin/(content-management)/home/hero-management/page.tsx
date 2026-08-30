import { Metadata } from "next";
import HeroManagement from "@/src/components/admin/ContentManagement/home/hero-management/HeroManagement";

export const metadata: Metadata = {
  title: "Hero Banners",
  description: "Manage homepage hero banners.",
};

const page = () => {
  return <HeroManagement />;
};

export default page;
