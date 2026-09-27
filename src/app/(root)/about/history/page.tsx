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
        {/* The shared `.container` runs to 1535px, which is a fine shell for a
            dashboard but far too wide to read a narrative across — and a
            floated image inside it ends up marooned. Constraining the article
            to a book-like measure is what lets the text actually wrap around
            the picture the way the admin arranged it. */}
        <div className="container px-4 sm:px-6 lg:px-8">
          <article className="mx-auto w-full">
            <HistoryTimeline />
          </article>
        </div>
      </section>
    </>
  );
};

export default HistoryPage;
