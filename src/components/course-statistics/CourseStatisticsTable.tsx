"use client";

import { Fragment } from "react";
import { BarChart3 } from "lucide-react";
import { formatFigure, useCourseStatisticsList } from "./useCourseStatistics";

const HEAD_CELL =
  "border border-liteBlue/40 px-3 py-3 text-center font-semibold";
const BODY_CELL = "border border-gray-200 px-3 py-3 text-center";
const TOTAL_CELL = "border border-gray-300 px-3 py-3 text-center";
const COLUMN_COUNT = 7;

const StatisticsSkeleton = () => (
  <div className="space-y-2 p-4">
    {Array.from({ length: 6 }).map((_, index) => (
      <div key={index} className="h-10 animate-pulse rounded bg-gray-100" />
    ))}
  </div>
);

/**
 * The "Course Statistics" table on the public courses page. Rows, their
 * grouping by `remarks` and the totals row all come from
 * `/course-statistics/list` — the totals are calculated by the API so the
 * footer can never drift from the rows above it.
 */
const CourseStatisticsTable = () => {
  const { groups, totals, isLoading } = useCourseStatisticsList();
  const hasRows = groups.some((group) => group.rows.length > 0);

  return (
    <div>
      <h3 className="text-lg font-bold text-pBlue mb-4">Course Statistics</h3>

      <div className="overflow-x-auto rounded-xl border border-gray-200">
        {isLoading ? (
          <StatisticsSkeleton />
        ) : !hasRows ? (
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
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {groups.map((group) =>
                group.rows.length === 0 ? null : (
                  <Fragment key={`${group.remarks}-${group.rows[0].id}`}>
                    <tr className="bg-liteBlue/10">
                      <td
                        colSpan={COLUMN_COUNT + 1}
                        className="border border-gray-200 px-3 py-2 text-left text-xs font-bold uppercase tracking-wide text-pBlue"
                      >
                        {group.remarks?.trim() || "General"}
                      </td>
                    </tr>
                    {group.rows.map((course, index) => (
                      <tr
                        key={course.id}
                        className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                      >
                        <td className={`${BODY_CELL} tabular-nums`}>
                          {course.serial ?? "—"}
                        </td>
                        <td className="border border-gray-200 px-3 py-3">
                          {course.courseName}
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
                      </tr>
                    ))}
                  </Fragment>
                )
              )}

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
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default CourseStatisticsTable;
