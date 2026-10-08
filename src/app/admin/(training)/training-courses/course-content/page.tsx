import { Metadata } from "next";
import CourseContentManagement from "@/src/components/admin/training-courses/course-content/CourseContentManagement";

export const metadata: Metadata = {
  title: "Course Content",
  description:
    "Manage the heading, introduction, course sequence and course descriptions shown on the public courses page.",
};

const page = () => {
  return <CourseContentManagement />;
};

export default page;
