"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { usePatch } from "@/src/hooks/usePatch";
import { usePost } from "@/src/hooks/usePost";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  AddressFormValues,
  addressSchema,
  EMPTY_ADDRESS,
  toAddressPayload,
} from "../Schema/addressSchema";
import { ADDRESSES_QUERY_KEY, ICreateUpdateAddressProps } from "../types";
import AddressForm from "./AddressForm";

const CreateUpdateAddress = ({
  isOpen,
  onClose,
  initialValues,
}: ICreateUpdateAddressProps) => {
  const isUpdate = !!initialValues;

  const methods = useForm<AddressFormValues>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: yupResolver(addressSchema) as any,
    defaultValues: EMPTY_ADDRESS,
  });

  useEffect(() => {
    if (!isOpen) return;
    methods.reset(
      initialValues
        ? {
            label: initialValues.label ?? "",
            fullName: initialValues.fullName,
            phone: initialValues.phone,
            address: initialValues.address,
            city: initialValues.city,
            postcode: initialValues.postcode ?? "",
            country: initialValues.country,
            isDefault: initialValues.isDefault,
          }
        : EMPTY_ADDRESS
    );
  }, [isOpen, initialValues, methods]);

  const {
    mutate: createMutate,
    isPending: isCreating,
    error: createError,
    reset: resetCreateError,
  } = usePost(
    "/address",
    () => {
      toast.success("Address saved");
      onClose();
    },
    [ADDRESSES_QUERY_KEY]
  );

  const {
    mutate: updateMutate,
    isPending: isUpdating,
    error: updateError,
    reset: resetUpdateError,
  } = usePatch(() => {
    toast.success("Address updated");
    onClose();
  }, [ADDRESSES_QUERY_KEY]);

  useEffect(() => {
    if (!isOpen) {
      resetCreateError();
      resetUpdateError();
    }
  }, [isOpen, resetCreateError, resetUpdateError]);

  const onSubmit = (values: AddressFormValues) => {
    const payload = toAddressPayload(values);

    if (initialValues) {
      // Blank optional fields are sent as empty strings on edit, so clearing
      // a label or postcode actually clears it.
      updateMutate({
        url: `/address/${initialValues.id}`,
        data: {
          ...payload,
          label: values.label?.trim() ?? "",
          postcode: values.postcode?.trim() ?? "",
        },
      });
    } else {
      createMutate({ data: { ...payload, isDefault: values.isDefault } });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[90vh] overflow-y-auto bg-card sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-secondary">
            {isUpdate ? "Edit address" : "Add a new address"}
          </DialogTitle>
          <DialogDescription>
            {isUpdate
              ? "Orders you have already placed keep the address they were placed with."
              : "Saved addresses can be picked at checkout."}
          </DialogDescription>
        </DialogHeader>

        <FormProvider {...methods}>
          <AddressForm
            isEditMode={isUpdate}
            onSubmit={onSubmit}
            onCancel={onClose}
            isPending={isCreating || isUpdating}
            error={createError || updateError}
          />
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default CreateUpdateAddress;
