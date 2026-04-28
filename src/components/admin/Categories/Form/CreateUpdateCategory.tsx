"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { usePatch } from "@/src/hooks/usePatch";
import { usePost } from "@/src/hooks/usePost";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { FormProvider, Resolver, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { CategoryFormValues, categorySchema } from "../Schema/categorySchema";
import { ICategory } from "../types";
import CategoryForm from "./CategoryForm";

interface CreateUpdateCategoryProps {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: ICategory;
}

export default function CreateUpdateCategory({
  isOpen,
  onClose,
  initialValues,
}: CreateUpdateCategoryProps) {
  const isUpdate = !!initialValues;

  const methods = useForm<CategoryFormValues>({
    resolver: yupResolver(categorySchema) as Resolver<CategoryFormValues>,
    defaultValues: {
      nameBn: "",
      nameEn: "",
      descriptionEn: "",
      descriptionBn: "",
      icon: undefined,
      status: "ACTIVE",
    },
  });

  useEffect(() => {
    if (isOpen) {
      methods.reset({
        nameBn: initialValues?.nameBn || "",
        nameEn: initialValues?.nameEn || "",
        descriptionEn: initialValues?.descriptionEn || "",
        descriptionBn: initialValues?.descriptionBn || "",
        icon: initialValues?.icon || undefined,
        status: initialValues?.status === "INACTIVE" ? "INACTIVE" : "ACTIVE",
      });
    } else {
      methods.reset({
        nameBn: "",
        nameEn: "",
        descriptionEn: "",
        descriptionBn: "",
        icon: undefined,
        status: "ACTIVE",
      });
    }
  }, [isOpen, initialValues, methods]);

  const {
    mutate: createMutate,
    isPending: isCreating,
    error,
    reset: resetCreateError,
  } = usePost(
    "/category",
    () => {
      toast.success("Category created successfully!");
      onClose();
    },
    [["categories"]]
  );

  const {
    mutate: updateMutate,
    isPending: isUpdating,
    error: updateError,
    reset: resetUpdateError,
  } = usePatch(() => {
    toast.success("Category updated successfully!");
    onClose();
  }, [["categories"]]);

  const handleClose = () => {
    resetCreateError();
    resetUpdateError();
    onClose();
  };

  useEffect(() => {
    if (!isOpen) {
      resetCreateError();
      resetUpdateError();
    }
  }, [isOpen, resetCreateError, resetUpdateError]);

  const isPending = isCreating || isUpdating;

  const onSubmit = (values: CategoryFormValues) => {
    const formData = new FormData();
    formData.append("nameBn", values.nameBn);
    if (values.nameEn) {
      formData.append("nameEn", values.nameEn);
    }
    if (values.descriptionEn) {
      formData.append("descriptionEn", values.descriptionEn);
    }
    if (values.descriptionBn) {
      formData.append("descriptionBn", values.descriptionBn);
    }
    if (values.icon instanceof File) {
      formData.append("icon", values.icon);
    }
    formData.append("status", values.status);

    if (isUpdate && initialValues) {
      updateMutate({
        url: `/category/${initialValues.id}`,
        data: formData,
      });
    } else {
      createMutate({ data: formData });
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) handleClose();
      }}
    >
      <DialogContent className="bg-white min-w-[40vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-secondary text-xl font-semibold">
            {isUpdate ? "Update" : "Create"} Category
          </DialogTitle>
        </DialogHeader>

        <FormProvider {...methods}>
          <CategoryForm
            isEditMode={isUpdate}
            onSubmit={onSubmit}
            onCancel={handleClose}
            isPending={isPending}
            error={error || updateError}
          />
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
