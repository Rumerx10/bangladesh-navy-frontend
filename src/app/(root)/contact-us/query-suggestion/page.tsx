import QuerySuggestion from "@/src/components/query-suggestion/QuerySuggestion";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Query & Suggestion | Bangladesh Navy Hydrographic & Oceanographic Center",
  description:
    "Submit queries or suggestions to the Bangladesh Navy Hydrographic & Oceanographic Center.",
};

const QuerySuggestionPage = () => {
  return <QuerySuggestion />;
};

export default QuerySuggestionPage;
