import CourseOverview from "@/src/components/skill-development/CourseOverview";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Courses | BN Hydrographic Institute",
  description:
    "Browse professional maritime courses offered by BN Hydrographic Institute — hydrography, cartography, GIS, and customized programmes.",
};

const CoursesPage = () => {
  return (
    <main className="pt-25">
      <CourseOverview />
      {/* <SkillCourseList /> */}
    </main>
  );
};

export default CoursesPage;
