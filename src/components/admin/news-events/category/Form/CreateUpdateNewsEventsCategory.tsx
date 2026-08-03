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
  NewsEventsCategoryFormValues,
  newsEventsCategorySchema,
} from "../Schema/newsEventsCategorySchema";
import { INewsEventsCategory } from "../types";
import NewsEventsCategoryForm from "./NewsEventsCategoryForm";

interface CreateUpdateNewsEventsCategoryProps {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: INewsEventsCategory;
}

const CreateUpdateNewsEventsCategory = ({
  isOpen,
  onClose,
  initialValues,
}: CreateUpdateNewsEventsCategoryProps) => {
  const isUpdate = !!initialValues;

  const methods = useForm<NewsEventsCategoryFormValues>({
    resolver: yupResolver(
      newsEventsCategorySchema
    ) as Resolver<NewsEventsCategoryFormValues>,
    defaultValues: { nameEn: "", nameBn: "" },
  });

  useEffect(() => {
    if (isOpen) {
      methods.reset({
        nameEn: initialValues?.nameEn || "",
        nameBn: initialValues?.nameBn || "",
      });
    } else {
      methods.reset({ nameEn: "", nameBn: "" });
    }
  }, [isOpen, initialValues, methods]);

  const {
    mutate: createMutate,
    isPending: isCreating,
    error,
    reset: resetCreateError,
  } = usePost(
    "/news-events-category",
    () => {
      toast.success("Category created successfully!");
      onClose();
    },
    [["news-events-category"]]
  );

  const {
    mutate: updateMutate,
    isPending: isUpdating,
    error: updateError,
    reset: resetUpdateError,
  } = usePatch(() => {
    toast.success("Category updated successfully!");
    onClose();
  }, [["news-events-category"]]);

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

  const onSubmit = (values: NewsEventsCategoryFormValues) => {
    const payload = {
      nameEn: values.nameEn,
      ...(values.nameBn?.trim() && { nameBn: values.nameBn }),
    };

    if (isUpdate && initialValues) {
      updateMutate({
        url: `/news-events-category/${initialValues.id}`,
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
      <DialogContent className="bg-white min-w-[40vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-secondary text-xl font-semibold">
            {isUpdate ? "Update" : "Create"} News Events Category
          </DialogTitle>
        </DialogHeader>
        <FormProvider {...methods}>
          <NewsEventsCategoryForm
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

export default CreateUpdateNewsEventsCategory;
