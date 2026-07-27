"use client";

import { useState } from "react";
import { useGet } from "@/src/hooks/useGet";
import { IBiographyManagement } from "./types";
import BiographyPreview from "./BiographyPreview";
import BiographyPreviewSkeleton from "./Skeleton/BiographyPreviewSkeleton";
import CreateUpdateBiographyManagement from "./Form/CreateUpdateBiographyManagement";

const BiographyManagement = () => {
  const [isEditMode, setIsEditMode] = useState(false);

  const { data, isLoading } = useGet<IBiographyManagement>(
    "/biography",
    ["biography-management"]
  );

  const biographyData = data?.data;

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