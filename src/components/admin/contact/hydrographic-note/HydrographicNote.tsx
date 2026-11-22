import { Anchor, FileText, MapPin } from "lucide-react";
import PageHero from "@/src/components/shared/PageHero";
import HydrographicNoteForm from "./HydrographicNoteForm";
import Container from "@/src/components/shared/Container";

const HydrographicNote = () => {
  return (
    <div className="bg-card">
      <PageHero
        title="Submit a Hydrographic Note"
        breadcrumbLabel="Hydrographic Note"
        description="Hydrographic Note H.102 — help us chart safely."
        features={[
          { icon: <Anchor />, label: "Maritime Safety" },
          { icon: <MapPin />, label: "Positional Accuracy" },
          { icon: <FileText />, label: "Official Record" },
        ]}
      />
      <section className="relative overflow-hidden py-16 lg:py-24">
        <div className="absolute top-0 right-0 -mr-48 -mt-48 h-96 w-96 rounded-full bg-blue-50 opacity-50 blur-[100px]" />
        <Container>
          <HydrographicNoteForm />
        </Container>
      </section>
    </div>
  );
};

export default HydrographicNote;
