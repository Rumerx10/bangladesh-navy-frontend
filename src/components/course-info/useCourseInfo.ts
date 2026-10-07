"use client";

import { useGet } from "@/src/hooks/useGet";
import { ICourseInfo } from "./types";

/** Single source of truth for the endpoint and cache key. */
export const COURSE_INFO_ENDPOINT = "/course-info";
export const COURSE_INFO_QUERY_KEY = ["course-info"];

/**
 * The copy the public courses page shipped with. It is the fallback while
 * `/course-info` has no record yet, and the seed the admin editor opens with so
 * the first save starts from what visitors are already seeing. Bangla is left
 * empty — it is optional and only rendered once someone fills it in.
 */
export const DEFAULT_COURSE_INFO: ICourseInfo = {
  titleEn: "Courses",
  titleBn: "",
  introductionEn:
    "BN Hydrographic Institute offers professional courses in hydrography, oceanography and related marine sciences, designed to meet national requirements while maintaining international standards.",
  introductionBn: "",
  courseSequenceEn: [
    "Long Hydrographic Cat-A Course",
    "Basic Hydrographic Cat-B Course",
    "Other Courses",
  ],
  courseSequenceBn: [],
  sections: [
    {
      titleEn: "Long Hydrographic (Cat A) Course",
      titleBn: "",
      descriptionEn:
        "The institute received approval in 2025 to conduct the prestigious Category A course, an honor held by only a limited number of institutions across Asia. The Institute is being affiliated under Bangladesh Maritime University, so that Cat A students can also obtain an MSc in Hydrography degree.",
      descriptionBn: "",
    },
    {
      titleEn: "Basic Hydrographic (Cat B) Course",
      titleBn: "",
      descriptionEn:
        "In 2005, the institute achieved a significant milestone by obtaining international accreditation from the International Board on Standards of Competence for Hydrographic Surveyors and Nautical Cartographers (IBSC) to conduct Category B courses. As of 2025, the institute has successfully completed 19 Category B courses, demonstrating its sustained commitment to excellence.",
      descriptionBn: "",
    },
    {
      titleEn: "Other Courses",
      titleBn: "",
      descriptionEn:
        "The institute also conducts professional training for Survey Recorders, short courses, workshops and refresher programmes on modern hydrographic technologies and software. These programmes ensure participants remain aligned with international standards and continuously enhance their survey capabilities.",
      descriptionBn: "",
    },
  ],
};

/** The API may hand back `null` for an untouched list — the UI always maps. */
const toArray = <T>(value?: T[] | null) => (Array.isArray(value) ? value : []);

/**
 * Loads the single course-info record. `isUsingDefaults` tells the UI it is
 * looking at the fallback copy rather than a saved record.
 */
export const useCourseInfo = () => {
  const { data, isLoading, isError } = useGet<ICourseInfo>(
    COURSE_INFO_ENDPOINT,
    COURSE_INFO_QUERY_KEY
  );

  const record = data?.data;
  const hasRecord = !!record?.id;

  return {
    courseInfo: hasRecord
      ? {
          ...record,
          courseSequenceEn: toArray(record.courseSequenceEn),
          courseSequenceBn: toArray(record.courseSequenceBn),
          sections: toArray(record.sections),
        }
      : DEFAULT_COURSE_INFO,
    isUsingDefaults: !hasRecord,
    isLoading,
    isError,
  };
};
