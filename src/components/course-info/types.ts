/**
 * Narrative copy at the top of the public courses page
 * (`/training-courses/courses`) — heading, introduction, the "Course Sequence"
 * list and one description block per course category.
 *
 * Served from the singleton `/course-info` record: `GET` returns the one row,
 * `POST` upserts it (there is no PATCH — posting again overwrites). The
 * statistics table below this copy is a separate model, see
 * `src/components/course-statistics/types.ts`.
 */

export interface ICourseInfoSection {
  titleEn: string;
  titleBn?: string | null;
  descriptionEn: string;
  descriptionBn?: string | null;
}

export interface ICourseInfo {
  id?: string;
  titleEn: string;
  titleBn?: string | null;
  introductionEn: string;
  introductionBn?: string | null;
  /** Ordered list rendered in the "Course Sequence" card. */
  courseSequenceEn: string[];
  courseSequenceBn?: string[] | null;
  /** Long-form blocks, one per course category. */
  sections: ICourseInfoSection[];
  createdAt?: string;
  updatedAt?: string;
}
