"use client";

import { usePost } from "@/src/hooks/usePost";
import { usePatch } from "@/src/hooks/usePatch";
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
    resolver: yupResolver(heroManagementSchema) as Resolver<HeroManagementSchemaForm>,
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
    mutate: createHero,
    isPending: isCreating,
    error,
    reset: resetCreateError,
  } = usePost(
    "/hero-management",
    () => {
      onSuccess?.();
    },
    [["hero-management"]]
  );

  const {
    mutate: updateHero,
    isPending: isUpdating,
    error: updateError,
    reset: resetUpdateError,
  } = usePatch(() => {
    onSuccess?.();
  }, [["hero-management"]]);

  const isPending = isCreating || isUpdating;

  const onSubmit = (data: HeroManagementSchemaForm) => {
    const formData = new FormData();
    formData.append("titleEn", data.titleEn);
    formData.append("titleBn", data.titleBn);
    formData.append("subTitleEn", data.subTitleEn);
    formData.append("subTitleBn", data.subTitleBn);
    formData.append("descriptionEn", data.descriptionEn);
    formData.append("descriptionBn", data.descriptionBn);
    formData.append("status", data.status);

    data.images?.forEach((image) => {
      if (image instanceof File) {
        formData.append("images", image);
      }
    });

    if (isEditMode && initialValues?.id) {
      updateHero({
        url: `/hero-management`,
        data: formData,
      });
    } else {
      createHero({ data: formData });
    }
  };

  const handleCancel = () => {
    resetCreateError();
    resetUpdateError();
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
        error={error || updateError}
      />
    </FormProvider>
  );
};

export default CreateUpdateHeroManagement;