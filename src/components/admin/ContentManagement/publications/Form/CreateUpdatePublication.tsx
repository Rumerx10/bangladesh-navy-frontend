"use client";

import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, Resolver, useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { IPublication } from "@/src/data/publications";
import {
  publicationSchema,
  PublicationFormValues,
} from "../Schema/publicationSchema";
import PublicationForm from "./PublicationForm";

interface CreateUpdatePublicationProps {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: IPublication;
  onSubmit: (values: Omit<IPublication, "id">, id?: string) => void;
}

const CreateUpdatePublication = ({
  isOpen,
  onClose,
  initialValues,
  onSubmit,
}: CreateUpdatePublicationProps) => {
  const isUpdate = !!initialValues;

  const methods = useForm<PublicationFormValues>({
    resolver: yupResolver(publicationSchema) as Resolver<PublicationFormValues>,
    defaultValues: { image: "", title: "", code: "", date: "" },
  });

  useEffect(() => {
    if (isOpen) {
      methods.reset({
        image: initialValues?.image || "",
        title: initialValues?.title || "",
        // The field only holds the number after the fixed "P" prefix.
        code: initialValues?.code?.match(/\d+$/)?.[0] || "",
        date: initialValues?.date || "",
      });
    } else {
      methods.reset({ image: "", title: "", code: "", date: "" });
    }
  }, [isOpen, initialValues, methods]);

  // Replace with API: once the `/publication` backend endpoint exists,
  // build a FormData payload here (like CreateUpdateProducts.tsx does) and
  // submit it via usePost/usePatch instead of resolving a local object URL
  // and handing the plain values back to the parent's local state.
  const handleSubmit = (values: PublicationFormValues) => {
    const image =
      values.image instanceof File
        ? URL.createObjectURL(values.image)
        : values.image;

    onSubmit(
      {
        title: values.title,
        code: `P${values.code}`,
        date: values.date,
        image,
      },
      initialValues?.id
    );
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
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
              onSubmit={handleSubmit}
              onCancel={onClose}
            />
          </FormProvider>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateUpdatePublication;
