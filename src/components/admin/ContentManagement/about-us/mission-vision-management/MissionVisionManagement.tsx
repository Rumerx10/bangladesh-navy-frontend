"use client";

import { useState } from "react";
import { useMissionVision } from "@/src/components/mission-vision/useMissionVision";
import MissionVisionPreview from "./MissionVisionPreview";
import MissionVisionPreviewSkeleton from "./Skeleton/MissionVisionPreviewSkeleton";
import CreateUpdateMissionVision from "./Form/CreateUpdateMissionVision";

/**
 * Heading, mission and vision copy for the public `/about/vision-mission`
 * page, backed by the singleton `/mission-vision` record.
 */
const MissionVisionManagement = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const { missionVision, isUsingDefaults, isLoading } = useMissionVision();

  if (isLoading) return <MissionVisionPreviewSkeleton />;

  if (!isEditMode) {
    return (
      <MissionVisionPreview
        data={missionVision}
        isUsingDefaults={isUsingDefaults}
        onEdit={() => setIsEditMode(true)}
      />
    );
  }

  return (
    <CreateUpdateMissionVision
      initialValues={missionVision}
      isEditMode={!isUsingDefaults}
      onSuccess={() => setIsEditMode(false)}
      onCancel={() => setIsEditMode(false)}
    />
  );
};

export default MissionVisionManagement;
