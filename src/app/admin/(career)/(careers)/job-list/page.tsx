import { Metadata } from "next";
import JobList from "@/src/components/admin/Career/JobList/JobList";

export const metadata: Metadata = {
  title: "Job Listings",
  description: "Manage published job openings.",
};

const page = () => {
  return (
    <div>
      <JobList />
    </div>
  );
};

export default page;
