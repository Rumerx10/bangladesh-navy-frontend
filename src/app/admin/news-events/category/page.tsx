import { Metadata } from "next";
import NewsEventsCategoryManagement from "@/src/components/admin/news-events/category/NewsEventsCategoryManagement";

export const metadata: Metadata = {
  title: "News Events Category — Admin",
  description: "Manage news and events categories.",
};

const page = () => {
  return <NewsEventsCategoryManagement />;
};

export default page;
