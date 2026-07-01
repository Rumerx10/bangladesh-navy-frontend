import AboutHero from "@/src/components/about/AboutHero";
import DirectApproach from "@/src/components/contact-us/DirectApproach";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Information | BNHOC",
  description:
    "Phone numbers, email addresses, office hours, and location of the Bangladesh Navy Hydrographic & Oceanographic Center.",
};

export default function ContactInfoPage() {
  return (
    <>
      <AboutHero
        title="Contact Information"
        description="Reach out to the Bangladesh Navy Hydrographic & Oceanographic Center"
      />
      <section className="py-8 lg:py-20">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-3xl">
          <DirectApproach />
        </div>
      </section>
    </>
  );
}
