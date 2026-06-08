"use client";

import { courses } from "@/src/data/skillCourses";
import { useState } from "react";
import { CourseCategory } from "./types";
import CourseCard from "./CourseCard";

const ALL = "All";

const availableCategories = [
  ALL,
  ...Array.from(new Set(courses.map((c) => c.category))),
] as (typeof ALL | CourseCategory)[];

export default function SkillCourseList() {
  const [activeCategory, setActiveCategory] = useState<typeof ALL | CourseCategory>(ALL);

  const filtered =
    activeCategory === ALL
      ? courses
      : courses.filter((c) => c.category === activeCategory);

  return (
    <section id="courses" className="py-20 lg:py-32 bg-white">
      <div className="container px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <h2 className="text-3xl font-bold text-[#001836] mb-3">
              Available Courses
            </h2>
            <p className="text-gray-500 max-w-xl">
              Choose from our selection of professional maritime certifications
              designed for naval personnel and maritime professionals.
            </p>
          </div>
          <span className="text-sm text-gray-400">
            Showing{" "}
            <span className="font-bold text-[#001836]">{filtered.length}</span>{" "}
            of {courses.length} courses
          </span>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {availableCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-[#003f71] text-white shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-[#003f71]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filtered.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-gray-400 py-20">
            No courses found in this category.
          </p>
        )}
      </div>
    </section>
  );
}
