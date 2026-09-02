"use client";

import { useEffect } from "react";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, Resolver, useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { usePost } from "@/src/hooks/usePost";
import { usePatch } from "@/src/hooks/usePatch";
import { IPublication } from "../types";
import {
  publicationSchema,
  PublicationFormValues,
} from "../Schema/publicationSchema";
import PublicationForm from "./PublicationForm";

interface CreateUpdatePublicationProps {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: IPublication;
}

const CreateUpdatePublication = ({
  isOpen,
  onClose,
  initialValues,
}: CreateUpdatePublicationProps) => {
  const isUpdate = !!initialValues;

  const methods = useForm<PublicationFormValues>({
    resolver: yupResolver(publicationSchema) as Resolver<PublicationFormValues>,
    defaultValues: {
      image: "",
      titleEn: "",
      titleBn: "",
      code: "",
      date: "",
      status: "ACTIVE",
    },
  });

  useEffect(() => {
    if (isOpen) {
      methods.reset({
        image: initialValues?.imageUrl || "",
        titleEn: initialValues?.titleEn || "",
        titleBn: initialValues?.titleBn || "",
        code: initialValues?.code || "",
        date: initialValues?.date ? initialValues.date.split("T")[0] : "",
        status: initialValues?.status || "ACTIVE",
      });
    } else {
      methods.reset({
        image: "",
        titleEn: "",
        titleBn: "",
        code: "",
        date: "",
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
    "/publication",
    () => {
      toast.success("Publication created successfully!");
      onClose();
    },
    [["publication"], ["publication-public"]]
  );

  const {
    mutate: updateMutate,
    isPending: isUpdating,
    error: updateError,
    reset: resetUpdateError,
  } = usePatch(
    () => {
      toast.success("Publication updated successfully!");
      onClose();
    },
    [["publication"], ["publication-public"]]
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

  const onSubmit = (values: PublicationFormValues) => {
    const formData = new FormData();
    if (values.image instanceof File) {
      formData.append("image", values.image);
    }
    formData.append("titleEn", values.titleEn);
    if (values.titleBn) formData.append("titleBn", values.titleBn);
    if (values.code) formData.append("code", values.code);
    if (values.date) formData.append("date", values.date);
    if (values.status) formData.append("status", values.status);

    if (isUpdate && initialValues) {
      updateMutate({
        url: `/publication/${initialValues.id}`,
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
      <DialogContent className="bg-white sm:max-w-lg max-h-[90vh] flex flex-col">
        <DialogHeader className="shrink-0">
          <DialogTitle className="text-secondary text-xl font-semibold">
            {isUpdate ? "Update" : "Create"} Publication
          </DialogTitle>
        </DialogHeader>
        <div className="overflow-y-auto flex-1 mt-2 pr-2 scrollbar-modern">
          <FormProvider {...methods}>
            <PublicationForm
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

export default CreateUpdatePublication;
