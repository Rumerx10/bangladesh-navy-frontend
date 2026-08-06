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
  importantLinkSchema,
  ImportantLinkFormValues,
} from "../Schema/importantLinkSchema";
import { IImportantLink } from "../types";
import ImportantLinkForm from "./ImportantLinkForm";

interface CreateUpdateImportantLinkProps {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: IImportantLink;
}

const CreateUpdateImportantLink = ({
  isOpen,
  onClose,
  initialValues,
}: CreateUpdateImportantLinkProps) => {
  const isUpdate = !!initialValues;

  const methods = useForm<ImportantLinkFormValues>({
    resolver: yupResolver(
      importantLinkSchema
    ) as Resolver<ImportantLinkFormValues>,
    defaultValues: {
      name: "",
      link: "",
      status: "ACTIVE",
    },
  });

  useEffect(() => {
    if (isOpen) {
      methods.reset({
        name: initialValues?.name || "",
        link: initialValues?.link || "",
        status: initialValues?.status || "ACTIVE",
      });
    } else {
      methods.reset({
        name: "",
        link: "",
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
    "/important-links",
    () => {
      toast.success("Important link created successfully!");
      onClose();
    },
    [["important-links"]]
  );

  const {
    mutate: updateMutate,
    isPending: isUpdating,
    error: updateError,
    reset: resetUpdateError,
  } = usePatch(() => {
    toast.success("Important link updated successfully!");
    onClose();
  }, [["important-links"]]);

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

  const onSubmit = (values: ImportantLinkFormValues) => {
    if (isUpdate && initialValues) {
      updateMutate({
        url: `/important-links/${initialValues.id}`,
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
      <DialogContent className="bg-white sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-secondary text-xl font-semibold">
            {isUpdate ? "Update" : "Create"} Important Link
          </DialogTitle>
        </DialogHeader>
        <FormProvider {...methods}>
          <ImportantLinkForm
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

export default CreateUpdateImportantLink;
