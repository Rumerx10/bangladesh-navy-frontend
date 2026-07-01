import AboutHero from "@/src/components/about/AboutHero";
import ContactForm from "@/src/components/contact-us/ContactForm";
import DirectApproach from "@/src/components/contact-us/DirectApproach";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hydrographic Note | BNHOC",
  description:
    "Submit hydrographic notes and observations to the Bangladesh Navy Hydrographic & Oceanographic Center.",
};

export default function HydrographicNotePage() {
  return (
    <>
      <AboutHero
        title="Hydrographic Note"
        description="Submit hydrographic notes and observations"
      />
      <section className="py-8 lg:py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full blur-[100px] -mr-48 -mt-48 opacity-50" />
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <ContactForm defaultType="hydrographic-note" />
            <DirectApproach />
          </div>
        </div>
      </section>
    </>
  );
}
