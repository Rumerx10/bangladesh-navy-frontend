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
  HowToCollectFormValues,
  howToCollectSchema,
} from "../Schema/howToCollectSchema";
import { IHowToCollectStep } from "../types";
import HowToCollectForm from "./HowToCollectForm";

interface CreateUpdateHowToCollectProps {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: IHowToCollectStep;
  /** Serial pre-filled when creating, so a new step lands after the last one. */
  nextSerial?: number;
}

const INVALIDATE_KEYS = [["how-to-collect"], ["how-to-collect-list"]];

const EMPTY_VALUES: HowToCollectFormValues = {
  icon: "",
  stepName: "",
  title: "",
  description: "",
  extraFields: [],
  serial: 1,
  status: "ACTIVE",
};

const CreateUpdateHowToCollect = ({
  isOpen,
  onClose,
  initialValues,
  nextSerial = 1,
}: CreateUpdateHowToCollectProps) => {
  const isUpdate = !!initialValues;

  const methods = useForm<HowToCollectFormValues>({
    resolver: yupResolver(
      howToCollectSchema
    ) as Resolver<HowToCollectFormValues>,
    defaultValues: EMPTY_VALUES,
  });

  useEffect(() => {
    if (isOpen) {
      methods.reset(
        initialValues
          ? {
              icon: initialValues.icon || "",
              stepName: initialValues.stepName || "",
              title: initialValues.title || "",
              description: initialValues.description || "",
              extraFields: initialValues.extraFields ?? [],
              serial: initialValues.serial ?? 1,
              status:
                initialValues.status === "INACTIVE" ? "INACTIVE" : "ACTIVE",
            }
          : { ...EMPTY_VALUES, serial: nextSerial }
      );
    } else {
      methods.reset(EMPTY_VALUES);
    }
  }, [isOpen, initialValues, nextSerial, methods]);

  const {
    mutate: createMutate,
    isPending: isCreating,
    error,
    reset: resetCreateError,
  } = usePost(
    "/how-to-collect",
    () => {
      toast.success("Step created successfully!");
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
    toast.success("Step updated successfully!");
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

  const onSubmit = (values: HowToCollectFormValues) => {
    const payload = {
      icon: values.icon,
      stepName: values.stepName.trim(),
      title: values.title.trim(),
      description: values.description.trim(),
      extraFields: (values.extraFields ?? []).map(({ key, value }) => ({
        key: key.trim(),
        value: value.trim(),
      })),
      serial: values.serial,
      status: values.status,
    };

    if (isUpdate && initialValues) {
      updateMutate({
        url: `/how-to-collect/${initialValues.id}`,
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
      <DialogContent className="flex max-h-[90vh] min-w-[55vw] flex-col bg-card">
        <DialogHeader className="shrink-0">
          <DialogTitle className="text-xl font-semibold text-secondary">
            {isUpdate ? "Update" : "Create"} Collection Step
          </DialogTitle>
        </DialogHeader>
        <div className="scrollbar-modern mt-2 flex-1 overflow-y-auto pr-2">
          <FormProvider {...methods}>
            <HowToCollectForm
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

export default CreateUpdateHowToCollect;
