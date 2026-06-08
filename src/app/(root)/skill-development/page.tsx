import SkillBanner from "@/src/components/skill-development/SkillBanner";
import SkillCourseList from "@/src/components/skill-development/SkillCourseList";
import { Metadata } from "next";
import { BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Skill Development | Bangladesh Navy Hydrographic & Oceanographic Center",
  description: "Professional maritime certifications and skill development courses by Bangladesh Navy.",
};

export default function SkillDevelopmentPage() {
  return (
    <main>
      <SkillBanner />
      <section className="py-16 lg:py-20 bg-white container">
        <div className="px-4 sm:px-6 lg:px-8">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[#003f71]/10 text-[#003f71] flex items-center justify-center">
                <BookOpen size={24} />
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-[#001836]">
                About BN Hydrographic Institute
              </h2>
            </div>
            <div className="  text-gray-600 leading-relaxed space-y-4">
              <p>
                The Bangladesh Navy Hydrographic Institute, established in 1983 at BNS Issa Khan, Chattogram,
                is the premier institution for hydrographic education and training in Bangladesh. Operating
                under the aegis of the Bangladesh Navy Hydrographic &amp; Oceanographic Center (BNHOC), the
                Institute has been instrumental in developing a cadre of professionally qualified hydrographic
                surveyors and cartographers for the nation.
              </p>
              <p>
                The Institute offers a comprehensive range of courses — from foundational Survey Recorder
                programmes to advanced CATEGORY A and CATEGORY B hydrographic courses recognized by the
                International Hydrographic Organization (IHO) under its Standards of Competence (S-5).
                Training combines rigorous classroom instruction with extensive practical sea training
                aboard Bangladesh Navy survey vessels, ensuring graduates possess both theoretical knowledge
                and hands-on operational competence.
              </p>
              <p>
                Over the decades, the BN Hydrographic Institute has trained hundreds of naval and civilian
                professionals from Bangladesh and friendly foreign navies, contributing to regional
                capacity building in hydrographic surveying, nautical cartography, GIS, and oceanographic
                data collection.
              </p>
            </div>
          </div>
        </div>
      </section>

      <SkillCourseList />
    </main>
  );
}
