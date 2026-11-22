import { Metadata } from "next";
import PageHero from "@/src/components/shared/PageHero";
import ChiefHydrographerMessage from "@/src/components/about/ChiefHydrographerMessage";
import Container from "@/src/components/shared/Container";

export const metadata: Metadata = {
  title:
    "Chief Hydrographer Message | Bangladesh Navy Hydrographic & Oceanographic Center",
  description: "A message from the Chief Hydrographer of BNHOC.",
};

const ChiefHydrographerMessagePage = () => {
  return (
    <>
      <PageHero
        title="Chief Hydrographer Message"
        description="A message from the Chief Hydrographer of BNHOC"
        parents={[{ label: "About Us", href: "/about" }]}
      />
      <section className="py-8 lg:py-20">
        <Container>
          <ChiefHydrographerMessage />
        </Container>
      </section>
    </>
  );
};

export default ChiefHydrographerMessagePage;
