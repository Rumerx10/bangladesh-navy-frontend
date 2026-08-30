import { Metadata } from "next";
import CreateUpdateCareer from "@/src/components/admin/Career/Form/CreateUpdateCareer";
import AdminBackButton from "@/src/components/shared/AdminBackButton/AdminBackButton";

export const metadata: Metadata = {
  title: "Add Job",
  description: "Post a new job opening for the careers page.",
};

const page = () => {
  return (
    <div>
      <div className="mb-6">
        <AdminBackButton title="Add new Job" desc="Add job information" />
      </div>
      <CreateUpdateCareer />
    </div>
  );
};

export default page;
