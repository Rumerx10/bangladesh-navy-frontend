import { Metadata } from "next";
import NoticesManagement from "@/src/components/admin/notices/NoticesManagement";

export const metadata: Metadata = {
  title: "Notices to Mariners — Admin",
  description:
    "Create, update and remove notices to mariners for the Bangladesh Navy website.",
};

const page = () => {
  return <NoticesManagement />;
};

export default page;
