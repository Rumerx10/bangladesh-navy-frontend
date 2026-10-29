import { Mail, Phone } from "lucide-react";
import PageHero from "@/src/components/shared/PageHero";
import DirectApproach from "./DirectApproach";

const ContactUs = () => {
  return (
    <div className="bg-card">
      <PageHero
        title="Get in Touch with"
        highlight="Our Experts"
        breadcrumbLabel="Contact Us"
        description="We are dedicated to providing precise hydrographic information and maritime support. Our team is ready to assist with your inquiries, feedback, and service requests."
        features={[
          { icon: <Phone />, label: "Expert Assistance" },
          { icon: <Mail />, label: "Global Support" },
        ]}
      />
      <section className="pb-16 lg:pb-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full blur-[100px] -mr-48 -mt-48 opacity-50" />

        <div className="container px-4 sm:px-0 py-8 lg:py-20">
          <DirectApproach />
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
