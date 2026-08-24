import { Metadata } from "next";
import PartnerManagement from "@/src/components/admin/ContentManagement/home/partner-management/PartnerManagement";

export const metadata: Metadata = {
  title: "Partners",
  description: "Manage partner organizations shown on the homepage.",
};

const page = () => {
  return (
    <div>
      <PartnerManagement />
    </div>
  );
};

export default page;
