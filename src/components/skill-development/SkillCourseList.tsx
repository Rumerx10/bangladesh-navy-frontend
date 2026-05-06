"use client";

import { courses } from "@/src/data/skillCourses";
import CourseCard from "./CourseCard";

export default function SkillCourseList() {
  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl font-bold text-[#001836] mb-3">Available Courses</h2>
            <p className="text-gray-500 max-w-xl">
              Choose from our selection of professional maritime certifications designed for naval personnel and maritime professionals.
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-400">Showing all</span>
            <span className="font-bold text-[#001836]">{courses.length} courses</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
}
