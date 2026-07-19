"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { INoticeManagement } from "../types";
import { usePost } from "@/src/hooks/usePost";
import { usePatch } from "@/src/hooks/usePatch";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, Resolver, useForm } from "react-hook-form";
import { NoticeFormValues, noticeSchema } from "../Schema/noticeManagementSchema";
import NoticeForm from "./NoticeForm";

interface CreateUpdateNoticeManagementProps {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: INoticeManagement;
}

const CreateUpdateNoticeManagement = ({
  isOpen,
  onClose,
  initialValues,
}: CreateUpdateNoticeManagementProps) => {
  const isUpdate = !!initialValues;

  const methods = useForm<NoticeFormValues>({
    resolver: yupResolver(noticeSchema) as Resolver<NoticeFormValues>,
    defaultValues: {
      name: "",
      description: "",
      status: "ACTIVE",
    },
  });

  useEffect(() => {
    if (isOpen) {
      methods.reset({
        name: initialValues?.name || "",
        description: initialValues?.description || "",
        status: initialValues?.status === "INACTIVE" ? "INACTIVE" : "ACTIVE",
      });
    } else {
      methods.reset({
        name: "",
        description: "",
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
    "/notice",
    () => {
      toast.success("Notice created successfully!");
      onClose();
    },
    [["notice-management"]]
  );

  const {
    mutate: updateMutate,
    isPending: isUpdating,
    error: updateError,
    reset: resetUpdateError,
  } = usePatch(() => {
    toast.success("Notice updated successfully!");
    onClose();
  }, [["notice-management"]]);

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

  const onSubmit = (values: NoticeFormValues) => {
    if (isUpdate && initialValues) {
      updateMutate({
        url: `/notice/${initialValues.id}`,
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
            {isUpdate ? "Update" : "Create"} Notice
          </DialogTitle>
        </DialogHeader>

        <FormProvider {...methods}>
          <NoticeForm
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

export default CreateUpdateNoticeManagement;
