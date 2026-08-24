import { Metadata } from "next";
import NoticeManagement from "@/src/components/admin/ContentManagement/home/notices/NoticeManagement";

export const metadata: Metadata = {
  title: "Homepage Notices",
  description: "Manage notices shown on the homepage.",
};

const page = () => {
  return <NoticeManagement />;
};

export default page;
