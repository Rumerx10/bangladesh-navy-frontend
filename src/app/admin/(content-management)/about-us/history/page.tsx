import { Metadata } from "next";
import HistoryManagement from "@/src/components/admin/ContentManagement/about-us/history-management/HistoryManagement";

export const metadata: Metadata = {
  title: "History",
  description: "Manage the organization's history content.",
};

const page = () => {
  return <HistoryManagement />;
};

export default page;
