"use client";

import { usePost } from "@/src/hooks/usePost";
import { IHeroManagement } from "../types";
import { yupResolver } from "@hookform/resolvers/yup";
import HeroManagementForm from "./HeroManagementForm";
import { FormProvider, Resolver, useForm } from "react-hook-form";
import {
  HeroManagementSchemaForm,
  heroManagementSchema,
} from "../Schema/heroManagementSchema";

interface CreateUpdateHeroManagementProps {
  initialValues?: IHeroManagement;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const CreateUpdateHeroManagement = ({
  initialValues,
  onSuccess,
  onCancel,
}: CreateUpdateHeroManagementProps) => {
  const isEditMode = !!initialValues?.id;

  const methods = useForm<HeroManagementSchemaForm>({
    resolver: yupResolver(
      heroManagementSchema
    ) as Resolver<HeroManagementSchemaForm>,
    defaultValues: {
      titleEn: initialValues?.titleEn || "",
      titleBn: initialValues?.titleBn || "",
      subTitleEn: initialValues?.subTitleEn || "",
      subTitleBn: initialValues?.subTitleBn || "",
      descriptionEn: initialValues?.descriptionEn || "",
      descriptionBn: initialValues?.descriptionBn || "",
      images: initialValues?.imageUrls || [],
      status: initialValues?.status || "ACTIVE",
    },
  });

  const {
    mutate: saveHero,
    isPending,
    error,
    reset: resetError,
  } = usePost<{ data: IHeroManagement }>(
    "/hero-management",
    () => {
      onSuccess?.();
    },
    [["hero-management"]]
  );

  const onSubmit = (data: HeroManagementSchemaForm) => {
    const formData = new FormData();
    formData.append("titleEn", data.titleEn);
    formData.append("subTitleEn", data.subTitleEn);
    formData.append("descriptionEn", data.descriptionEn);
    formData.append("status", data.status);

    if (data.titleBn?.trim()) formData.append("titleBn", data.titleBn);
    if (data.subTitleBn?.trim()) formData.append("subTitleBn", data.subTitleBn);
    if (data.descriptionBn?.trim())
      formData.append("descriptionBn", data.descriptionBn);

    const existingImageUrls = data.images?.filter(
      (image): image is string => typeof image === "string"
    );

    data.images?.forEach((image) => {
      if (image instanceof File) {
        formData.append("images", image);
      }
    });

    const removedImageUrls = (initialValues?.imageUrls || []).filter(
      (url) => !existingImageUrls?.includes(url)
    );
    removedImageUrls.forEach((url) => {
      formData.append("deleteImages", url);
    });

    saveHero({ data: formData });
  };

  const handleCancel = () => {
    resetError();
    methods.reset();
    onCancel?.();
  };

  return (
    <FormProvider {...methods}>
      <HeroManagementForm
        isEditMode={isEditMode}
        onSubmit={onSubmit}
        isPending={isPending}
        onCancel={handleCancel}
        error={error}
      />
    </FormProvider>
  );
};

export default CreateUpdateHeroManagement;
