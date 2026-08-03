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
  TidalStationFormValues,
  tidalStationSchema,
} from "../Schema/tidalStationSchema";
import { ITidalStation } from "../types";
import TidalStationForm from "./TidalStationForm";

interface CreateUpdateTidalStationProps {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: ITidalStation;
}

const CreateUpdateTidalStation = ({
  isOpen,
  onClose,
  initialValues,
}: CreateUpdateTidalStationProps) => {
  const isUpdate = !!initialValues;

  const methods = useForm<TidalStationFormValues>({
    resolver: yupResolver(
      tidalStationSchema
    ) as Resolver<TidalStationFormValues>,
    defaultValues: {
      generalArea: "",
      location: "",
      latitude: "",
      longitude: "",
      productId: "",
      status: "ACTIVE",
    },
  });

  useEffect(() => {
    if (isOpen) {
      methods.reset({
        generalArea: initialValues?.generalArea || "",
        location: initialValues?.location || "",
        latitude: initialValues?.latitude || "",
        longitude: initialValues?.longitude || "",
        productId: initialValues?.productId || "",
        status:
          initialValues?.status === "INACTIVE" ? "INACTIVE" : "ACTIVE",
      });
    } else {
      methods.reset({
        generalArea: "",
        location: "",
        latitude: "",
        longitude: "",
        productId: "",
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
    "/tidal-station",
    () => {
      toast.success("Tidal station created successfully!");
      onClose();
    },
    [["tidal-station"], ["tidal-station-list"]]
  );

  const {
    mutate: updateMutate,
    isPending: isUpdating,
    error: updateError,
    reset: resetUpdateError,
  } = usePatch(() => {
    toast.success("Tidal station updated successfully!");
    onClose();
  }, [["tidal-station"], ["tidal-station-list"]]);

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

  const onSubmit = (values: TidalStationFormValues) => {
    if (isUpdate && initialValues) {
      updateMutate({
        url: `/tidal-station/${initialValues.id}`,
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
            {isUpdate ? "Update" : "Create"} Tidal Station
          </DialogTitle>
        </DialogHeader>
        <FormProvider {...methods}>
          <TidalStationForm
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

export default CreateUpdateTidalStation;
