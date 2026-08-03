"use client";

import { useMutation } from "@tanstack/react-query";
import { FormProvider, Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import HistoryManagementForm from "./HistoryManagementForm";
import {
  historyManagementSchema,
  HistoryManagementSchemaForm,
} from "../Schema/historyManagementSchema";
import { IHistoryManagement } from "../types";
import { usePost } from "@/src/hooks/usePost";
import { axiosInstance } from "@/src/helpers/axios/axiosInstance";

interface CreateUpdateHistoryManagementProps {
  initialValues?: IHistoryManagement;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const CreateUpdateHistoryManagement = ({
  initialValues,
  onSuccess,
  onCancel,
}: CreateUpdateHistoryManagementProps) => {
  const isEditMode = !!initialValues?.id;

  const methods = useForm<HistoryManagementSchemaForm>({
    resolver: yupResolver(
      historyManagementSchema
    ) as Resolver<HistoryManagementSchemaForm>,
    defaultValues: {
      contentEn: initialValues?.contentEn || "",
      contentBn: initialValues?.contentBn || "",
    },
  });

  const {
    mutate: saveHistory,
    isPending,
    error,
    reset: resetError,
  } = usePost<{ data: IHistoryManagement }>(
    "/history",
    () => {
      onSuccess?.();
    },
    [["history-management"]]
  );

  const { mutateAsync: uploadImage } = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("image", file);
      const response = await axiosInstance.post(
        "/history/upload-image",
        formData
      );
      return (response.data as { imageUrl: string }).imageUrl;
    },
  });

  const onSubmit = (data: HistoryManagementSchemaForm) => {
    saveHistory({
      data: {
        contentEn: data.contentEn,
        ...(data.contentBn?.trim() && { contentBn: data.contentBn }),
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
      <HistoryManagementForm
        isEditMode={isEditMode}
        onSubmit={onSubmit}
        error={error}
        isPending={isPending}
        onCancel={handleCancel}
        onImageUpload={uploadImage}
      />
    </FormProvider>
  );
};

export default CreateUpdateHistoryManagement;
