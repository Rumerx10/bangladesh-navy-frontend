import { Metadata } from "next";
import AboutHero from "@/src/components/about/AboutHero";
import ChiefHydrographerMessage from "@/src/components/about/ChiefHydrographerMessage";

export const metadata: Metadata = {
  title:
    "Chief Hydrographer Message | Bangladesh Navy Hydrographic & Oceanographic Center",
  description: "A message from the Chief Hydrographer of BNHOC.",
};

const ChiefHydrographerMessagePage = () => {
  return (
    <>
      <AboutHero
        title="Chief Hydrographer Message"
        description="A message from the Chief Hydrographer of BNHOC"
      />
      <section className="py-8 lg:py-20">
        <div className="container px-4 sm:px-6 lg:px-8">
          <ChiefHydrographerMessage />
        </div>
      </section>
    </>
  );
};

export default ChiefHydrographerMessagePage;
