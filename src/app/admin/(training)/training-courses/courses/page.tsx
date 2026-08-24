import { Metadata } from "next";
import CoursesManagement from "@/src/components/admin/training-courses/courses/CoursesManagement";

export const metadata: Metadata = {
  title: "Courses",
  description: "Manage training courses offered by the institute.",
};

const page = () => {
  return (
    <div>
      <CoursesManagement />
    </div>
  );
};

export default page;
