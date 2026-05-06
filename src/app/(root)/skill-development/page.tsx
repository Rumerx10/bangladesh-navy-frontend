import SkillBanner from "@/src/components/skill-development/SkillBanner";
import SkillCourseList from "@/src/components/skill-development/SkillCourseList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skill Development | Bangladesh Navy Hydrographic & Oceanographic Center",
  description: "Professional maritime certifications and skill development courses by Bangladesh Navy.",
};

export default function SkillDevelopmentPage() {
  return (
    <main>
      <SkillBanner />
      <SkillCourseList />
    </main>
  );
}
