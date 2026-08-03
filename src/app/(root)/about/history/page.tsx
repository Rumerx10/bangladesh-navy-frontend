import AboutHero from "@/src/components/about/AboutHero";
import HistoryTimeline from "@/src/components/about/HistoryTimeline";

export default function HistoryPage() {
  return (
    <>
      <AboutHero
        title="Our History"
        description="The journey of Bangladesh Navy Hydrographic and Oceanographic Center"
      />
      <section className="py-8 lg:py-20">
        <div className="container px-4 sm:px-6 lg:px-8">
          <HistoryTimeline />
        </div>
      </section>
    </>
  );
}
