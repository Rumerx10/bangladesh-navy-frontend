import ContactHero from "./ContactHero";
import DirectApproach from "./DirectApproach";

const ContactUs = () => {
  return (
    <div className="bg-white">
      <ContactHero />
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
