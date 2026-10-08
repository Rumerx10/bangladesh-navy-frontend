import { Metadata } from "next";
import SkillBanner from "@/src/components/skill-development/SkillBanner";
import AboutInstitute from "@/src/components/skill-development/AboutInstitute";

export const metadata: Metadata = {
  title: "BN Hydrographic Institute | Bangladesh Navy",
  description:
    "BN Hydrographic Institute — established 1983 at BNS Issa Khan. Training hydrographic professionals in surveying, oceanography and nautical charting.",
};

const SkillDevelopmentPage = () => {
  return (
    <main>
      <SkillBanner />
      {/* About, vision, mission and training overview — all from `/about-institute` */}
      <AboutInstitute />
    </main>
  );
};

export default SkillDevelopmentPage;
