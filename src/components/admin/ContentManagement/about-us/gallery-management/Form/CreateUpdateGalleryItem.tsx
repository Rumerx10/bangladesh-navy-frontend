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
  GalleryItemFormValues,
  galleryItemSchema,
} from "../Schema/galleryItemSchema";
import { IGalleryItem } from "../types";
import GalleryItemForm from "./GalleryItemForm";

interface CreateUpdateGalleryItemProps {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: IGalleryItem;
}

const CreateUpdateGalleryItem = ({
  isOpen,
  onClose,
  initialValues,
}: CreateUpdateGalleryItemProps) => {
  const isUpdate = !!initialValues;

  const methods = useForm<GalleryItemFormValues>({
    resolver: yupResolver(galleryItemSchema) as Resolver<GalleryItemFormValues>,
    defaultValues: {
      titleEn: "",
      titleBn: "",
      galleryCategoryId: "",
      position: 1,
      image: undefined,
    },
  });

  useEffect(() => {
    if (isOpen) {
      methods.reset({
        titleEn: initialValues?.titleEn || "",
        titleBn: initialValues?.titleBn || "",
        galleryCategoryId: initialValues?.galleryCategory?.id || "",
        position: initialValues?.position ?? 1,
        image: initialValues?.imageUrl || undefined,
      });
    } else {
      methods.reset({
        titleEn: "",
        titleBn: "",
        galleryCategoryId: "",
        position: 1,
        image: undefined,
      });
    }
  }, [isOpen, initialValues, methods]);

  const {
    mutate: createMutate,
    isPending: isCreating,
    error,
    reset: resetCreateError,
  } = usePost(
    "/gallery",
    () => {
      toast.success("Gallery item created successfully!");
      onClose();
    },
    [["gallery"]]
  );

  const {
    mutate: updateMutate,
    isPending: isUpdating,
    error: updateError,
    reset: resetUpdateError,
  } = usePatch(() => {
    toast.success("Gallery item updated successfully!");
    onClose();
  }, [["gallery"]]);

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

  const onSubmit = (values: GalleryItemFormValues) => {
    const formData = new FormData();
    formData.append("titleEn", values.titleEn);
    formData.append("titleBn", values.titleBn || "");
    formData.append("galleryCategoryId", values.galleryCategoryId);
    formData.append("position", String(values.position));

    if (values.image instanceof File) {
      formData.append("image", values.image);
    }

    if (isUpdate && initialValues) {
      updateMutate({
        url: `/gallery/${initialValues.id}`,
        data: formData,
        config: { headers: { "Content-Type": "multipart/form-data" } },
      });
    } else {
      createMutate({
        data: formData,
        config: { headers: { "Content-Type": "multipart/form-data" } },
      });
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) handleClose();
      }}
    >
      <DialogContent className="bg-white min-w-[65vw] max-h-[90vh] flex flex-col">
        <DialogHeader className="shrink-0">
          <DialogTitle className="text-secondary text-xl font-semibold">
            {isUpdate ? "Update" : "Create"} Gallery Item
          </DialogTitle>
        </DialogHeader>
        <div className="overflow-y-auto flex-1 mt-2 pr-2 scrollbar-modern">
          <FormProvider {...methods}>
            <GalleryItemForm
              isEditMode={isUpdate}
              onSubmit={onSubmit}
              onCancel={handleClose}
              isPending={isCreating || isUpdating}
              error={error || updateError}
            />
          </FormProvider>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateUpdateGalleryItem;
