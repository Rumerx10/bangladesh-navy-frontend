import { Metadata } from "next";
import SurveyShipsManagement from "@/src/components/admin/ContentManagement/about-us/survey-ships-management/SurveyShipsManagement";

export const metadata: Metadata = {
  title: "Survey Ships",
  description: "Manage survey ship profiles and categories.",
};

const page = () => {
  return (
    <div>
      <SurveyShipsManagement />
    </div>
  );
};

export default page;
