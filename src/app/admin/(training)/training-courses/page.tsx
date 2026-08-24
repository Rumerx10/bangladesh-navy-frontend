import { Metadata } from "next";
import InstituteManagement from "@/src/components/admin/training-courses/institute/InstituteManagement";

export const metadata: Metadata = {
  title: "Institute",
  description: "Manage training institute information.",
};

const page = () => {
  return (
    <div>
      <InstituteManagement />
    </div>
  );
};

export default page;
