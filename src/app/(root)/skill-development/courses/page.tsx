import CourseOverview from "@/src/components/skill-development/CourseOverview";
import SkillCourseList from "@/src/components/skill-development/SkillCourseList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Courses | BN Hydrographic Institute",
  description:
    "Browse professional maritime courses offered by BN Hydrographic Institute — hydrography, cartography, GIS, and customized programmes.",
};

export default function CoursesPage() {
  return (
    <main className="pt-32 lg:pt-36">
      <CourseOverview />
      {/* <SkillCourseList /> */}
    </main>
  );
}
