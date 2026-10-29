import { Mail, Phone } from "lucide-react";
import PageHero from "@/src/components/shared/PageHero";
import QueryForm from "./QueryForm";

const QuerySuggestion = () => {
  return (
    <div className="bg-card">
      <PageHero
        title="Submit a Query or Suggestion"
        parents={[{ label: "Contact Us", href: "/contact-us" }]}
        breadcrumbLabel="Query & Suggestion"
        description="We welcome your queries and suggestions to improve our hydrographic services and resources. Share details and our team will respond promptly."
        features={[
          { icon: <Phone />, label: "Expert Assistance" },
          { icon: <Mail />, label: "Global Support" },
        ]}
      />
      <section className="pb-16 lg:pb-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full blur-[100px] -mr-48 -mt-48 opacity-50" />
        <div className="container px-4 sm:px-0 py-8 lg:py-20">
          <QueryForm />
        </div>
      </section>
    </div>
  );
};

export default QuerySuggestion;
