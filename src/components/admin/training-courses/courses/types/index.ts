export interface ICourseSection {
  title: string;
  description: string;
}

/** One row of the "Course Statistics" table on the public courses page. */
export interface ICourseStatistic {
  course: string;
  conducted: string;
  duration: string;
  bn: string;
  otherMaritimeOrg: string;
  overseas: string;
  totalTrainees: string;
  remarks?: string;
}

export interface ICoursesManagement {
  id?: string;
  title: string;
  introduction: string;
  /** Ordered list rendered in the "Course Sequence" card. */
  courseSequence: string[];
  /** Long-form description blocks, one per course category. */
  sections: ICourseSection[];
  statisticsTitle: string;
  statistics: ICourseStatistic[];
}
