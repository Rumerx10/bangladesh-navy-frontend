"use client";

import { useState } from "react";
import { useGet } from "@/src/hooks/useGet";
import CreateUpdateBiographyManagement from "./Form/CreateUpdateBiographyManagement";
import { IBiographyManagement } from "./types";
import BiographyPreview from "./BiographyPreview";
import BiographyPreviewSkeleton from "./Skeleton/BiographyPreviewSkeleton";

const DUMMY_BIOGRAPHY_DATA: IBiographyManagement = {
  id: "dummy-123",
  title: "About Our Commander",
  name: "Vice Admiral John Doe",
  designation: "Chief of Naval Staff",
  description:
    "A distinguished naval officer with over 30 years of service dedicated to maritime security and naval excellence. Known for outstanding leadership and strategic vision in safeguarding national maritime interests.",
};

const BiographyManagement = () => {
  const [isEditMode, setIsEditMode] = useState(false);

  const { data, isLoading } = useGet<IBiographyManagement>(
    `/biography-management`,
    ["biography-management"]
  );

  const biographyData = data?.data || DUMMY_BIOGRAPHY_DATA;

  if (isLoading) {
    return <BiographyPreviewSkeleton />;
  }

  if (biographyData && !isEditMode) {
    return (
      <BiographyPreview
        data={biographyData}
        onEdit={() => setIsEditMode(true)}
      />
    );
  }

  return (
    <CreateUpdateBiographyManagement
      initialValues={biographyData}
      onSuccess={() => setIsEditMode(false)}
      onCancel={() => setIsEditMode(false)}
    />
  );
};

export default BiographyManagement;
