"use client";

import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import GalleryForm from "./GalleryForm";
import { gallerySchema, GallerySchemaForm } from "../Schema/gallerySchema";
import { IGalleryManagement } from "../types";
import { usePost } from "@/src/hooks/usePost";
import { usePatch } from "@/src/hooks/usePatch";

interface CreateUpdateGalleryProps {
  initialValues?: IGalleryManagement;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const CreateUpdateGallery = ({
  initialValues,
  onSuccess,
  onCancel,
}: CreateUpdateGalleryProps) => {
  const isEditMode = !!initialValues?.title;

  const methods = useForm<GallerySchemaForm>({
    resolver: yupResolver(gallerySchema),
    defaultValues: {
      title: initialValues?.title || "",
      subTitle: initialValues?.subTitle || "",
      categories: initialValues?.categories || ["All"],
      galleryItems: initialValues?.galleryItems || [],
    },
  });

  const { mutate: createGallery, isPending: isCreating } = usePost<{
    data: IGalleryManagement;
  }>(
    "/gallery",
    () => {
      onSuccess?.();
    },
    [["gallery"]]
  );

  const { mutate: updateGallery, isPending: isUpdating } = usePatch<{
    data: IGalleryManagement;
  }>(
    () => {
      onSuccess?.();
    },
    [["gallery"]],
    "/gallery"
  );

  const isPending = isCreating || isUpdating;

  const onSubmit = (data: GallerySchemaForm) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("subTitle", data.subTitle);

    data.categories.forEach((cat, i) => {
      formData.append(`categories[${i}]`, cat);
    });

    (data.galleryItems || []).forEach((item, i) => {
      formData.append(`galleryItems[${i}][title]`, item.title);
      formData.append(`galleryItems[${i}][category]`, item.category);
      if (item.image instanceof File) {
        formData.append(`galleryItems[${i}][image]`, item.image);
      } else if (typeof item.image === "string" && item.image.trim()) {
        formData.append(`galleryItems[${i}][existingImage]`, item.image);
      }
    });

    if (isEditMode && initialValues?.id) {
      updateGallery({
        url: `/gallery/${initialValues.id}`,
        data: formData,
        config: { headers: { "Content-Type": "multipart/form-data" } },
      });
    } else {
      createGallery({
        endpoint: "/gallery",
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
      <GalleryForm
        isEditMode={isEditMode}
        onSubmit={onSubmit}
        isPending={isPending}
        onCancel={handleCancel}
      />
    </FormProvider>
  );
};

export default CreateUpdateGallery;
