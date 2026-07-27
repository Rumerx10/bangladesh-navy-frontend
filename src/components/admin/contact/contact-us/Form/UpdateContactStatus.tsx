"use client";

import { toast } from "react-toastify";
import { useEffect } from "react";
import { usePatch } from "@/src/hooks/usePatch";
import { IContact } from "../types";
import ContactForm from "./ContactForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, Resolver, useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { ContactFormValues, contactSchema } from "../schema/ContactSchema";

interface UpdateContactStatusProps {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: IContact;
}

const UpdateContactStatus = ({
  isOpen,
  onClose,
  initialValues,
}: UpdateContactStatusProps) => {
  const methods = useForm<ContactFormValues>({
    resolver: yupResolver(contactSchema) as Resolver<ContactFormValues>,
    defaultValues: {
      status: initialValues?.status || "PENDING",
    },
  });

  useEffect(() => {
    if (isOpen) {
      methods.reset({
        status: initialValues?.status || "PENDING",
      });
    }
  }, [isOpen, initialValues, methods]);

  const {
    mutate: updateStatus,
    isPending,
    error,
    reset: resetError,
  } = usePatch(() => {
    toast.success("Contact status updated successfully!");
    onClose();
  }, [["contact-management"]]);

  const handleClose = () => {
    resetError();
    onClose();
  };

  useEffect(() => {
    if (!isOpen) {
      resetError();
    }
  }, [isOpen, resetError]);

  const onSubmit = (values: ContactFormValues) => {
    if (initialValues?.id) {
      updateStatus({
        url: `/contact/${initialValues.id}`,
        data: { status: values.status },
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
      <DialogContent className="bg-white min-w-[40vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-secondary text-xl font-semibold">
            Update Contact Status
          </DialogTitle>
        </DialogHeader>

        {/* Contact Details */}
        {initialValues && (
          <div className="space-y-3 bg-gray-50 rounded-lg p-4 border border-gray-100">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Name</p>
                <p className="text-sm font-medium text-secondary-dark">{initialValues.name}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Email</p>
                <p className="text-sm font-medium text-secondary-dark">{initialValues.email}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Phone</p>
                <p className="text-sm font-medium text-secondary-dark">{initialValues.phone}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Type</p>
                <p className="text-sm font-medium text-secondary-dark">
                  {initialValues.contactType === "CONTACT_INFORMATION" ? "Information" : "Support"}
                </p>
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Message</p>
              <p className="text-sm text-secondary-dark bg-white rounded p-3 border border-gray-100">
                {initialValues.message}
              </p>
            </div>
          </div>
        )}

        <FormProvider {...methods}>
          <ContactForm
            onSubmit={onSubmit}
            onCancel={handleClose}
            isPending={isPending}
            error={error}
          />
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateContactStatus;