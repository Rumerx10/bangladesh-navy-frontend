"use client";

import { usePost } from "@/src/hooks/usePost";
import { IBiographyManagement } from "../types";
import { yupResolver } from "@hookform/resolvers/yup";
import BiographyManagementForm from "./BiographyManagementForm";
import { FormProvider, Resolver, useForm } from "react-hook-form";
import {
  BiographyManagementSchemaForm,
  biographyManagementSchema,
} from "../Schema/biographyManagementSchema";

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
  const isEditMode = !!initialValues?.id;

  const methods = useForm<BiographyManagementSchemaForm>({
    resolver: yupResolver(biographyManagementSchema) as Resolver<BiographyManagementSchemaForm>,
    defaultValues: {
      nameEn: initialValues?.nameEn || "",
      nameBn: initialValues?.nameBn || "",
      designationEn: initialValues?.designationEn || "",
      designationBn: initialValues?.designationBn || "",
      messageEn: initialValues?.messageEn || "",
      messageBn: initialValues?.messageBn || "",
      image: initialValues?.imageUrl || undefined,
      status: initialValues?.status || "ACTIVE",
    },
  });

  const {
    mutate: submitBiography,
    isPending,
    error,
    reset: resetError,
  } = usePost(
    "/biography",
    () => {
      onSuccess?.();
    },
    [["biography-management"]]
  );

  const handleCancel = () => {
    resetError();
    methods.reset();
    onCancel?.();
  };

  const onSubmit = (data: BiographyManagementSchemaForm) => {
    const formData = new FormData();
    formData.append("nameEn", data.nameEn);
    formData.append("nameBn", data.nameBn);
    formData.append("designationEn", data.designationEn);
    formData.append("designationBn", data.designationBn || "");
    formData.append("messageEn", data.messageEn);
    formData.append("messageBn", data.messageBn);
    formData.append("status", data.status);

    if (data.image instanceof File) {
      formData.append("image", data.image);
    }

    submitBiography({ data: formData });
  };

  return (
    <FormProvider {...methods}>
      <BiographyManagementForm
        isEditMode={isEditMode}
        onSubmit={onSubmit}
        isPending={isPending}
        onCancel={handleCancel}
        error={error}
      />
    </FormProvider>
  );
};

export default CreateUpdateBiographyManagement;