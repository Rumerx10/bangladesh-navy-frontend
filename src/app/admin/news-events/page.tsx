import { Metadata } from "next";
import NewsEventsManagement from "@/src/components/admin/news-events/NewsEventsManagement";

export const metadata: Metadata = {
  title: "News & Events — Admin",
  description: "Manage news and events for the Bangladesh Navy website.",
};

const page = () => {
  return <NewsEventsManagement />;
};

export default page;
