"use client";

import ErrorMessage from "@/src/components/shared/Errors/ErrorMessage";
import ControlledInputField from "@/src/components/shared/FromController/ControlledInputField";
import ControlledSelectField from "@/src/components/shared/FromController/ControlledSelectField";
import ControlledTextareaField from "@/src/components/shared/FromController/ControlledTextareaField";
import InputLabel from "@/src/components/shared/InputLabel";
import SubmitButton from "@/src/components/shared/SubmitButton";
import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { usePatch } from "@/src/hooks/usePatch";
import { usePost } from "@/src/hooks/usePost";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { FormProvider, Resolver, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { IAttribute } from "../types";

const attributeSchema = Yup.object({
  name: Yup.string().required("Attribute name is required"),
  description: Yup.string().optional().default(""),
  status: Yup.string().oneOf(["ACTIVE", "INACTIVE"]).required(),
});

type AttributeFormValues = Yup.InferType<typeof attributeSchema>;
interface CreateUpdateAttributeProps {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: IAttribute;
}

const STATUS_OPTIONS = [
  { label: "Active", value: "ACTIVE" },
  { label: "Inactive", value: "INACTIVE" },
];

export default function CreateUpdateAttribute({
  isOpen,
  onClose,
  initialValues,
}: CreateUpdateAttributeProps) {
  const isUpdate = !!initialValues;

  const methods = useForm<AttributeFormValues>({
    resolver: yupResolver(attributeSchema) as Resolver<AttributeFormValues>,
    defaultValues: { name: "", description: "", status: "ACTIVE" },
  });

  useEffect(() => {
    if (isOpen) {
      methods.reset({
        name: initialValues?.name || "",
        description: initialValues?.description || "",
        status:
          String(initialValues?.status || "ACTIVE").toUpperCase() === "INACTIVE"
            ? "INACTIVE"
            : "ACTIVE",
      });
    } else {
      methods.reset({ name: "", description: "", status: "ACTIVE" });
    }
  }, [isOpen, initialValues, methods]);

  const {
    mutate: createMutate,
    isPending: isCreating,
    error,
    reset: resetCreateError,
  } = usePost(
    "/product-attribute",
    () => {
      toast.success("Attribute created successfully!");
      onClose();
    },
    [["product-attributes"]]
  );

  const {
    mutate: updateMutate,
    isPending: isUpdating,
    error: updateError,
    reset: resetUpdateError,
  } = usePatch(() => {
    toast.success("Attribute updated successfully!");
    onClose();
  }, [["product-attributes"]]);

  const isPending = isCreating || isUpdating;

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

  const onSubmit = (values: AttributeFormValues) => {
    const payload = {
      name: values.name,
      description: values.description || "",
      status: values.status,
    };

    if (isUpdate && initialValues) {
      updateMutate({
        url: `/product-attribute/${initialValues.id}`,
        data: payload,
      });
      return;
    }

    createMutate({ data: payload });
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) handleClose();
      }}
    >
      <DialogContent className="bg-white sm:max-w-125">
        <DialogHeader>
          <DialogTitle className="text-secondary text-xl font-semibold">
            {isUpdate ? "Update" : "Create"} Attribute
          </DialogTitle>
        </DialogHeader>

        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="w-full space-y-5 mt-2"
          >
            <div>
              <InputLabel label="Attribute Name" required />
              <ControlledInputField
                className="bg-light"
                name="name"
                placeholder="e.g. Color, Size, Weight"
              />
            </div>

            <div>
              <InputLabel label="Description" />
              <ControlledTextareaField
                className="bg-light h-28"
                name="description"
                placeholder="Enter attribute description"
              />
            </div>

            <div>
              <InputLabel label="Status" required />
              <ControlledSelectField
                className="bg-light"
                name="status"
                placeholder="Select status"
                options={STATUS_OPTIONS}
              />
            </div>

            <ErrorMessage error={error || updateError} />

            <div className="flex items-center justify-end gap-4">
              <Button
                type="button"
                onClick={handleClose}
                className="text-secondary-foreground bg-transparent hover:bg-transparent border shadow-none cursor-pointer"
              >
                Cancel
              </Button>
              <SubmitButton
                isLoading={isPending}
                label={isUpdate ? "Update" : "Create"}
              />
            </div>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
