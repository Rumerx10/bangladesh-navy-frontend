"use client";

import { useState } from "react";
import { useGet } from "@/src/hooks/useGet";
import CreateUpdateMissionVision from "./Form/CreateUpdateMissionVision";
import { IMissionVisionManagement } from "./types";
import MissionVisionPreview from "./MissionVisionPreview";
import MissionVisionPreviewSkeleton from "./Skeleton/MissionVisionPreviewSkeleton";

const DUMMY_MISSION_VISION_DATA: IMissionVisionManagement = {
  id: "dummy-123",
  title: "Our Mission & Vision",
  subTitle: "Guiding principles of Bangladesh Navy",
  vision: {
    title: "Our Vision",
    description:
      "To be a world-class navy by 2041, capable of protecting Bangladesh's maritime interests, supporting national development, and contributing to regional peace and security.",
  },
  mission: {
    title: "Our Mission",
    description:
      "To maintain a credible naval force that safeguards the nation's sovereignty, ensures maritime security, facilitates economic prosperity through blue economy, and contributes to disaster relief and humanitarian operations.",
  },
};

const MissionVisionManagement = () => {
  const [isEditMode, setIsEditMode] = useState(false);

  const { data, isLoading } = useGet<IMissionVisionManagement>(
    `/mission-vision`,
    ["mission-vision"]
  );

  const missionVisionData = data?.data || DUMMY_MISSION_VISION_DATA;

  if (isLoading) {
    return <MissionVisionPreviewSkeleton />;
  }

  if (missionVisionData && !isEditMode) {
    return (
      <MissionVisionPreview
        data={missionVisionData}
        onEdit={() => setIsEditMode(true)}
      />
    );
  }

  return (
    <CreateUpdateMissionVision
      initialValues={missionVisionData}
      onSuccess={() => setIsEditMode(false)}
      onCancel={() => setIsEditMode(false)}
    />
  );
};

export default MissionVisionManagement;
