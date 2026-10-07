"use client";

import { useGet } from "@/src/hooks/useGet";
import { IMissionVision } from "./types";

/** Single source of truth for the endpoint and cache key. */
export const MISSION_VISION_ENDPOINT = "/mission-vision";
export const MISSION_VISION_QUERY_KEY = ["mission-vision"];

/**
 * The copy the public page shipped with (previously `visionMissionItems` in
 * src/data/aboutData.ts). It is the fallback while `/mission-vision` has no
 * record, and the seed the admin editor opens with so the first save starts
 * from what visitors are already seeing. Bangla is left empty — it is optional
 * and only rendered once someone fills it in.
 */
export const DEFAULT_MISSION_VISION: IMissionVision = {
  titleEn: "Vision & Mission",
  titleBn: "",
  subTitleEn: "Our guiding principles and strategic direction.",
  subTitleBn: "",
  missionTitleEn: "Our Mission",
  missionTitleBn: "",
  missionDescriptionEn:
    "Provide accurate and up-to-date Hydrographic, Oceanographic & Meteorological data through production of Charts & Publications for safe navigation and sustainable Marine activities.",
  missionDescriptionBn: "",
  visionTitleEn: "Our Vision",
  visionTitleBn: "",
  visionDescriptionEn:
    "To ensure safe & efficient marine activities for sustainable Bangladesh.",
  visionDescriptionBn: "",
};

/**
 * Loads the single mission & vision record. `isUsingDefaults` tells the UI it
 * is looking at the fallback copy rather than a saved record.
 */
export const useMissionVision = () => {
  const { data, isLoading, isError } = useGet<IMissionVision>(
    MISSION_VISION_ENDPOINT,
    MISSION_VISION_QUERY_KEY
  );

  const record = data?.data;
  const hasRecord = !!record?.id;

  return {
    missionVision: hasRecord ? record : DEFAULT_MISSION_VISION,
    isUsingDefaults: !hasRecord,
    isLoading,
    isError,
  };
};
