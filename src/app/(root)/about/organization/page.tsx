import AboutHero from "@/src/components/about/AboutHero";
import Organization from "@/src/components/about/Organization";

export default function OrganizationPage() {
  return (
    <>
      <AboutHero
        title="Organization"
        description="Structure and departments of BNHOC"
      />
      <Organization />
    </>
  );
}
