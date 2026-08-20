"use client";

import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, Resolver, useForm } from "react-hook-form";
import { usePatch } from "@/src/hooks/usePatch";
import { usePost } from "@/src/hooks/usePost";
import { ICoursesManagement } from "../types";
import { coursesSchema, CoursesSchemaForm } from "../Schema/coursesSchema";
import {
  COURSES_CONTENT_ENDPOINT,
  COURSES_CONTENT_QUERY_KEY,
} from "../useTrainingCourses";
import CoursesForm from "./CoursesForm";

interface CreateUpdateCoursesProps {
  initialValues?: ICoursesManagement;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const CreateUpdateCourses = ({
  initialValues,
  onSuccess,
  onCancel,
}: CreateUpdateCoursesProps) => {
  const isEditMode = !!initialValues?.id;

  const methods = useForm<CoursesSchemaForm>({
    resolver: yupResolver(coursesSchema) as Resolver<CoursesSchemaForm>,
    defaultValues: {
      title: initialValues?.title || "",
      introduction: initialValues?.introduction || "",
      courseSequence: initialValues?.courseSequence || [],
      sections: initialValues?.sections || [],
      statisticsTitle: initialValues?.statisticsTitle || "Course Statistics",
      statistics:
        initialValues?.statistics?.map((row) => ({
          ...row,
          remarks: row.remarks || "",
        })) || [],
    },
  });

  const {
    mutate: createCourses,
    isPending: isCreating,
    error: createError,
  } = usePost<ICoursesManagement>(COURSES_CONTENT_ENDPOINT, () => {
    toast.success("Courses content saved successfully!");
    onSuccess?.();
  }, [COURSES_CONTENT_QUERY_KEY]);

  const {
    mutate: updateCourses,
    isPending: isUpdating,
    error: updateError,
  } = usePatch<ICoursesManagement>(
    () => {
      toast.success("Courses content updated successfully!");
      onSuccess?.();
    },
    [COURSES_CONTENT_QUERY_KEY],
    COURSES_CONTENT_ENDPOINT
  );

  const onSubmit = (values: CoursesSchemaForm) => {
    if (isEditMode && initialValues?.id) {
      updateCourses({
        url: `${COURSES_CONTENT_ENDPOINT}/${initialValues.id}`,
        data: values,
      });
    } else {
      createCourses({ endpoint: COURSES_CONTENT_ENDPOINT, data: values });
    }
  };

  const handleCancel = () => {
    methods.reset();
    onCancel?.();
  };

  return (
    <FormProvider {...methods}>
      <CoursesForm
        isEditMode={isEditMode}
        onSubmit={onSubmit}
        isPending={isCreating || isUpdating}
        error={createError || updateError}
        onCancel={handleCancel}
      />
    </FormProvider>
  );
};

export default CreateUpdateCourses;
