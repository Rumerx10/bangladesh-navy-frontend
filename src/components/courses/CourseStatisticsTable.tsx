"use client";

import { BarChart3 } from "lucide-react";
import { formatFigure, useCoursesList } from "./useCourses";

const HEAD_CELL =
  "border border-liteBlue/40 px-3 py-3 text-center font-semibold";
const BODY_CELL = "border border-gray-200 px-3 py-3 text-center";
const TOTAL_CELL = "border border-gray-300 px-3 py-3 text-center";

const StatisticsSkeleton = () => (
  <div className="space-y-2 p-4">
    {Array.from({ length: 6 }).map((_, index) => (
      <div key={index} className="h-10 animate-pulse rounded bg-gray-100" />
    ))}
  </div>
);

/**
 * The "Course Statistics" table on the public courses page. Rows and the totals
 * row both come from `/courses/list` — the totals are calculated by the API so
 * the footer can never drift from the rows above it.
 */
const CourseStatisticsTable = () => {
  const { courses, totals, isLoading } = useCoursesList();

  return (
    <div>
      <h3 className="text-lg font-bold text-pBlue mb-4">Course Statistics</h3>

      <div className="overflow-x-auto rounded-xl border border-gray-200">
        {isLoading ? (
          <StatisticsSkeleton />
        ) : courses.length === 0 ? (
          <div className="py-14 text-center">
            <BarChart3 className="mx-auto h-8 w-8 text-gray-400" />
            <p className="mt-3 text-sm font-medium text-gray-600">
              Course statistics are not available yet
            </p>
            <p className="mt-1 text-xs text-gray-400">
              Please check back later.
            </p>
          </div>
        ) : (
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-liteBlue text-white">
                <th className={HEAD_CELL}>Ser</th>
                <th className="border border-liteBlue/40 px-3 py-3 text-left font-semibold">
                  Course
                </th>
                <th className={HEAD_CELL}>Courses Conducted</th>
                <th className={HEAD_CELL}>Courses Duration</th>
                <th className={HEAD_CELL}>BN</th>
                <th className={HEAD_CELL}>Other Maritime Org</th>
                <th className={HEAD_CELL}>Overseas</th>
                <th className={HEAD_CELL}>Total Trainees</th>
                <th className={HEAD_CELL}>Remarks</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {courses.map((course, index) => (
                <tr
                  key={course.id}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className={`${BODY_CELL} tabular-nums`}>{index + 1}</td>
                  <td className="border border-gray-200 px-3 py-3">
                    {course.name}
                  </td>
                  <td className={`${BODY_CELL} tabular-nums`}>
                    {formatFigure(course.coursesConducted)}
                  </td>
                  <td className={`${BODY_CELL} whitespace-nowrap`}>
                    {course.duration?.trim() || "—"}
                  </td>
                  <td className={`${BODY_CELL} tabular-nums`}>
                    {formatFigure(course.bn)}
                  </td>
                  <td className={`${BODY_CELL} tabular-nums`}>
                    {formatFigure(course.otherMaritimeOrg)}
                  </td>
                  <td className={`${BODY_CELL} tabular-nums`}>
                    {formatFigure(course.overseas)}
                  </td>
                  <td className={`${BODY_CELL} tabular-nums`}>
                    {formatFigure(course.totalTrainees)}
                  </td>
                  <td className={BODY_CELL}>{course.remarks?.trim() || "—"}</td>
                </tr>
              ))}

              <tr className="bg-liteBlue/10 font-bold">
                <td className={TOTAL_CELL} colSpan={2}>
                  Total
                </td>
                <td className={`${TOTAL_CELL} tabular-nums`}>
                  {totals.coursesConducted}
                </td>
                <td className={TOTAL_CELL}>—</td>
                <td className={`${TOTAL_CELL} tabular-nums`}>{totals.bn}</td>
                <td className={`${TOTAL_CELL} tabular-nums`}>
                  {totals.otherMaritimeOrg}
                </td>
                <td className={`${TOTAL_CELL} tabular-nums`}>
                  {totals.overseas}
                </td>
                <td className={`${TOTAL_CELL} tabular-nums`}>
                  {totals.totalTrainees}
                </td>
                <td className="border border-gray-300 px-3 py-3" />
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default CourseStatisticsTable;
