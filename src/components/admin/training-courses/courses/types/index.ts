export interface ICourseSection {
  title: string;
  description: string;
}

/**
 * Narrative copy for the public courses page. The "Course Statistics" table
 * below it is not part of this record — those rows are courses in their own
 * right (`/courses`, see src/components/courses/types.ts), edited on
 * Training & Courses → Alumni → Courses.
 */
export interface ICoursesManagement {
  id?: string;
  title: string;
  introduction: string;
  /** Ordered list rendered in the "Course Sequence" card. */
  courseSequence: string[];
  /** Long-form description blocks, one per course category. */
  sections: ICourseSection[];
}
