/**
 * BN Hydrographic Institute alumni — shared between the public listing
 * (src/components/alumni) and the admin panel
 * (src/components/admin/training-courses/alumni).
 *
 * A member belongs to exactly one batch (src/components/batches/types.ts),
 * which in turn belongs to exactly one course
 * (src/components/courses/types.ts); the public page renders one collapsible
 * card per course, with the batches beneath it.
 */

export type AlumniStatus = "ACTIVE" | "INACTIVE";

/** One roster row — mirrors the Ser / P.No / Rank & Name / Org / Remarks table. */
export interface IAlumniMember {
  id: string;
  batchId: string;
  /** "Ser" in the source document. 1-based, unique within a batch. */
  serial: number;
  /** "P. No" — the officer's personal number. */
  pNo?: string | null;
  /** Full "Rank & Name" line, e.g. "Instr Cdre M Jashim Uddin, (H1) (Rtd)". */
  rankAndName: string;
  /** "BN", "BIWTA", "Coast Guard", … */
  organization?: string | null;
  /** "Present Rank", "Rtd", "Change Branch", … */
  remarks?: string | null;
  status: AlumniStatus;
  createdAt?: string;
  updatedAt?: string;
}

/** One batch within a `GET /alumni-members/tree` course node. */
export interface IAlumniBatchGroup {
  id: string;
  name: string;
  /** ISO 8601, nullable — older batches have no recorded dates. */
  startDate?: string | null;
  endDate?: string | null;
  serial: number;
  totalMembers: number;
  members: IAlumniMember[];
}

/**
 * One node of `GET /alumni-members/tree` — a course with its batches (and
 * each batch's roster) attached. This is the public listing's unit of display.
 */
export interface IAlumniCourseGroup {
  id: string;
  name: string;
  duration?: string | null;
  serial: number;
  totalMembers: number;
  batches: IAlumniBatchGroup[];
}

/** `ALL` is a filter-only value — never stored or sent. */
export type AlumniCourseFilterValue = "ALL" | string;

export const ALUMNI_STATUS_OPTIONS: { label: string; value: AlumniStatus }[] = [
  { label: "Active", value: "ACTIVE" },
  { label: "Inactive", value: "INACTIVE" },
];

/** Suggestions for the free-text organization field in the admin roster editor. */
export const ORGANIZATION_SUGGESTIONS = [
  "BN",
  "BIWTA",
  "Bangladesh Coast Guard",
  "Chittagong Port Authority",
  "Mongla Port Authority",
  "Bangladesh Army",
  "Bangladesh Air Force",
];

/** Suggestions for the free-text remarks field. */
export const REMARKS_SUGGESTIONS = [
  "Present Rank",
  "Rtd",
  "Change Branch",
  "On Deputation",
];
