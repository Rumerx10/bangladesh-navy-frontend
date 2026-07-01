import ContactHero from "./ContactHero";
import ContactForm from "./ContactForm";
import DirectApproach from "./DirectApproach";

export default function ContactUs() {
  return (
    <div className="bg-white">
      <ContactHero />
      <section className="pb-16 lg:pb-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full blur-[100px] -mr-48 -mt-48 opacity-50" />
        
        <div className="container px-4 sm:px-0 py-8 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <ContactForm />
            <DirectApproach />
          </div>
        </div>
      </section>
    </div>
  );
}
