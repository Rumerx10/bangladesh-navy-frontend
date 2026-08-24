import NewsListing from "@/src/components/news/NewsListing";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "News & Events — BNHOC",
  description:
    "Latest hydrographic surveys, maritime events, and BNHOC publications.",
};

const NewsPage = () => {
  return <NewsListing />;
};

export default NewsPage;
