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
  SurveyCategoryFormValues,
  surveyCategorySchema,
} from "../Schema/surveyCategorySchema";
import { ISurveyCategory } from "../types";
import SurveyCategoryForm from "./SurveyCategoryForm";

interface CreateUpdateSurveyCategoryProps {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: ISurveyCategory;
}

const CreateUpdateSurveyCategory = ({
  isOpen,
  onClose,
  initialValues,
}: CreateUpdateSurveyCategoryProps) => {
  const isUpdate = !!initialValues;

  const methods = useForm<SurveyCategoryFormValues>({
    resolver: yupResolver(
      surveyCategorySchema
    ) as Resolver<SurveyCategoryFormValues>,
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
    "/survey-category",
    () => {
      toast.success("Category created successfully!");
      onClose();
    },
    [["survey-category"], ["survey-category-list"]]
  );

  const {
    mutate: updateMutate,
    isPending: isUpdating,
    error: updateError,
    reset: resetUpdateError,
  } = usePatch(
    () => {
      toast.success("Category updated successfully!");
      onClose();
    },
    [["survey-category"], ["survey-category-list"]]
  );

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

  const onSubmit = (values: SurveyCategoryFormValues) => {
    if (isUpdate && initialValues) {
      updateMutate({
        url: `/survey-category/${initialValues.id}`,
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
      <DialogContent className="bg-white min-w-[40vw] max-h-[90vh] overflow-y-auto scrollbar-modern">
        <DialogHeader>
          <DialogTitle className="text-secondary text-xl font-semibold">
            {isUpdate ? "Update" : "Create"} Survey Category
          </DialogTitle>
        </DialogHeader>
        <FormProvider {...methods}>
          <SurveyCategoryForm
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

export default CreateUpdateSurveyCategory;
