/**
 * Rows of the public "Course Statistics" table (`/training-courses/courses`).
 * Backed by its own `/course-statistics` API — completely independent of the
 * Courses / Batches / Alumni Members directory
 * (`src/components/courses/types.ts`), which continues to group alumni
 * batches and has no connection to this model.
 */

export type CourseStatisticStatus = "ACTIVE" | "INACTIVE";

export interface ICourseStatistic {
  id: string;
  courseName: string;
  /** How many times this course has been run to date. */
  coursesConducted?: number | null;
  /** Free text — "24 weeks". */
  duration?: string | null;
  /** Trainee headcount by parent organization. */
  bn?: number | null;
  otherMaritimeOrg?: number | null;
  overseas?: number | null;
  totalTrainees?: number | null;
  /** "Officers", "Sailors", "Officers and Sailors", … — also the grouping key on `/course-statistics/list`. */
  remarks?: string | null;
  /** Row order within its group. */
  serial: number;
  status: CourseStatisticStatus;
  createdAt?: string;
  updatedAt?: string;
}

/** Column totals for the statistics table — calculated by the API. */
export interface ICourseStatisticTotals {
  coursesConducted: number;
  bn: number;
  otherMaritimeOrg: number;
  overseas: number;
  totalTrainees: number;
}

/** One `remarks` section of `GET /course-statistics/list`. */
export interface ICourseStatisticsGroup {
  remarks: string;
  rows: ICourseStatistic[];
}

/** Shape of `GET /course-statistics/list` — the public payload. */
export interface ICourseStatisticsListResponse {
  groups: ICourseStatisticsGroup[];
  total: ICourseStatisticTotals;
}

export const COURSE_STATISTIC_STATUS_OPTIONS: {
  label: string;
  value: CourseStatisticStatus;
}[] = [
  { label: "Active", value: "ACTIVE" },
  { label: "Inactive", value: "INACTIVE" },
];
