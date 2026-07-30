"use client";

import { toast } from "react-toastify";
import { useEffect } from "react";
import { usePost } from "@/src/hooks/usePost";
import { usePatch } from "@/src/hooks/usePatch";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, Resolver, useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import {
  GalleryCategoryFormValues,
  galleryCategorySchema,
} from "../Schema/galleryCategorySchema";
import { IGalleryCategory } from "../types";
import GalleryCategoryForm from "./GalleryCategoryForm";

interface CreateUpdateGalleryCategoryProps {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: IGalleryCategory;
}

const CreateUpdateGalleryCategory = ({
  isOpen,
  onClose,
  initialValues,
}: CreateUpdateGalleryCategoryProps) => {
  const isUpdate = !!initialValues;

  const methods = useForm<GalleryCategoryFormValues>({
    resolver: yupResolver(
      galleryCategorySchema
    ) as Resolver<GalleryCategoryFormValues>,
    defaultValues: { nameEn: "", nameBn: "", status: "ACTIVE" },
  });

  useEffect(() => {
    if (isOpen) {
      methods.reset({
        nameEn: initialValues?.nameEn || "",
        nameBn: initialValues?.nameBn || "",
        status: initialValues?.status || "ACTIVE",
      });
    } else {
      methods.reset({ nameEn: "", nameBn: "", status: "ACTIVE" });
    }
  }, [isOpen, initialValues, methods]);

  const {
    mutate: createMutate,
    isPending: isCreating,
    error,
    reset: resetCreateError,
  } = usePost(
    "/gallery-category",
    () => {
      toast.success("Category created successfully!");
      onClose();
    },
    [["gallery-category"], ["gallery-category-list"]]
  );

  const {
    mutate: updateMutate,
    isPending: isUpdating,
    error: updateError,
    reset: resetUpdateError,
  } = usePatch(() => {
    toast.success("Category updated successfully!");
    onClose();
  }, [["gallery-category"], ["gallery-category-list"]]);

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

  const onSubmit = (values: GalleryCategoryFormValues) => {
    const payload = {
      nameEn: values.nameEn,
      status: values.status,
      ...(values.nameBn?.trim() && { nameBn: values.nameBn }),
    };

    if (isUpdate && initialValues) {
      updateMutate({
        url: `/gallery-category/${initialValues.id}`,
        data: payload,
      });
    } else {
      createMutate({ data: payload });
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) handleClose();
      }}
    >
      <DialogContent className="bg-white min-w-[40vw] max-h-[90vh] overflow-y-auto scrollbar-modern">
        <DialogHeader>
          <DialogTitle className="text-secondary text-xl font-semibold">
            {isUpdate ? "Update" : "Create"} Gallery Category
          </DialogTitle>
        </DialogHeader>
        <FormProvider {...methods}>
          <GalleryCategoryForm
            isEditMode={isUpdate}
            onSubmit={onSubmit}
            onCancel={handleClose}
            isPending={isCreating || isUpdating}
            error={error || updateError}
          />
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default CreateUpdateGalleryCategory;
