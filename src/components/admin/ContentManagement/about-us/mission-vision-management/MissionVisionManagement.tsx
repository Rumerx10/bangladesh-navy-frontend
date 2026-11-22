"use client";

import { useState } from "react";
import { useMissionVision } from "@/src/components/mission-vision/useMissionVision";
import MissionVisionPreview from "./MissionVisionPreview";
import MissionVisionPreviewSkeleton from "./Skeleton/MissionVisionPreviewSkeleton";
import CreateUpdateMissionVision from "./Form/CreateUpdateMissionVision";

const MissionVisionManagement = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const { missionVision, isUsingDefaults, isLoading } = useMissionVision();

  if (isLoading) return <MissionVisionPreviewSkeleton />;

  if (!isEditMode) {
    return (
      <MissionVisionPreview
        data={missionVision}
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
