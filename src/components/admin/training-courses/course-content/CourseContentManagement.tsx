"use client";

import { useState } from "react";
import { useCourseInfo } from "@/src/components/course-info/useCourseInfo";
import CourseContentPreview from "./CourseContentPreview";
import CourseContentPreviewSkeleton from "./Skeleton/CourseContentPreviewSkeleton";
import CreateUpdateCourseContent from "./Form/CreateUpdateCourseContent";

/**
 * Narrative copy for the public courses page, backed by the singleton
 * `/course-info` record. The statistics table that sits below this copy is a
 * separate feature — Training & Courses → Courses.
 */
const CourseContentManagement = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const { courseInfo, isUsingDefaults, isLoading } = useCourseInfo();

  if (isLoading) return <CourseContentPreviewSkeleton />;

  if (!isEditMode) {
    return (
      <CourseContentPreview
        data={courseInfo}
        isUsingDefaults={isUsingDefaults}
        onEdit={() => setIsEditMode(true)}
      />
    );
  }

  return (
    <CreateUpdateCourseContent
      initialValues={courseInfo}
      isEditMode={!isUsingDefaults}
      onSuccess={() => setIsEditMode(false)}
      onCancel={() => setIsEditMode(false)}
    />
  );
};

export default CourseContentManagement;
