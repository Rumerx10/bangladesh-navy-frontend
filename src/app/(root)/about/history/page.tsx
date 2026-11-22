import { Metadata } from "next";
import PageHero from "@/src/components/shared/PageHero";
import HistoryTimeline from "@/src/components/about/HistoryTimeline";
import Container from "@/src/components/shared/Container";

export const metadata: Metadata = {
  title: "Our History | Bangladesh Navy Hydrographic & Oceanographic Center",
  description:
    "The journey of Bangladesh Navy Hydrographic and Oceanographic Center.",
};

const HistoryPage = () => {
  return (
    <>
      <PageHero
        title="Our History"
        description="The journey of Bangladesh Navy Hydrographic and Oceanographic Center"
        parents={[{ label: "About Us", href: "/about" }]}
        breadcrumbLabel="History"
      />
      <section className="py-8 lg:py-20">
        {/* The shared `.container` runs to 1535px, which is a fine shell for a
            dashboard but far too wide to read a narrative across — and a
            floated image inside it ends up marooned. Constraining the article
            to a book-like measure is what lets the text actually wrap around
            the picture the way the admin arranged it. */}
        <Container>
          <article className="mx-auto w-full">
            <HistoryTimeline />
          </article>
        </Container>
      </section>
    </>
  );
};

export default HistoryPage;
