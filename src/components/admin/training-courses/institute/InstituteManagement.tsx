"use client";

import { useState } from "react";
import { useAboutInstitute } from "@/src/components/about-institute/useAboutInstitute";
import CreateUpdateInstitute from "./Form/CreateUpdateInstitute";
import InstitutePreview from "./InstitutePreview";
import InstitutePreviewSkeleton from "./Skeleton/InstitutePreviewSkeleton";

/**
 * About / vision / mission / training-overview copy for the public
 * `/training-courses` page, backed by the singleton `/about-institute` record.
 */
const InstituteManagement = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const { aboutInstitute, isUsingDefaults, isLoading } = useAboutInstitute();

  if (isLoading) return <InstitutePreviewSkeleton />;

  if (!isEditMode) {
    return (
      <InstitutePreview
        data={aboutInstitute}
        isUsingDefaults={isUsingDefaults}
        onEdit={() => setIsEditMode(true)}
      />
    );
  }

  return (
    <CreateUpdateInstitute
      initialValues={aboutInstitute}
      isEditMode={!isUsingDefaults}
      onSuccess={() => setIsEditMode(false)}
      onCancel={() => setIsEditMode(false)}
    />
  );
};

export default InstituteManagement;
