import { Metadata } from "next";
import AboutHero from "@/src/components/about/AboutHero";
import HistoryTimeline from "@/src/components/about/HistoryTimeline";

export const metadata: Metadata = {
  title: "Our History | Bangladesh Navy Hydrographic & Oceanographic Center",
  description:
    "The journey of Bangladesh Navy Hydrographic and Oceanographic Center.",
};

const HistoryPage = () => {
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
};

export default HistoryPage;
