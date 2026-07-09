"use client";

import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import HistoryManagementForm from "./HistoryManagementForm";
import {
  historyManagementSchema,
  HistoryManagementSchemaForm,
} from "../Schema/historyManagementSchema";
import { IHistoryManagement } from "../types";
import { usePost } from "@/src/hooks/usePost";
import { usePatch } from "@/src/hooks/usePatch";

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
  const isEditMode = !!initialValues?.title;

  const methods = useForm<HistoryManagementSchemaForm>({
    resolver: yupResolver(historyManagementSchema),
    defaultValues: {
      title: initialValues?.title || "",
      subTitle: initialValues?.subTitle || "",
      image: initialValues?.image || "",
      description: initialValues?.description || "",
      keyMilestones: initialValues?.keyMilestones || [],
      timelineItems: initialValues?.timelineItems || [],
    },
  });

  const { mutate: createHistory, isPending: isCreating } = usePost<{
    data: IHistoryManagement;
  }>(
    "/history-management",
    () => {
      onSuccess?.();
    },
    [["history-management"]]
  );

  const { mutate: updateHistory, isPending: isUpdating } = usePatch<{
    data: IHistoryManagement;
  }>(
    () => {
      onSuccess?.();
    },
    [["history-management"]],
    "/history-management"
  );

  const isPending = isCreating || isUpdating;

  const onSubmit = (data: HistoryManagementSchemaForm) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("subTitle", data.subTitle);
    formData.append("description", data.description);

    if (data.image instanceof File) {
      formData.append("image", data.image);
    } else if (typeof data.image === "string" && data.image.trim()) {
      formData.append("existingImage", data.image);
    }

    data.keyMilestones.forEach((milestone, i) => {
      formData.append(`keyMilestones[${i}][year]`, milestone.year);
      formData.append(
        `keyMilestones[${i}][description]`,
        milestone.description
      );
    });

    data.timelineItems.forEach((item, i) => {
      formData.append(`timelineItems[${i}][id]`, String(item.id));
      formData.append(`timelineItems[${i}][period]`, item.period);
      formData.append(`timelineItems[${i}][title]`, item.title);
      formData.append(`timelineItems[${i}][summary]`, item.summary);
      formData.append(`timelineItems[${i}][note]`, item.note);

      if (item.icon instanceof File) {
        formData.append(`timelineItems[${i}][icon]`, item.icon);
      } else if (typeof item.icon === "string" && item.icon.trim()) {
        formData.append(`timelineItems[${i}][existingIcon]`, item.icon);
      }

      item.highlights.forEach((h, j) => {
        formData.append(`timelineItems[${i}][highlights][${j}]`, h);
      });
    });

    if (isEditMode && initialValues?.id) {
      updateHistory({
        url: `/history-management/${initialValues.id}`,
        data: formData,
        config: {
          headers: { "Content-Type": "multipart/form-data" },
        },
      });
    } else {
      createHistory({
        endpoint: "/history-management",
        data: formData,
        config: {
          headers: { "Content-Type": "multipart/form-data" },
        },
      });
    }
  };

  const handleCancel = () => {
    methods.reset();
    onCancel?.();
  };

  return (
    <FormProvider {...methods}>
      <HistoryManagementForm
        isEditMode={isEditMode}
        onSubmit={onSubmit}
        isPending={isPending}
        onCancel={handleCancel}
      />
    </FormProvider>
  );
};

export default CreateUpdateHistoryManagement;
