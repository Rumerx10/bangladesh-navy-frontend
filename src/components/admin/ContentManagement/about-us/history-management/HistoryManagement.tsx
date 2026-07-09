"use client";

import { useState } from "react";
import { useGet } from "@/src/hooks/useGet";
import CreateUpdateHistoryManagement from "./Form/CreateUpdateHistoryManagement";
import { IHistoryManagement } from "./types";
import HistoryPreview from "./HistoryPreview";
import HistoryPreviewSkeleton from "./Skeleton/HistoryPreviewSkeleton";

const DUMMY_HISTORY_DATA: IHistoryManagement = {
  id: "dummy-123",
  title: "History of Bangladesh Navy",
  subTitle: "A legacy of maritime excellence and service to the nation",
  image: "https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?w=800",
  description:
    "The Bangladesh Navy has a rich and proud history rooted in the liberation struggle of 1971. From humble beginnings, it has grown into a modern, multi-dimensional naval force committed to safeguarding the nation's maritime interests.",
  keyMilestones: [
    {
      year: "1971",
      description:
        "Bangladesh Navy was established during the Liberation War. Naval personnel played a crucial role in the guerrilla naval operations known as Operation Jackpot, which crippled Pakistani supply lines.",
    },
    {
      year: "1996",
      description:
        "Launch of the Hydro Bangla Project-1 in collaboration with France, transitioning the Navy from conventional analogue survey methods to modern digital hydrographic systems.",
    },
  ],
  timelineItems: [
    {
      id: 1,
      period: "1996–2000",
      title: "Digital Transformation: Hydro Bangla Project-1",
      icon: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=100",
      summary:
        "A landmark collaboration with the French government in 1996 under the 'Hydro Bangla Project-1' enabled the Navy to transition from conventional analogue survey methods to modern digital surveying systems.",
      highlights: [
        "Partnership with the French government",
        "Transition to digital surveying systems",
        "Modern hydrographic capability established",
      ],
      note: "This project marked a paradigm shift—transforming Bangladesh Navy hydrography from a manual discipline into a technology-driven capability.",
    },
  ],
};

const HistoryManagement = () => {
  const [isEditMode, setIsEditMode] = useState(false);

  const { data, isLoading } = useGet<IHistoryManagement>(
    `/history-management`,
    ["history-management"]
  );

  const historyData = data?.data || DUMMY_HISTORY_DATA;

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
      initialValues={historyData}
      onSuccess={() => setIsEditMode(false)}
      onCancel={() => setIsEditMode(false)}
    />
  );
};

export default HistoryManagement;
