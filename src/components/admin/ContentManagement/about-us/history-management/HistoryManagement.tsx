"use client";

import { useState } from "react";
import { useGet } from "@/src/hooks/useGet";
import CreateUpdateHistoryManagement from "./Form/CreateUpdateHistoryManagement";
import { IHistoryManagement } from "./types";
import HistoryPreview from "./HistoryPreview";
import HistoryPreviewSkeleton from "./Skeleton/HistoryPreviewSkeleton";

const HistoryManagement = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const { data, isLoading } = useGet<IHistoryManagement | null>("/history", [
    "history-management",
  ]);
  const historyData = data?.data;

  if (isLoading) {
    return <HistoryPreviewSkeleton />;
  }

  if (historyData && !isEditMode) {
    return (
      <HistoryPreview data={historyData} onEdit={() => setIsEditMode(true)} />
    );
  }

  return (
    <CreateUpdateHistoryManagement
      initialValues={historyData || undefined}
      onSuccess={() => setIsEditMode(false)}
      onCancel={() => setIsEditMode(false)}
    />
  );
};

export default HistoryManagement;
