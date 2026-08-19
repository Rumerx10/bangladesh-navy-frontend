"use client";

import { useEffect } from "react";
import { toast } from "react-toastify";
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
import { IAlumniBatch } from "@/src/components/alumni/types";
import {
  ALUMNI_BATCHES_ENDPOINT,
  ALUMNI_BATCHES_QUERY_KEY,
} from "@/src/components/alumni/useAlumni";
import {
  AlumniBatchFormValues,
  alumniBatchSchema,
} from "../Schema/alumniBatchSchema";
import AlumniBatchForm from "./AlumniBatchForm";

/** `<input type="date">` only understands `yyyy-MM-dd`. */
const toDateInput = (value?: string) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10);
};

const EMPTY_BATCH: AlumniBatchFormValues = {
  alumniCourseId: "",
  batchNo: 1,
  titleEn: "",
  titleBn: "",
  startDate: "",
  endDate: "",
  descriptionEn: "",
  status: "ACTIVE",
  members: [],
};

interface CreateUpdateAlumniBatchProps {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: IAlumniBatch;
}

const CreateUpdateAlumniBatch = ({
  isOpen,
  onClose,
  initialValues,
}: CreateUpdateAlumniBatchProps) => {
  const isUpdate = !!initialValues;

  const methods = useForm<AlumniBatchFormValues>({
    resolver: yupResolver(alumniBatchSchema) as Resolver<AlumniBatchFormValues>,
    defaultValues: EMPTY_BATCH,
  });

  useEffect(() => {
    if (!isOpen) {
      methods.reset(EMPTY_BATCH);
      return;
    }

    methods.reset({
      alumniCourseId:
        initialValues?.alumniCourse?.id || initialValues?.alumniCourseId || "",
      batchNo: initialValues?.batchNo || 1,
      titleEn: initialValues?.titleEn || "",
      titleBn: initialValues?.titleBn || "",
      startDate: toDateInput(initialValues?.startDate),
      endDate: toDateInput(initialValues?.endDate),
      descriptionEn: initialValues?.descriptionEn || "",
      status: initialValues?.status || "ACTIVE",
      members:
        initialValues?.members?.map((member) => ({
          pNo: member.pNo || "",
          rankName: member.rankName || "",
          organization: member.organization || "",
          remarks: member.remarks || "",
        })) || [],
    });
  }, [isOpen, initialValues, methods]);

  const {
    mutate: createMutate,
    isPending: isCreating,
    error,
    reset: resetCreateError,
  } = usePost(ALUMNI_BATCHES_ENDPOINT, () => {
    toast.success("Alumni batch created successfully!");
    onClose();
  }, [ALUMNI_BATCHES_QUERY_KEY]);

  const {
    mutate: updateMutate,
    isPending: isUpdating,
    error: updateError,
    reset: resetUpdateError,
  } = usePatch(() => {
    toast.success("Alumni batch updated successfully!");
    onClose();
  }, [ALUMNI_BATCHES_QUERY_KEY]);

  useEffect(() => {
    if (!isOpen) {
      resetCreateError();
      resetUpdateError();
    }
  }, [isOpen, resetCreateError, resetUpdateError]);

  const handleClose = () => {
    resetCreateError();
    resetUpdateError();
    onClose();
  };

  const onSubmit = (values: AlumniBatchFormValues) => {
    const payload = {
      alumniCourseId: values.alumniCourseId,
      batchNo: Number(values.batchNo),
      titleEn: values.titleEn.trim(),
      startDate: values.startDate,
      endDate: values.endDate,
      status: values.status,
      // The roster is replaced wholesale, so empty cells are sent as-is —
      // that is what lets a cleared "Remarks" actually clear.
      members: values.members.map((member, index) => ({
        serial: index + 1,
        pNo: member.pNo?.trim() || "",
        rankName: member.rankName.trim(),
        organization: member.organization?.trim() || "",
        remarks: member.remarks?.trim() || "",
      })),
      // Optional top-level strings are omitted when blank — an empty string is
      // rejected by the API as a missing value.
      ...(values.titleBn?.trim() && { titleBn: values.titleBn.trim() }),
      ...(values.descriptionEn?.trim() && {
        descriptionEn: values.descriptionEn.trim(),
      }),
    };

    if (isUpdate && initialValues) {
      updateMutate({
        url: `${ALUMNI_BATCHES_ENDPOINT}/${initialValues.id}`,
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
      <DialogContent className="flex max-h-[90vh] min-w-[70vw] flex-col bg-white">
        <DialogHeader className="shrink-0">
          <DialogTitle className="text-xl font-semibold text-secondary">
            {isUpdate ? "Update" : "Create"} Alumni Batch
          </DialogTitle>
        </DialogHeader>
        <div className="scrollbar-modern mt-2 flex-1 overflow-y-auto pr-2">
          <FormProvider {...methods}>
            <AlumniBatchForm
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

export default CreateUpdateAlumniBatch;
