/**
 * Courses run by BN Hydrographic Institute. One record backs both the public
 * "Course Statistics" table (`/training-courses/courses`) and the course an
 * alumni member is grouped under (`/training-courses/alumni`).
 */

export type CourseStatus = "ACTIVE" | "INACTIVE";

export interface ICourse {
  id: string;
  name: string;
  /** How many times the course has been run to date. */
  coursesConducted?: number | null;
  /** Free text — "24 weeks". */
  duration?: string | null;
  /** ISO 8601, nullable — older courses have no recorded dates. */
  startDate?: string | null;
  endDate?: string | null;
  /** Trainee headcount by parent organization. */
  bn?: number | null;
  otherMaritimeOrg?: number | null;
  overseas?: number | null;
  totalTrainees?: number | null;
  /** "Officers", "Sailors", "Officers and Sailors", … */
  remarks?: string | null;
  /** Row order in the statistics table. */
  serial: number;
  status: CourseStatus;
  createdAt?: string;
  updatedAt?: string;
}

/** Column totals for the statistics table — calculated by the API. */
export interface ICourseTotals {
  coursesConducted: number;
  bn: number;
  otherMaritimeOrg: number;
  overseas: number;
  totalTrainees: number;
}

/** Shape of `GET /courses/list` — the public payload. */
export interface ICoursesListResponse {
  courses: ICourse[];
  totals: ICourseTotals;
}

export const COURSE_STATUS_OPTIONS: { label: string; value: CourseStatus }[] = [
  { label: "Active", value: "ACTIVE" },
  { label: "Inactive", value: "INACTIVE" },
];
