import { Metadata } from "next";
import MissionVisionManagement from "@/src/components/admin/ContentManagement/about-us/mission-vision-management/MissionVisionManagement";

export const metadata: Metadata = {
  title: "Vision & Mission",
  description: "Manage the vision and mission statement content.",
};

const page = () => {
  return (
    <div>
      <MissionVisionManagement />
    </div>
  );
};

export default page;
