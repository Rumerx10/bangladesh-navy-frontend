"use client";

import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, Resolver, useForm } from "react-hook-form";
import { usePatch } from "@/src/hooks/usePatch";
import { usePost } from "@/src/hooks/usePost";
import {
  INSTITUTE_ENDPOINT,
  INSTITUTE_QUERY_KEY,
} from "../useTrainingInstitute";
import { IInstituteManagement } from "../types";
import {
  instituteSchema,
  InstituteSchemaForm,
} from "../Schema/instituteSchema";
import InstituteForm from "./InstituteForm";

interface CreateUpdateInstituteProps {
  initialValues?: IInstituteManagement;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const CreateUpdateInstitute = ({
  initialValues,
  onSuccess,
  onCancel,
}: CreateUpdateInstituteProps) => {
  const isEditMode = !!initialValues?.id;

  const methods = useForm<InstituteSchemaForm>({
    resolver: yupResolver(instituteSchema) as Resolver<InstituteSchemaForm>,
    defaultValues: {
      title: initialValues?.title || "",
      subTitle: initialValues?.subTitle || "",
      aboutParagraphs: initialValues?.aboutParagraphs || [],
      visionTitle: initialValues?.visionTitle || "",
      visionDescription: initialValues?.visionDescription || "",
      missionTitle: initialValues?.missionTitle || "",
      missionPoints: initialValues?.missionPoints || [],
      trainingOverviewTitle: initialValues?.trainingOverviewTitle || "",
      trainingOverviewParagraphs:
        initialValues?.trainingOverviewParagraphs || [],
    },
  });

  const {
    mutate: createInstitute,
    isPending: isCreating,
    error: createError,
  } = usePost<IInstituteManagement>(INSTITUTE_ENDPOINT, () => {
    toast.success("Institute content saved successfully!");
    onSuccess?.();
  }, [INSTITUTE_QUERY_KEY]);

  const {
    mutate: updateInstitute,
    isPending: isUpdating,
    error: updateError,
  } = usePatch<IInstituteManagement>(
    () => {
      toast.success("Institute content updated successfully!");
      onSuccess?.();
    },
    [INSTITUTE_QUERY_KEY],
    INSTITUTE_ENDPOINT
  );

  const onSubmit = (values: InstituteSchemaForm) => {
    if (isEditMode && initialValues?.id) {
      updateInstitute({
        url: `${INSTITUTE_ENDPOINT}/${initialValues.id}`,
        data: values,
      });
    } else {
      createInstitute({ endpoint: INSTITUTE_ENDPOINT, data: values });
    }
  };

  const handleCancel = () => {
    methods.reset();
    onCancel?.();
  };

  return (
    <FormProvider {...methods}>
      <InstituteForm
        isEditMode={isEditMode}
        onSubmit={onSubmit}
        isPending={isCreating || isUpdating}
        error={createError || updateError}
        onCancel={handleCancel}
      />
    </FormProvider>
  );
};

export default CreateUpdateInstitute;
