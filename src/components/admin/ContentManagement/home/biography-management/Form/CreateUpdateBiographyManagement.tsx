"use client";

import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import BiographyManagementForm from "./BiographyManagementForm";
import {
  biographyManagementSchema,
  BiographyManagementSchemaForm,
} from "../Schema/biographyManagementSchema";
import { IBiographyManagement } from "../types";
import { usePost } from "@/src/hooks/usePost";
import { usePatch } from "@/src/hooks/usePatch";

interface CreateUpdateBiographyManagementProps {
  initialValues?: IBiographyManagement;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const CreateUpdateBiographyManagement = ({
  initialValues,
  onSuccess,
  onCancel,
}: CreateUpdateBiographyManagementProps) => {
  const isEditMode = !!initialValues?.title;

  const methods = useForm<BiographyManagementSchemaForm>({
    resolver: yupResolver(biographyManagementSchema),
    defaultValues: {
      title: initialValues?.title || "",
      name: initialValues?.name || "",
      designation: initialValues?.designation || "",
      description: initialValues?.description || "",
    },
  });

  const { mutate: createBiography, isPending: isCreating } = usePost<{
    data: IBiographyManagement;
  }>(
    "/biography-management",
    () => {
      onSuccess?.();
    },
    [["biography-management"]]
  );

  const { mutate: updateBiography, isPending: isUpdating } = usePatch<{
    data: IBiographyManagement;
  }>(
    () => {
      onSuccess?.();
    },
    [["biography-management"]],
    "/biography-management"
  );

  const isPending = isCreating || isUpdating;

  const onSubmit = (data: BiographyManagementSchemaForm) => {
    if (isEditMode && initialValues?.id) {
      updateBiography({
        url: `/biography-management/${initialValues.id}`,
        data,
      });
    } else {
      createBiography({
        endpoint: "/biography-management",
        data,
      });
    }
  };

  const handleCancel = () => {
    methods.reset();
    onCancel?.();
  };

  return (
    <FormProvider {...methods}>
      <BiographyManagementForm
        isEditMode={isEditMode}
        onSubmit={onSubmit}
        isPending={isPending}
        onCancel={handleCancel}
      />
    </FormProvider>
  );
};

export default CreateUpdateBiographyManagement;
