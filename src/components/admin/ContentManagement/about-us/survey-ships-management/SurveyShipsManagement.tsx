"use client";

import { useState } from "react";
import { useGet } from "@/src/hooks/useGet";
import CreateUpdateSurveyShips from "./Form/CreateUpdateSurveyShips";
import { ISurveyShipsManagement } from "./types";
import SurveyShipsPreview from "./SurveyShipsPreview";
import SurveyShipsPreviewSkeleton from "./Skeleton/SurveyShipsPreviewSkeleton";

const DUMMY_SURVEY_SHIPS_DATA: ISurveyShipsManagement = {
  id: "dummy-123",
  title: "Our Survey Ships",
  subTitle: "State-of-the-art hydrographic survey vessels of Bangladesh Navy",
  shipTypes: [
    "Hydrographic Survey Vessel",
    "Research Vessel",
    "Patrol Vessel",
    "Training Ship",
  ],
  surveyShips: [
    {
      image:
        "https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?w=800",
      isActive: true,
      name: "BNS Anusandhani",
      type: "Hydrographic Survey Vessel",
      description:
        "BNS Anusandhani is the primary hydrographic survey vessel of Bangladesh Navy, equipped with state-of-the-art survey equipment for coastal and deep-sea surveys.",
      basicInformation: {
        length: "58.5 m",
        beam: "10.2 m",
        draft: "3.5 m",
        crew: "65",
      },
      surveyEquipment: [
        "Multibeam Echosounder",
        "Single Beam Echosounder",
        "Sub-bottom Profiler",
        "DGPS Navigation System",
      ],
      detailsLink: "",
    },
  ],
};

const SurveyShipsManagement = () => {
  const [isEditMode, setIsEditMode] = useState(false);

  const { data, isLoading } = useGet<ISurveyShipsManagement>(`/survey-ships`, [
    "survey-ships",
  ]);

  const surveyShipsData = data?.data || DUMMY_SURVEY_SHIPS_DATA;

  if (isLoading) {
    return <SurveyShipsPreviewSkeleton />;
  }

  if (surveyShipsData && !isEditMode) {
    return (
      <SurveyShipsPreview
        data={surveyShipsData}
        onEdit={() => setIsEditMode(true)}
      />
    );
  }

  return (
    <CreateUpdateSurveyShips
      initialValues={surveyShipsData}
      onSuccess={() => setIsEditMode(false)}
      onCancel={() => setIsEditMode(false)}
    />
  );
};

export default SurveyShipsManagement;
