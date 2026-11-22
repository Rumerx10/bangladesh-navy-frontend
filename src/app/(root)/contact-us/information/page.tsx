import { Metadata } from "next";
import PageHero from "@/src/components/shared/PageHero";
import DirectApproach from "@/src/components/contact/DirectApproach";
import Container from "@/src/components/shared/Container";

export const metadata: Metadata = {
  title: "Contact Information | BNHOC",
  description:
    "Phone numbers, email addresses, office hours, and location of the Bangladesh Navy Hydrographic & Oceanographic Center.",
};

const ContactInfoPage = () => {
  return (
    <>
      <PageHero
        title="Contact Information"
        description="Reach out to the Bangladesh Navy Hydrographic & Oceanographic Center"
        parents={[{ label: "Contact Us", href: "/contact-us" }]}
      />
      <section className="py-8 lg:py-20">
        <Container className="max-w-3xl">
          <DirectApproach />
        </Container>
      </section>
    </>
  );
};

export default ContactInfoPage;
