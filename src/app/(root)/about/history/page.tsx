import AboutPageHeader from "@/src/components/about/AboutPageHeader";
import HistoryTimeline from "@/src/components/about/HistoryTimeline";
import { historyTimeline } from "@/src/data/aboutData";

export default function HistoryPage() {
  return (
    <>
      <AboutPageHeader
        title="Our History"
        subtitle="The journey of Bangladesh Navy Hydrographic and Oceanographic Center"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About Us", href: "/about" },
          { label: "History" },
        ]}
      />
      <section className="py-8 lg:py-12">
        <div className="container px-4 sm:px-6 lg:px-8">
          <HistoryTimeline items={historyTimeline} />
        </div>
      </section>
    </>
  );
}
