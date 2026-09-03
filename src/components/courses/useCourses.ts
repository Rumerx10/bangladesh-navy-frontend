"use client";

import { useMemo } from "react";
import { useGet } from "@/src/hooks/useGet";
import { ICourse, ICoursesListResponse, ICourseTotals } from "./types";

/** Single source of truth for the endpoint and cache keys. */
export const COURSES_ENDPOINT = "/courses";
/** Paginated admin list. */
export const COURSES_QUERY_KEY = ["courses"];
/** `/courses/list` — every course plus the column totals, unpaginated. */
export const COURSES_LIST_QUERY_KEY = ["courses-list"];

export const EMPTY_COURSE_TOTALS: ICourseTotals = {
  batchConducted: 0,
  bn: 0,
  otherMaritimeOrg: 0,
  overseas: 0,
  totalTrainees: 0,
};

/** Statistics-table order — lowest serial first. */
export const bySerial = <T extends { serial?: number }>(a: T, b: T) =>
  (a.serial ?? 0) - (b.serial ?? 0);

/**
 * Loads every course plus the pre-calculated totals row. Used by the public
 * statistics table and, on the admin side, to resolve a member's `courseId`
 * into a course name and to populate the course dropdown.
 */
export const useCoursesList = () => {
  const { data, isLoading, isError } = useGet<ICoursesListResponse>(
    `${COURSES_ENDPOINT}/list`,
    COURSES_LIST_QUERY_KEY
  );

  const courses = useMemo<ICourse[]>(
    () =>
      Array.isArray(data?.data?.courses)
        ? [...data.data.courses].sort(bySerial)
        : [],
    [data]
  );

  return {
    courses,
    totals: data?.data?.totals ?? EMPTY_COURSE_TOTALS,
    isLoading,
    isError,
  };
};

/** `courseId` → course name, for tables that only receive the id. */
export const useCourseNameMap = () => {
  const { courses, isLoading } = useCoursesList();

  const courseNames = useMemo(
    () =>
      courses.reduce<Record<string, string>>((acc, course) => {
        acc[course.id] = course.name;
        return acc;
      }, {}),
    [courses]
  );

  return { courseNames, courses, isLoading };
};

/** `—` for a missing figure, matching the printed statistics table. */
export const formatFigure = (value?: number | null) =>
  value === null || value === undefined ? "—" : String(value);
