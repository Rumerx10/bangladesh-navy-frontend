/**
 * BN Hydrographic Institute alumni — shared between the public listing
 * (src/components/alumni) and the admin panel
 * (src/components/admin/training-courses/alumni).
 */

export type AlumniStatus = "ACTIVE" | "INACTIVE";

/**
 * A course type — "Basic Hydro", "Advanced Hydro", … Every batch belongs to
 * exactly one course, which is what the public page filters by.
 */
export interface IAlumniCourse {
  id: string;
  nameEn: string;
  nameBn?: string;
  status: AlumniStatus;
  createdAt?: string;
  updatedAt?: string;
}

/** One roster row — mirrors the Ser / P.No / Rank & Name / Org / Remarks table. */
export interface IAlumniMember {
  id?: string;
  /** "Ser" in the source document. 1-based, unique within a batch. */
  serial: number;
  /** "P. No" — the officer's personal number. */
  pNo?: string;
  /** Full "Rank & Name" line, e.g. "Cdre A K M Mostak Sherafullah, (H1), psc, BN". */
  rankName: string;
  /** "BN", "BIWTA", "Coast Guard", … */
  organization?: string;
  /** "Present Rank", "Rtd", "Change Branch", … */
  remarks?: string;
}

/** A single run of a course — "1st Basic Hydro", 08 Mar 1997 → 07 Aug 1997. */
export interface IAlumniBatch {
  id: string;
  /** 1, 2, 3 … rendered as "1st", "2nd", "3rd" and used for ordering. */
  batchNo: number;
  titleEn: string;
  titleBn?: string;
  /** ISO 8601. */
  startDate: string;
  /** ISO 8601. */
  endDate: string;
  descriptionEn?: string;
  status: AlumniStatus;
  alumniCourseId?: string;
  /** Populated by the API on read; absent on write payloads. */
  alumniCourse?: IAlumniCourse;
  members: IAlumniMember[];
  createdAt?: string;
  updatedAt?: string;
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
