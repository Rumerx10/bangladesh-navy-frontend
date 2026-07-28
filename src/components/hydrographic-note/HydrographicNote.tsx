import HydrographicHero from "./HydrographicHero";
import HydrographicNoteForm from "./HydrographicNoteForm";

const HydrographicNote = () => {
  return (
    <div className="bg-white">
      <HydrographicHero />

      <section className="relative overflow-hidden py-16 lg:py-24">
        <div className="absolute top-0 right-0 -mr-48 -mt-48 h-96 w-96 rounded-full bg-blue-50 opacity-50 blur-[100px]" />
        <div className="container px-4 sm:px-6 lg:px-8">
          <HydrographicNoteForm />
        </div>
      </section>
    </div>
  );
};

export default HydrographicNote;
