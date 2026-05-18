import AboutHero from "@/src/components/about/AboutHero";
import Organization from "@/src/components/about/Organization";

export default function OrganogramPage() {
  return (
    <>
      <AboutHero
        title="Organogram"
        description="Structure and departments of BNHOC"
      />
      <Organization />
    </>
  );
}
