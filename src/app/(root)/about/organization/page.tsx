import AboutPageHeader from "@/src/components/about/AboutPageHeader";
import Organization from "@/src/components/about/Organization";

export default function OrganizationPage() {
  return (
    <>
      <AboutPageHeader
        title="Organization"
        subtitle="Structure and departments of BNHOC"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About Us", href: "/about" },
          { label: "Organization" },
        ]}
      />
      <Organization />
    </>
  );
}
