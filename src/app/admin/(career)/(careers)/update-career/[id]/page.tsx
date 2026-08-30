import { Metadata } from "next";
import UpdateJob from "@/src/components/admin/Career/UpdateJob/UpdateJob";

export const metadata: Metadata = {
  title: "Update Job",
  description: "Edit an existing job listing.",
};

const page = () => {
  return (
    <div>
      <UpdateJob />
    </div>
  );
};

export default page;
