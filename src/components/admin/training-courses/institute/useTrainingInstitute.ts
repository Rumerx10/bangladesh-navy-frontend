"use client";

import { useGet } from "@/src/hooks/useGet";
import { IInstituteManagement } from "./types";

/** Single source of truth for the endpoint and cache key. */
export const INSTITUTE_ENDPOINT = "/training-institute";
export const INSTITUTE_QUERY_KEY = ["training-institute"];

/**
 * Mirrors what `/training-courses` currently renders as hardcoded copy. It is
 * the seed the editor opens with until `/training-institute` returns a record —
 * delete this block once the endpoint is live.
 */
export const DEFAULT_INSTITUTE_CONTENT: IInstituteManagement = {
  title: "About BN Hydrographic Institute",
  subTitle: "Established 04 May 1983 at BNS Issa Khan",
  aboutParagraphs: [
    "BN Hydrographic Institute, formerly known as BN Hydrographic School, was established on 04 May 1983 at BNS ISSA KHAN with the objective of developing skilled hydrographic professionals. Initially offering Survey Recorder courses, the institute has progressively evolved into a specialized centre for hydrography, oceanography and nautical charting. As a dedicated training and research institution, the institute promotes professional excellence through high-quality instruction, practical training and continuous technical capacity development.",
    "The institute provides professional training to personnel from Bangladesh, maritime organizations and international participants. Training is conducted using advanced survey technologies, including multibeam and single beam echo sounders, side scan sonar, GPS/DGPS, Sub Bottom Profiler and other modern hydrographic systems, ensuring precise data collection, processing and analysis.",
  ],
  visionTitle: "Vision",
  visionDescription:
    "To become a centre of excellence in hydrographic education, training and research, upholding internationally recognized standards and contributing to safe navigation and sustainable maritime development.",
  missionTitle: "Mission",
  missionPoints: [
    "Deliver high-quality training in hydrography and related disciplines.",
    "Develop competent professionals using modern technologies and methodologies.",
    "Support accurate hydrographic surveying and nautical chart production.",
    "Enhance the operational and technical capabilities of the Bangladesh Navy and the wider maritime sector.",
  ],
  trainingOverviewTitle: "Training Overview",
  trainingOverviewParagraphs: [
    "All training is aligned with international standards, particularly those set by the IBSC, ensuring high-quality outcomes and preparing trainees to support safe navigation, accurate charting and sustainable maritime development.",
    "To avail training facilities at the institute for national participants, applications are coordinated through the Directorate of Naval Training at Naval Headquarters. Overseas participants are required to apply through the Armed Forces Division, Dhaka Cantonment.",
  ],
};

/**
 * Loads the single institute content record. `isUsingDefaults` tells the UI the
 * form is seeded with the hardcoded copy rather than a saved record, so the
 * first save has to POST instead of PATCH.
 */
export const useTrainingInstitute = () => {
  const { data, isLoading, isError } = useGet<IInstituteManagement>(
    INSTITUTE_ENDPOINT,
    INSTITUTE_QUERY_KEY
  );

  const record = data?.data;
  const isUsingDefaults = !record?.id;

  return {
    institute: record?.id ? record : DEFAULT_INSTITUTE_CONTENT,
    isUsingDefaults,
    isLoading,
    isError,
  };
};
