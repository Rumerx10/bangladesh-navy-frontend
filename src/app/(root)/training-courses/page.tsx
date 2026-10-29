import { Metadata } from "next";
import { BookOpen, Shield } from "lucide-react";
import PageHero from "@/src/components/shared/PageHero";
import AboutInstitute from "@/src/components/skill-development/AboutInstitute";

export const metadata: Metadata = {
  title: "BN Hydrographic Institute | Bangladesh Navy",
  description:
    "BN Hydrographic Institute — established 1983 at BNS Issa Khan. Training hydrographic professionals in surveying, oceanography and nautical charting.",
};

const SkillDevelopmentPage = () => {
  return (
    <main>
      <PageHero
        title="BN Hydrographic Institute"
        description="Established 1983 at BNS Issa Khan — training hydrographic professionals in surveying, oceanography and nautical charting."
        features={[
          { icon: <Shield />, label: "IHO Certified" },
          { icon: <BookOpen />, label: "Industry Expert Instructors" },
        ]}
      />
      {/* About, vision, mission and training overview — all from `/about-institute` */}
      <AboutInstitute />
    </main>
  );
};

export default SkillDevelopmentPage;
