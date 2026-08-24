import { Metadata } from "next";
import AlumniManagement from "@/src/components/admin/training-courses/alumni/AlumniManagement";

export const metadata: Metadata = {
  title: "Alumni",
  description: "Manage BN Hydrographic Institute alumni records.",
};

const page = () => {
  return (
    <div>
      <AlumniManagement />
    </div>
  );
};

export default page;
