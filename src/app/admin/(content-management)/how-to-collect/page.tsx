import { Metadata } from "next";
import HowToCollectManagement from "@/src/components/admin/ContentManagement/how-to-collect/HowToCollectManagement";

export const metadata: Metadata = {
  title: "How to Collect",
  description:
    "Manage the collection process steps shown on the public How to Collect page.",
};

const HowToCollectPage = () => {
  return <HowToCollectManagement />;
};

export default HowToCollectPage;
