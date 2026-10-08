"use client";

import Image from "next/image";
import Paragraph from "@/src/components/shared/Paragraph";
import CourseStatisticsManagement from "./course-statistics/CourseStatisticsManagement";

const CoursesManagement = () => {
  return (
    <div className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden">
      {/* Header */}
      <div className="bg-linear-to-r from-primary/5 via-primary/10 to-transparent px-6 sm:px-8 py-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 w-10 h-10 flex items-center justify-center rounded-xl border border-primary/20">
            <Image
              src="/icons/media.svg"
              alt="courses"
              width={40}
              height={40}
              className="w-5"
            />
          </div>
          <div>
            <Paragraph className="font-semibold text-lg! text-pBlue">
              Courses
            </Paragraph>
            <Paragraph className="text-sm! text-secondary-foreground">
              Course Statistics rows shown on the public courses page
            </Paragraph>
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-8 space-y-4">
        {/* Live, editable rows — "Add Row" and each row's edit icon open the
            same input fields used by POST/PATCH /course-statistics. */}
        <CourseStatisticsManagement />
      </div>
    </div>
  );
};

export default CoursesManagement;
