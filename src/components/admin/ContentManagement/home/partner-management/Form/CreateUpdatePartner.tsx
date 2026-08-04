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
import { partnerSchema, PartnerFormValues } from "../Schema/partnerSchema";
import { IPartner } from "../types";
import PartnerForm from "./PartnerForm";

interface CreateUpdatePartnerProps {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: IPartner;
}

const CreateUpdatePartner = ({
  isOpen,
  onClose,
  initialValues,
}: CreateUpdatePartnerProps) => {
  const isUpdate = !!initialValues;

  const methods = useForm<PartnerFormValues>({
    resolver: yupResolver(partnerSchema) as Resolver<PartnerFormValues>,
    defaultValues: {
      image: "",
      link: "",
      status: "ACTIVE",
    },
  });

  useEffect(() => {
    if (isOpen) {
      methods.reset({
        image: initialValues?.image || "",
        link: initialValues?.link || "",
        status: initialValues?.status || "ACTIVE",
      });
    } else {
      methods.reset({
        image: "",
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
    "/partners",
    () => {
      toast.success("Partner created successfully!");
      onClose();
    },
    [["partners"]]
  );

  const {
    mutate: updateMutate,
    isPending: isUpdating,
    error: updateError,
    reset: resetUpdateError,
  } = usePatch(() => {
    toast.success("Partner updated successfully!");
    onClose();
  }, [["partners"]]);

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

  const onSubmit = (values: PartnerFormValues) => {
    const formData = new FormData();
    if (values.image instanceof File) {
      formData.append("image", values.image);
    }
    formData.append("link", values.link);
    formData.append("status", values.status);

    if (isUpdate && initialValues) {
      updateMutate({
        url: `/partners/${initialValues.id}`,
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
            {isUpdate ? "Update" : "Create"} Partner
          </DialogTitle>
        </DialogHeader>
        <div className="overflow-y-auto flex-1 mt-2 pr-2 scrollbar-modern">
          <FormProvider {...methods}>
            <PartnerForm
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

export default CreateUpdatePartner;
