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
  NewsEventsFormValues,
  newsEventsSchema,
} from "../Schema/newsEventsSchema";
import { INewsEvent } from "../types";
import NewsEventsForm from "./NewsEventsForm";

interface CreateUpdateNewsEventsProps {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: INewsEvent;
}

const CreateUpdateNewsEvents = ({
  isOpen,
  onClose,
  initialValues,
}: CreateUpdateNewsEventsProps) => {
  const isUpdate = !!initialValues;

  const methods = useForm<NewsEventsFormValues>({
    resolver: yupResolver(newsEventsSchema) as Resolver<NewsEventsFormValues>,
    defaultValues: {
      titleEn: "",
      titleBn: "",
      contentEn: "",
      contentBn: "",
      newsCategoryId: "",
      image: undefined,
    },
  });

  useEffect(() => {
    if (isOpen) {
      methods.reset({
        titleEn: initialValues?.titleEn || "",
        titleBn: initialValues?.titleBn || "",
        contentEn: initialValues?.contentEn || "",
        contentBn: initialValues?.contentBn || "",
        newsCategoryId: initialValues?.newsCategory?.id || "",
        image: initialValues?.imageUrl || undefined,
      });
    } else {
      methods.reset({
        titleEn: "",
        titleBn: "",
        contentEn: "",
        contentBn: "",
        newsCategoryId: "",
        image: undefined,
      });
    }
  }, [isOpen, initialValues, methods]);

  const {
    mutate: createMutate,
    isPending: isCreating,
    error,
    reset: resetCreateError,
  } = usePost(
    "/news-events",
    () => {
      toast.success("News & event created successfully!");
      onClose();
    },
    [["news-events"]]
  );

  const {
    mutate: updateMutate,
    isPending: isUpdating,
    error: updateError,
    reset: resetUpdateError,
  } = usePatch(() => {
    toast.success("News & event updated successfully!");
    onClose();
  }, [["news-events"]]);

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

  const buildFormData = (values: NewsEventsFormValues): FormData => {
    const formData = new FormData();
    formData.append("titleEn", values.titleEn);
    formData.append("titleBn", values.titleBn);
    formData.append("contentEn", values.contentEn);
    formData.append("contentBn", values.contentBn);
    formData.append("newsCategoryId", values.newsCategoryId);
    if (values.image instanceof File) {
      formData.append("image", values.image);
    }
    return formData;
  };

  const onSubmit = (values: NewsEventsFormValues) => {
    const formData = buildFormData(values);
    if (isUpdate && initialValues) {
      updateMutate({ url: `/news-events/${initialValues.id}`, data: formData });
    } else {
      createMutate({ data: formData });
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) handleClose();
      }}
    >
      <DialogContent className="bg-white min-w-[65vw] max-h-[90vh] flex flex-col">
        <DialogHeader className="shrink-0">
          <DialogTitle className="text-secondary text-xl font-semibold">
            {isUpdate ? "Update" : "Create"} News & Event
          </DialogTitle>
        </DialogHeader>
        <div className="overflow-y-auto flex-1 mt-2 pr-2 scrollbar-modern">
          <FormProvider {...methods}>
            <NewsEventsForm
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

export default CreateUpdateNewsEvents;
