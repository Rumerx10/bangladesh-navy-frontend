"use client";

import { useState } from "react";
import CreateUpdateCourses from "./Form/CreateUpdateCourses";
import CoursesPreview from "./CoursesPreview";
import CoursesPreviewSkeleton from "./Skeleton/CoursesPreviewSkeleton";
import { useTrainingCourses } from "./useTrainingCourses";

const CoursesManagement = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const { coursesContent, isUsingDefaults, isLoading } = useTrainingCourses();

  if (isLoading) return <CoursesPreviewSkeleton />;

  if (!isEditMode) {
    return (
      <CoursesPreview
        data={coursesContent}
        isUsingDefaults={isUsingDefaults}
        onEdit={() => setIsEditMode(true)}
      />
    );
  }

  return (
    <CreateUpdateCourses
      initialValues={coursesContent}
      onSuccess={() => setIsEditMode(false)}
      onCancel={() => setIsEditMode(false)}
    />
  );
};

export default CoursesManagement;
