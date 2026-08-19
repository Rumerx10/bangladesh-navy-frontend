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
import { INotice } from "@/src/components/notices/types";
import { NoticeFormValues, noticeSchema } from "../Schema/noticeSchema";
import NoticeForm from "./NoticeForm";

const NOTICES_ENDPOINT = "/notice-management";
/** Both the admin table and the public list are refreshed after a write. */
const INVALIDATE_KEYS = [["notice-management"], ["notice-management-list"]];

interface CreateUpdateNoticeProps {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: INotice;
}

const EMPTY_VALUES: NoticeFormValues = {
  noticeNumber: "",
  titleEn: "",
  titleBn: "",
  descriptionEn: "",
  descriptionBn: "",
  type: "PERMANENT",
  publishedAt: "",
  status: "ACTIVE",
  pdf: undefined,
};

const CreateUpdateNotice = ({
  isOpen,
  onClose,
  initialValues,
}: CreateUpdateNoticeProps) => {
  const isUpdate = !!initialValues;

  const methods = useForm<NoticeFormValues>({
    resolver: yupResolver(noticeSchema) as Resolver<NoticeFormValues>,
    defaultValues: EMPTY_VALUES,
  });

  useEffect(() => {
    if (!isOpen) {
      methods.reset(EMPTY_VALUES);
      return;
    }
    methods.reset({
      noticeNumber: initialValues?.noticeNumber || "",
      titleEn: initialValues?.titleEn || "",
      titleBn: initialValues?.titleBn || "",
      descriptionEn: initialValues?.descriptionEn || "",
      descriptionBn: initialValues?.descriptionBn || "",
      type: initialValues?.type || "PERMANENT",
      // <input type="date"> only accepts yyyy-MM-dd.
      publishedAt: initialValues?.publishedAt
        ? initialValues.publishedAt.split("T")[0]
        : "",
      status: initialValues?.status || "ACTIVE",
      pdf: initialValues?.pdfUrl || undefined,
    });
  }, [isOpen, initialValues, methods]);

  const {
    mutate: createMutate,
    isPending: isCreating,
    error,
    reset: resetCreateError,
  } = usePost(
    NOTICES_ENDPOINT,
    () => {
      toast.success("Notice created successfully!");
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
    toast.success("Notice updated successfully!");
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

  const buildFormData = (values: NoticeFormValues): FormData => {
    const formData = new FormData();
    formData.append("noticeNumber", values.noticeNumber);
    formData.append("titleEn", values.titleEn);
    formData.append("type", values.type);
    formData.append("status", values.status || "ACTIVE");
    // The API stores an ISO timestamp; the date input gives yyyy-MM-dd.
    formData.append("publishedAt", new Date(values.publishedAt).toISOString());

    // Optional fields — only sent when filled, an empty string is rejected by
    // the API as a missing value.
    if (values.titleBn?.trim()) {
      formData.append("titleBn", values.titleBn.trim());
    }
    if (values.descriptionEn?.trim()) {
      formData.append("descriptionEn", values.descriptionEn.trim());
    }
    if (values.descriptionBn?.trim()) {
      formData.append("descriptionBn", values.descriptionBn.trim());
    }

    // A new upload replaces whatever was attached before; leaving the field off
    // keeps the existing PDF.
    if (values.pdf instanceof File) {
      formData.append("pdf", values.pdf);
    }

    return formData;
  };

  const onSubmit = (values: NoticeFormValues) => {
    const formData = buildFormData(values);
    const config = { headers: { "Content-Type": "multipart/form-data" } };

    if (isUpdate && initialValues) {
      updateMutate({
        url: `${NOTICES_ENDPOINT}/${initialValues.id}`,
        data: formData,
        config,
      });
    } else {
      createMutate({ data: formData, config });
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
            {isUpdate ? "Update" : "Create"} Notice
          </DialogTitle>
        </DialogHeader>
        <div className="overflow-y-auto flex-1 mt-2 pr-2 scrollbar-modern">
          <FormProvider {...methods}>
            <NoticeForm
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

export default CreateUpdateNotice;
