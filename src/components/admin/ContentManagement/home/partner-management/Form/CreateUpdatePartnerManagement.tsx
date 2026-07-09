"use client";

import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import PartnerManagementForm from "./PartnerManagementForm";
import {
  partnerManagementSchema,
  PartnerManagementSchemaForm,
} from "../Schema/partnerManagementSchema";
import { IPartnerManagement } from "../types";
import { usePost } from "@/src/hooks/usePost";
import { usePatch } from "@/src/hooks/usePatch";

interface CreateUpdatePartnerManagementProps {
  initialValues?: IPartnerManagement;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const CreateUpdatePartnerManagement = ({
  initialValues,
  onSuccess,
  onCancel,
}: CreateUpdatePartnerManagementProps) => {
  const isEditMode = !!initialValues?.title;

  const methods = useForm<PartnerManagementSchemaForm>({
    resolver: yupResolver(partnerManagementSchema),
    defaultValues: {
      title: initialValues?.title || "",
      description: initialValues?.description || "",
      partners: initialValues?.partners || [],
    },
  });

  const { mutate: createPartner, isPending: isCreating } = usePost<{
    data: IPartnerManagement;
  }>(
    "/partner-management",
    () => {
      onSuccess?.();
    },
    [["partner-management"]]
  );

  const { mutate: updatePartner, isPending: isUpdating } = usePatch<{
    data: IPartnerManagement;
  }>(
    () => {
      onSuccess?.();
    },
    [["partner-management"]],
    "/partner-management"
  );

  const isPending = isCreating || isUpdating;

  const onSubmit = (data: PartnerManagementSchemaForm) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);

    data.partners.forEach((partner, index) => {
      formData.append(`partners[${index}][name]`, partner.name);
      formData.append(
        `partners[${index}][isActive]`,
        String(partner.isActive ?? true)
      );
      if (partner.image instanceof File) {
        formData.append(`partners[${index}][image]`, partner.image);
      } else if (typeof partner.image === "string" && partner.image.trim()) {
        formData.append(`partners[${index}][existingImage]`, partner.image);
      }
    });

    if (isEditMode && initialValues?.id) {
      updatePartner({
        url: `/partner-management/${initialValues.id}`,
        data: formData,
        config: {
          headers: { "Content-Type": "multipart/form-data" },
        },
      });
    } else {
      createPartner({
        endpoint: "/partner-management",
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
      <PartnerManagementForm
        isEditMode={isEditMode}
        onSubmit={onSubmit}
        isPending={isPending}
        onCancel={handleCancel}
      />
    </FormProvider>
  );
};

export default CreateUpdatePartnerManagement;
