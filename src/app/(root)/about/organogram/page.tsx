import { Metadata } from "next";
import AboutHero from "@/src/components/about/AboutHero";
import Organization from "@/src/components/about/Organization";

export const metadata: Metadata = {
  title: "Organogram | Bangladesh Navy Hydrographic & Oceanographic Center",
  description: "Structure and departments of BNHOC.",
};

const OrganogramPage = () => {
  return (
    <>
      <AboutHero
        title="Organogram"
        description="Structure and departments of BNHOC"
      />
      <Organization />
    </>
  );
};

export default OrganogramPage;
