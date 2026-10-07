"use client";

import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, Resolver, useForm } from "react-hook-form";
import { usePost } from "@/src/hooks/usePost";
import { ICourseInfo } from "@/src/components/course-info/types";
import {
  COURSE_INFO_ENDPOINT,
  COURSE_INFO_QUERY_KEY,
} from "@/src/components/course-info/useCourseInfo";
import {
  courseContentSchema,
  CourseContentFormValues,
} from "../Schema/courseContentSchema";
import CourseContentForm from "./CourseContentForm";

interface CreateUpdateCourseContentProps {
  initialValues?: ICourseInfo;
  /** False while the form is seeded with the fallback copy — first save creates. */
  isEditMode?: boolean;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const CreateUpdateCourseContent = ({
  initialValues,
  isEditMode = false,
  onSuccess,
  onCancel,
}: CreateUpdateCourseContentProps) => {
  const queryClient = useQueryClient();

  const methods = useForm<CourseContentFormValues>({
    resolver: yupResolver(
      courseContentSchema
    ) as Resolver<CourseContentFormValues>,
    defaultValues: {
      titleEn: initialValues?.titleEn || "",
      titleBn: initialValues?.titleBn || "",
      introductionEn: initialValues?.introductionEn || "",
      introductionBn: initialValues?.introductionBn || "",
      courseSequenceEn: initialValues?.courseSequenceEn || [],
      courseSequenceBn: initialValues?.courseSequenceBn || [],
      sections: (initialValues?.sections || []).map((section) => ({
        titleEn: section.titleEn || "",
        titleBn: section.titleBn || "",
        descriptionEn: section.descriptionEn || "",
        descriptionBn: section.descriptionBn || "",
      })),
    },
  });

  /**
   * `/course-info` is a singleton upsert — POST both creates the record and
   * overwrites it, so there is no PATCH and no id in the URL.
   */
  const {
    mutate: saveCourseInfo,
    isPending,
    error,
    reset: resetError,
  } = usePost<ICourseInfo>(
    COURSE_INFO_ENDPOINT,
    (saved) => {
      // The upsert echoes back the stored record. Seeding the cache with it
      // means the preview renders what the API actually kept rather than what
      // was typed, so a field the API drops shows up instead of reading as a
      // clean success. `usePost` has already invalidated the key, so the
      // background refetch still confirms this against a fresh GET.
      if (saved?.id) {
        queryClient.setQueryData(COURSE_INFO_QUERY_KEY, { data: saved });
      }

      toast.success(
        isEditMode
          ? "Course content updated successfully!"
          : "Course content saved successfully!"
      );
      onSuccess?.();
    },
    [COURSE_INFO_QUERY_KEY]
  );

  // Bangla is sent even when blank: the upsert overwrites the stored record, so
  // an omitted field would quietly keep whatever was saved before.
  const onSubmit = (values: CourseContentFormValues) => {
    saveCourseInfo({
      data: {
        titleEn: values.titleEn.trim(),
        titleBn: values.titleBn?.trim() || "",
        introductionEn: values.introductionEn.trim(),
        introductionBn: values.introductionBn?.trim() || "",
        courseSequenceEn: values.courseSequenceEn,
        courseSequenceBn: values.courseSequenceBn || [],
        sections: values.sections.map((section) => ({
          titleEn: section.titleEn.trim(),
          titleBn: section.titleBn?.trim() || "",
          descriptionEn: section.descriptionEn.trim(),
          descriptionBn: section.descriptionBn?.trim() || "",
        })),
      },
    });
  };

  const handleCancel = () => {
    resetError();
    methods.reset();
    onCancel?.();
  };

  return (
    <FormProvider {...methods}>
      <CourseContentForm
        isEditMode={isEditMode}
        onSubmit={onSubmit}
        isPending={isPending}
        error={error}
        onCancel={handleCancel}
      />
    </FormProvider>
  );
};

export default CreateUpdateCourseContent;
