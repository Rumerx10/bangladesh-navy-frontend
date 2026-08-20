"use client";

import { useGet } from "@/src/hooks/useGet";
import { ICoursesManagement } from "./types";

/** Single source of truth for the endpoint and cache key. */
export const COURSES_CONTENT_ENDPOINT = "/training-courses-content";
export const COURSES_CONTENT_QUERY_KEY = ["training-courses-content"];

/**
 * Mirrors what `/training-courses/courses` currently renders as hardcoded copy.
 * It is the seed the editor opens with until the endpoint is live — delete this
 * block once `/training-courses-content` returns a record.
 */
export const DEFAULT_COURSES_CONTENT: ICoursesManagement = {
  title: "Courses",
  introduction:
    "BN Hydrographic Institute offers professional courses in hydrography, oceanography and related marine sciences, designed to meet national requirements while maintaining international standards.",
  courseSequence: [
    "Long Hydrographic Cat-A Course",
    "Basic Hydrographic Cat-B Course",
    "Other Courses",
  ],
  sections: [
    {
      title: "Long Hydrographic (Cat A) Course",
      description:
        "The institute received approval in 2025 to conduct the prestigious Category A course, an honor held by only a limited number of institutions across Asia. The Institute is being affiliated under Bangladesh Maritime University, so that Cat A students can also obtain an MSc in Hydrography degree.",
    },
    {
      title: "Basic Hydrographic (Cat B) Course",
      description:
        "In 2005, the institute achieved a significant milestone by obtaining international accreditation from the International Board on Standards of Competence for Hydrographic Surveyors and Nautical Cartographers (IBSC) to conduct Category B courses. As of 2025, the institute has successfully completed 19 Category B courses, demonstrating its sustained commitment to excellence.",
    },
    {
      title: "Other Courses",
      description:
        "The institute also conducts professional training for Survey Recorders, short courses, workshops and refresher programmes on modern hydrographic technologies and software. These programmes ensure participants remain aligned with international standards and continuously enhance their survey capabilities.",
    },
  ],
  statisticsTitle: "Course Statistics",
  statistics: [
    {
      course: "Long Hydrographic (Cat A)",
      conducted: "—",
      duration: "44 weeks",
      bn: "—",
      otherMaritimeOrg: "—",
      overseas: "—",
      totalTrainees: "—",
      remarks: "Officers",
    },
    {
      course: "Basic Hydrographic (Cat B)",
      conducted: "19",
      duration: "24 weeks",
      bn: "86",
      otherMaritimeOrg: "20",
      overseas: "27",
      totalTrainees: "133",
      remarks: "Officers",
    },
    {
      course: "SR-I",
      conducted: "25",
      duration: "22 weeks",
      bn: "208",
      otherMaritimeOrg: "—",
      overseas: "01",
      totalTrainees: "209",
      remarks: "Sailors",
    },
    {
      course: "SR-II",
      conducted: "29",
      duration: "22 weeks",
      bn: "382",
      otherMaritimeOrg: "—",
      overseas: "01",
      totalTrainees: "383",
      remarks: "Sailors",
    },
    {
      course: "SR-III",
      conducted: "39",
      duration: "22 weeks",
      bn: "459",
      otherMaritimeOrg: "06",
      overseas: "—",
      totalTrainees: "465",
      remarks: "Sailors",
    },
    {
      course: "Echo Sounder Data Acquisition and Processing",
      conducted: "06",
      duration: "02 weeks",
      bn: "61",
      otherMaritimeOrg: "—",
      overseas: "—",
      totalTrainees: "61",
      remarks: "Officers and Sailors",
    },
  ],
};

/**
 * Loads the single courses-content record. `isUsingDefaults` tells the UI the
 * form is seeded with the hardcoded copy rather than a saved record, so the
 * first save has to POST instead of PATCH.
 */
export const useTrainingCourses = () => {
  const { data, isLoading, isError } = useGet<ICoursesManagement>(
    COURSES_CONTENT_ENDPOINT,
    COURSES_CONTENT_QUERY_KEY
  );

  const record = data?.data;
  const isUsingDefaults = !record?.id;

  return {
    coursesContent: record?.id ? record : DEFAULT_COURSES_CONTENT,
    isUsingDefaults,
    isLoading,
    isError,
  };
};
