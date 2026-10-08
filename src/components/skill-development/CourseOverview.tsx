"use client";

import CourseStatisticsTable from "@/src/components/course-statistics/CourseStatisticsTable";
import { useCourseInfo } from "@/src/components/course-info/useCourseInfo";

const CourseOverviewSkeleton = () => (
  <div className="space-y-12 animate-pulse">
    <div className="space-y-4">
      <div className="h-8 w-40 rounded bg-light-dark" />
      <div className="space-y-2">
        <div className="h-4 w-full rounded bg-light-dark" />
        <div className="h-4 w-11/12 rounded bg-light-dark" />
        <div className="h-4 w-3/4 rounded bg-light-dark" />
      </div>
      <div className="rounded-xl border border-liteBlue/20 bg-liteBlue/5 p-5 space-y-2">
        <div className="h-4 w-32 rounded bg-light-dark" />
        <div className="h-3 w-56 rounded bg-light-dark" />
        <div className="h-3 w-48 rounded bg-light-dark" />
        <div className="h-3 w-40 rounded bg-light-dark" />
      </div>
    </div>
    <div className="space-y-8">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="border-l-4 border-border pl-5 space-y-2">
          <div className="h-5 w-1/3 rounded bg-light-dark" />
          <div className="h-4 w-full rounded bg-light-dark" />
          <div className="h-4 w-4/5 rounded bg-light-dark" />
        </div>
      ))}
    </div>
  </div>
);

/**
 * Heading, introduction, course sequence and course descriptions come from the
 * singleton `/course-info` record, edited on Training & Courses → Course
 * Content. Until that record exists the hook serves the copy this page shipped
 * with, so the section is never blank. Bangla is stored on the record but not
 * rendered — the public site has no language switch yet.
 */
const CourseOverview = () => {
  const { courseInfo, isLoading } = useCourseInfo();

  return (
    <section className="bg-card py-8 lg:py-20">
      <div className="container px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
        {isLoading ? (
          <CourseOverviewSkeleton />
        ) : (
          <>
            {/* Intro */}
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-pBlue mb-4">
                {courseInfo.titleEn}
              </h2>
              <p className="text-secondary-foreground leading-relaxed text-[15px] mb-6">
                {courseInfo.introductionEn}
              </p>
              {courseInfo.courseSequenceEn.length > 0 && (
                <div className="rounded-xl border border-liteBlue/20 bg-liteBlue/5 p-5">
                  <p className="text-sm font-semibold text-liteBlue mb-3">
                    Course Sequence
                  </p>
                  <ol className="list-decimal list-inside space-y-1 text-sm text-foreground">
                    {courseInfo.courseSequenceEn.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ol>
                </div>
              )}
            </div>

            {/* Course descriptions */}
            {courseInfo.sections.length > 0 && (
              <div className="space-y-8">
                {courseInfo.sections.map((section, index) => (
                  <div key={index} className="border-l-4 border-liteBlue pl-5">
                    <h3 className="text-lg font-bold text-pBlue mb-2">
                      {index + 1}. {section.titleEn}
                    </h3>
                    <p className="text-sm text-secondary-foreground leading-relaxed">
                      {section.descriptionEn}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Summary Table — rows and totals come from `/course-statistics/list` */}
        <CourseStatisticsTable />
      </div>
    </section>
  );
};

export default CourseOverview;
