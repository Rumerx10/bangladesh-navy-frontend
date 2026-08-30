import { Metadata } from "next";
import BannerPoster from "@/src/components/admin/ContentManagement/BannerPoster/BannerPoster";

export const metadata: Metadata = {
  title: "Banner & Poster Designer",
  description: "Design and manage promotional banners and posters.",
};

const BannerPosterPage = () => {
  return <BannerPoster />;
};

export default BannerPosterPage;
