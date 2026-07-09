"use client";

import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import NoticesForm from "./NoticesForm";
import { noticesSchema, NoticesSchemaForm } from "../Schema/noticesSchema";
import { INoticesManagement } from "../types";
import { usePost } from "@/src/hooks/usePost";
import { usePatch } from "@/src/hooks/usePatch";

interface CreateUpdateNoticesProps {
  initialValues?: INoticesManagement;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const CreateUpdateNotices = ({
  initialValues,
  onSuccess,
  onCancel,
}: CreateUpdateNoticesProps) => {
  const isEditMode = !!initialValues?.title;

  const methods = useForm<NoticesSchemaForm>({
    resolver: yupResolver(noticesSchema),
    defaultValues: {
      title: initialValues?.title || "",
      subTitle: initialValues?.subTitle || "",
      categories: initialValues?.categories || [],
      news: initialValues?.news || [],
    },
  });

  const { mutate: createNotices, isPending: isCreating } = usePost<{
    data: INoticesManagement;
  }>(
    "/notices",
    () => {
      onSuccess?.();
    },
    [["notices"]]
  );

  const { mutate: updateNotices, isPending: isUpdating } = usePatch<{
    data: INoticesManagement;
  }>(
    () => {
      onSuccess?.();
    },
    [["notices"]],
    "/notices"
  );

  const isPending = isCreating || isUpdating;

  const onSubmit = (data: NoticesSchemaForm) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("subTitle", data.subTitle);

    (data.categories || []).forEach((cat, i) => {
      formData.append(`categories[${i}]`, cat);
    });

    data.news.forEach((item, i) => {
      formData.append(`news[${i}][category]`, item.category);
      formData.append(`news[${i}][title]`, item.title);
      formData.append(`news[${i}][date]`, item.date);
      formData.append(`news[${i}][shortDescription]`, item.shortDescription);
      formData.append(`news[${i}][description]`, item.description);

      if (item.image instanceof File) {
        formData.append(`news[${i}][image]`, item.image);
      } else if (typeof item.image === "string" && item.image.trim()) {
        formData.append(`news[${i}][existingImage]`, item.image);
      }
    });

    if (isEditMode && initialValues?.id) {
      updateNotices({
        url: `/notices/${initialValues.id}`,
        data: formData,
        config: { headers: { "Content-Type": "multipart/form-data" } },
      });
    } else {
      createNotices({
        endpoint: "/notices",
        data: formData,
        config: { headers: { "Content-Type": "multipart/form-data" } },
      });
    }
  };

  const handleCancel = () => {
    methods.reset();
    onCancel?.();
  };

  return (
    <FormProvider {...methods}>
      <NoticesForm
        isEditMode={isEditMode}
        onSubmit={onSubmit}
        isPending={isPending}
        onCancel={handleCancel}
      />
    </FormProvider>
  );
};

export default CreateUpdateNotices;
