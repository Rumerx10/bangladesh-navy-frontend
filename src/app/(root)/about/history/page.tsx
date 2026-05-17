import AboutHero from "@/src/components/about/AboutHero";
import HistoryTimeline from "@/src/components/about/HistoryTimeline";
import { historyEras, historyMilestones } from "@/src/data/aboutData";

export default function HistoryPage() {
  return (
    <>
      <AboutHero
        title="Our History"
        description="The journey of Bangladesh Navy Hydrographic and Oceanographic Center"
      />
      <section className="py-8 lg:py-12">
        <div className="container px-4 sm:px-6 lg:px-8">
          <HistoryTimeline eras={historyEras} milestones={historyMilestones} />
        </div>
      </section>
    </>
  );
}
