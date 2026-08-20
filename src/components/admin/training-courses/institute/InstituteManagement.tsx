"use client";

import { useState } from "react";
import CreateUpdateInstitute from "./Form/CreateUpdateInstitute";
import InstitutePreview from "./InstitutePreview";
import InstitutePreviewSkeleton from "./Skeleton/InstitutePreviewSkeleton";
import { useTrainingInstitute } from "./useTrainingInstitute";

const InstituteManagement = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const { institute, isUsingDefaults, isLoading } = useTrainingInstitute();

  if (isLoading) return <InstitutePreviewSkeleton />;

  if (!isEditMode) {
    return (
      <InstitutePreview
        data={institute}
        isUsingDefaults={isUsingDefaults}
        onEdit={() => setIsEditMode(true)}
      />
    );
  }

  return (
    <CreateUpdateInstitute
      initialValues={institute}
      onSuccess={() => setIsEditMode(false)}
      onCancel={() => setIsEditMode(false)}
    />
  );
};

export default InstituteManagement;
