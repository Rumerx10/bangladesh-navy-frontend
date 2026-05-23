export enum CourseCategory {
  HYDROGRAPHY = "Hydrography",
  OCEANOGRAPHY = "Oceanography",
  CARTOGRAPHY = "Cartography",
  GIS = "GIS & Remote Sensing",
  MARITIME_LAW = "Maritime Law",
}

export interface ICoursePlanStep {
  week: number;
  title: string;
  description: string;
}

export interface ICourse {
  id: string;
  slug: string;
  title: string;
  category: CourseCategory;
  duration: string;
  image: string;
  shortDescription: string;
  longDescription: string;
  learningOutcomes: string[];
  coursePlan: ICoursePlanStep[];
  price?: number; // Optional, maybe some are free
  instructor?: string;
  about?: string; // Optional about paragraph for the school/course
}
