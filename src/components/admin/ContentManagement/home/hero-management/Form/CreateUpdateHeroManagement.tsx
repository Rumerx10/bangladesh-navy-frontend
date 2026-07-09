// src/modules/admin/hero-management/components/Form/CreateUpdateHeroManagement.tsx
"use client";

import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import HeroManagementForm from "./HeroManagementForm";
import {
  heroManagementSchema,
  HeroManagementSchemaForm,
} from "../Schema/heroManagementSchema";
import { IHeroManagement } from "../types";
import { usePost } from "@/src/hooks/usePost"; // ✅ Correct import
import { usePatch } from "@/src/hooks/usePatch"; // ✅ Correct import

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
  const isEditMode = !!initialValues?.title;

  // src/modules/admin/hero-management/components/Form/CreateUpdateHeroManagement.tsx
  const methods = useForm<HeroManagementSchemaForm>({
    resolver: yupResolver(heroManagementSchema),
    defaultValues: {
      title: initialValues?.title || "",
      slogan: initialValues?.slogan || "",
      description: initialValues?.description || "",
      images: initialValues?.images || [],
    },
  });

  const { mutate: createHero, isPending: isCreating } = usePost<{
    data: IHeroManagement;
  }>(
    "/hero-management",
    () => {
      onSuccess?.();
    },
    [["hero-management"]]
  );

  const { mutate: updateHero, isPending: isUpdating } = usePatch<{
    data: IHeroManagement;
  }>(
    () => {
      onSuccess?.();
    },
    [["hero-management"]],
    "/hero-management"
  );

  const isPending = isCreating || isUpdating;

  const onSubmit = (data: HeroManagementSchemaForm) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("slogan", data.slogan);
    formData.append("description", data.description);

    data.images.forEach((image) => {
      if (image instanceof File) {
        formData.append("images", image);
      } else if (typeof image === "string") {
        formData.append("existingImages", image);
      }
    });

    if (isEditMode && initialValues?.id) {
      updateHero({
        url: `/hero-management/${initialValues.id}`,
        data: formData,
        config: {
          headers: { "Content-Type": "multipart/form-data" },
        },
      });
    } else {
      createHero({
        endpoint: "/hero-management",
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
      <HeroManagementForm
        isEditMode={isEditMode}
        onSubmit={onSubmit}
        isPending={isPending}
        onCancel={handleCancel}
      />
    </FormProvider>
  );
};

export default CreateUpdateHeroManagement;
