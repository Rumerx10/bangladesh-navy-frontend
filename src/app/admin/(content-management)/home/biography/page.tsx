import { Metadata } from "next";
import BiographyManagement from "@/src/components/admin/ContentManagement/home/biography-management/BiographyManagement";

export const metadata: Metadata = {
  title: "Chief's Biography",
  description:
    "Manage the Chief Hydrographer's biography shown on the homepage.",
};

const page = () => {
  return <BiographyManagement />;
};

export default page;
