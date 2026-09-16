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
  OrganogramFormValues,
  organogramSchema,
} from "../Schema/organogramSchema";
import { IOrganogramNode } from "../types";
import OrganogramForm, { NO_PARENT_VALUE } from "./OrganogramForm";

interface CreateUpdateOrganogramProps {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: IOrganogramNode;
  /** Pre-selected parent when opening the form from an "Add child" action. */
  defaultParentId?: string | null;
}

const INVALIDATE_KEYS = [["organogram-all"], ["organogram-list"]];

const CreateUpdateOrganogram = ({
  isOpen,
  onClose,
  initialValues,
  defaultParentId,
}: CreateUpdateOrganogramProps) => {
  const isUpdate = !!initialValues;

  const methods = useForm<OrganogramFormValues>({
    resolver: yupResolver(organogramSchema) as Resolver<OrganogramFormValues>,
    defaultValues: {
      title: "",
      parentId: NO_PARENT_VALUE,
      serial: 1,
      status: "ACTIVE",
    },
  });

  useEffect(() => {
    if (isOpen) {
      methods.reset({
        title: initialValues?.title || "",
        parentId: initialValues
          ? initialValues.parentId || NO_PARENT_VALUE
          : defaultParentId || NO_PARENT_VALUE,
        serial: initialValues?.serial ?? 1,
        status: initialValues?.status || "ACTIVE",
      });
    } else {
      methods.reset({
        title: "",
        parentId: NO_PARENT_VALUE,
        serial: 1,
        status: "ACTIVE",
      });
    }
  }, [isOpen, initialValues, defaultParentId, methods]);

  const {
    mutate: createMutate,
    isPending: isCreating,
    error,
    reset: resetCreateError,
  } = usePost(
    "/organogram",
    () => {
      toast.success("Organogram node created successfully!");
      onClose();
    },
    INVALIDATE_KEYS
  );

  const {
    mutate: updateMutate,
    isPending: isUpdating,
    error: updateError,
    reset: resetUpdateError,
  } = usePatch(() => {
    toast.success("Organogram node updated successfully!");
    onClose();
  }, INVALIDATE_KEYS);

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

  const onSubmit = (values: OrganogramFormValues) => {
    const payload = {
      title: values.title.trim(),
      parentId:
        !values.parentId || values.parentId === NO_PARENT_VALUE
          ? null
          : values.parentId,
      serial: values.serial,
      status: values.status,
    };

    if (isUpdate && initialValues) {
      updateMutate({ url: `/organogram/${initialValues.id}`, data: payload });
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
      <DialogContent className="bg-white min-w-[55vw] max-h-[90vh] flex flex-col">
        <DialogHeader className="shrink-0">
          <DialogTitle className="text-secondary text-xl font-semibold">
            {isUpdate ? "Update" : "Create"} Organogram Node
          </DialogTitle>
        </DialogHeader>
        <div className="overflow-y-auto flex-1 mt-2 pr-2 scrollbar-modern">
          <FormProvider {...methods}>
            <OrganogramForm
              isEditMode={isUpdate}
              editingNodeId={initialValues?.id}
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

export default CreateUpdateOrganogram;
