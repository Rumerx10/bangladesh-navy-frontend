"use client";

import { toast } from "react-toastify";
import { useEffect } from "react";
import { usePost } from "@/src/hooks/usePost";
import { usePatch } from "@/src/hooks/usePatch";
import { ICategory } from "../types";
import CategoryForm from "./CategoryForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, Resolver, useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { CategoryFormValues, categorySchema } from "../Schema/categorySchema";

interface CreateUpdateCategoryProps {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: ICategory;
}

const CreateUpdateCategory = ({
  isOpen,
  onClose,
  initialValues,
}: CreateUpdateCategoryProps) => {
  const isUpdate = !!initialValues;

  const methods = useForm<CategoryFormValues>({
    resolver: yupResolver(categorySchema) as Resolver<CategoryFormValues>,
    defaultValues: {
      nameBn: "",
      nameEn: "",
      icon: undefined,
      descriptionEn: "",
      descriptionBn: "",
      status: "ACTIVE",
    },
  });

  useEffect(() => {
    if (isOpen) {
      methods.reset({
        nameBn: initialValues?.nameBn || "",
        nameEn: initialValues?.nameEn || "",
        icon: initialValues?.icon || undefined,
        descriptionEn: initialValues?.descriptionEn || "",
        descriptionBn: initialValues?.descriptionBn || "",
        status: initialValues?.status === "INACTIVE" ? "INACTIVE" : "ACTIVE",
      });
    } else {
      methods.reset({
        nameBn: "",
        nameEn: "",
        icon: undefined,
        descriptionEn: "",
        descriptionBn: "",
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
    [["category"]]
  );

  const {
    mutate: updateMutate,
    isPending: isUpdating,
    error: updateError,
    reset: resetUpdateError,
  } = usePatch(() => {
    toast.success("Category updated successfully!");
    onClose();
  }, [["category"]]);

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
    if (isUpdate && initialValues) {
      updateMutate({
        url: `/category/${initialValues.id}`,
        data: values,
      });
    } else {
      createMutate({ data: values });
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
};

export default CreateUpdateCategory;
