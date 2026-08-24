import { Metadata } from "next";
import ApplicantList from "@/src/components/admin/Career/ApplicantList/ApplicantList";

export const metadata: Metadata = {
  title: "Job Applicants",
  description: "Review applications submitted for job openings.",
};

const page = () => {
  return (
    <div>
      <ApplicantList />
    </div>
  );
};

export default page;
