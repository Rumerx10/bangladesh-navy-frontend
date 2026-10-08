"use client";

import { useGet } from "@/src/hooks/useGet";
import { IAboutInstitute } from "./types";

/** Single source of truth for the endpoint and cache key. */
export const ABOUT_INSTITUTE_ENDPOINT = "/about-institute";
export const ABOUT_INSTITUTE_QUERY_KEY = ["about-institute"];

/**
 * The copy the public `/training-courses` page shipped with. It is the fallback
 * while `/about-institute` has no record, and the seed the admin editor opens
 * with so the first save starts from what visitors are already seeing. Bangla is
 * left empty — it is optional and only rendered once someone fills it in.
 */
export const DEFAULT_ABOUT_INSTITUTE: IAboutInstitute = {
  titleEn: "About BN Hydrographic Institute",
  titleBn: "",
  subTitleEn: "Established 04 May 1983 at BNS Issa Khan",
  subTitleBn: "",
  aboutParagraphsEn: [
    "BN Hydrographic Institute, formerly known as BN Hydrographic School, was established on 04 May 1983 at BNS ISSA KHAN with the objective of developing skilled hydrographic professionals. Initially offering Survey Recorder courses, the institute has progressively evolved into a specialized centre for hydrography, oceanography and nautical charting. As a dedicated training and research institution, the institute promotes professional excellence through high-quality instruction, practical training and continuous technical capacity development.",
    "The institute provides professional training to personnel from Bangladesh, maritime organizations and international participants. Training is conducted using advanced survey technologies, including multibeam and single beam echo sounders, side scan sonar, GPS/DGPS, Sub Bottom Profiler and other modern hydrographic systems, ensuring precise data collection, processing and analysis.",
  ],
  aboutParagraphsBn: [],
  visionTitleEn: "Vision",
  visionTitleBn: "",
  visionDescriptionEn:
    "To become a centre of excellence in hydrographic education, training and research, upholding internationally recognized standards and contributing to safe navigation and sustainable maritime development.",
  visionDescriptionBn: "",
  missionTitleEn: "Mission",
  missionTitleBn: "",
  missionPointsEn: [
    "Deliver high-quality training in hydrography and related disciplines.",
    "Develop competent professionals using modern technologies and methodologies.",
    "Support accurate hydrographic surveying and nautical chart production.",
    "Enhance the operational and technical capabilities of the Bangladesh Navy and the wider maritime sector.",
  ],
  missionPointsBn: [],
  trainingOverviewTitleEn: "Training Overview",
  trainingOverviewTitleBn: "",
  trainingOverviewParagraphsEn: [
    "All training is aligned with international standards, particularly those set by the IBSC, ensuring high-quality outcomes and preparing trainees to support safe navigation, accurate charting and sustainable maritime development.",
    "To avail training facilities at the institute for national participants, applications are coordinated through the Directorate of Naval Training at Naval Headquarters. Overseas participants are required to apply through the Armed Forces Division, Dhaka Cantonment.",
  ],
  trainingOverviewParagraphsBn: [],
};

/** The API may hand back `null` for an untouched list — the UI always maps. */
const toArray = (value?: string[] | null) =>
  Array.isArray(value) ? value : [];

/**
 * Loads the single about-institute record. `isUsingDefaults` tells the UI it is
 * looking at the fallback copy rather than a saved record.
 */
export const useAboutInstitute = () => {
  const { data, isLoading, isError } = useGet<IAboutInstitute>(
    ABOUT_INSTITUTE_ENDPOINT,
    ABOUT_INSTITUTE_QUERY_KEY
  );

  const record = data?.data;
  const hasRecord = !!record?.id;

  return {
    aboutInstitute: hasRecord
      ? {
          ...record,
          aboutParagraphsEn: toArray(record.aboutParagraphsEn),
          aboutParagraphsBn: toArray(record.aboutParagraphsBn),
          missionPointsEn: toArray(record.missionPointsEn),
          missionPointsBn: toArray(record.missionPointsBn),
          trainingOverviewParagraphsEn: toArray(
            record.trainingOverviewParagraphsEn
          ),
          trainingOverviewParagraphsBn: toArray(
            record.trainingOverviewParagraphsBn
          ),
        }
      : DEFAULT_ABOUT_INSTITUTE,
    isUsingDefaults: !hasRecord,
    isLoading,
    isError,
  };
};
