import ContactHero from "./ContactHero";
import ContactForm from "./ContactForm";
import DirectApproach from "./DirectApproach";

export default function ContactUs() {
  return (
    <div className="bg-white">
      <ContactHero />
      <section className="py-16 lg:py-24 relative overflow-hidden">
        {/* Subtle decorative background blur */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full blur-[100px] -mr-48 -mt-48 opacity-50" />
        
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <ContactForm />
            <DirectApproach />
          </div>
        </div>
      </section>
    </div>
  );
}
