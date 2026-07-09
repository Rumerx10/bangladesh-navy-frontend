"use client";

import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import NoticeManagementForm from "./NoticeManagementForm";
import {
  noticeManagementSchema,
  NoticeManagementSchemaForm,
} from "../Schema/noticeManagementSchema";
import { INoticeManagement } from "../types";
import { usePost } from "@/src/hooks/usePost";
import { usePatch } from "@/src/hooks/usePatch";

interface CreateUpdateNoticeManagementProps {
  initialValues?: INoticeManagement;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const CreateUpdateNoticeManagement = ({
  initialValues,
  onSuccess,
  onCancel,
}: CreateUpdateNoticeManagementProps) => {
  const isEditMode = !!initialValues?.id;

  const methods = useForm<NoticeManagementSchemaForm>({
    resolver: yupResolver(noticeManagementSchema),
    defaultValues: {
      notices: initialValues?.notices || [],
    },
  });

  const { mutate: createNotice, isPending: isCreating } = usePost<{
    data: INoticeManagement;
  }>(
    "/notice-management",
    () => {
      onSuccess?.();
    },
    [["notice-management"]]
  );

  const { mutate: updateNotice, isPending: isUpdating } = usePatch<{
    data: INoticeManagement;
  }>(
    () => {
      onSuccess?.();
    },
    [["notice-management"]],
    "/notice-management"
  );

  const isPending = isCreating || isUpdating;

  const onSubmit = (data: NoticeManagementSchemaForm) => {
    if (isEditMode && initialValues?.id) {
      updateNotice({
        url: `/notice-management/${initialValues.id}`,
        data: { notices: data.notices },
      });
    } else {
      createNotice({
        endpoint: "/notice-management",
        data: { notices: data.notices },
      });
    }
  };

  const handleCancel = () => {
    methods.reset();
    onCancel?.();
  };

  return (
    <FormProvider {...methods}>
      <NoticeManagementForm
        isEditMode={isEditMode}
        onSubmit={onSubmit}
        isPending={isPending}
        onCancel={handleCancel}
      />
    </FormProvider>
  );
};

export default CreateUpdateNoticeManagement;
