import { Metadata } from "next";
import OrganogramManagement from "@/src/components/admin/ContentManagement/about-us/organogram-management/OrganogramManagement";

export const metadata: Metadata = {
  title: "Organogram",
  description: "Manage the organizational hierarchy.",
};

const page = () => {
  return (
    <div>
      <OrganogramManagement />
    </div>
  );
};

export default page;
