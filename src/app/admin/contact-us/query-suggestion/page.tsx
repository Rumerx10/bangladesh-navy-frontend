import { Metadata } from "next";
import QuerySuggestionManagement from "@/src/components/admin/contact/query-suggestion/QuerySuggestionManagement";

export const metadata: Metadata = {
  title: "Query & Suggestion Submissions",
  description: "Review queries and suggestions submitted by users.",
};

const page = () => {
  return <QuerySuggestionManagement />;
};

export default page;
