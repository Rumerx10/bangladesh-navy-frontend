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
import { IBatch } from "@/src/components/batches/types";
import {
  BATCHES_ENDPOINT,
  BATCHES_LIST_QUERY_KEY,
  BATCHES_QUERY_KEY,
} from "@/src/components/batches/useBatches";
import { ALUMNI_MEMBERS_TREE_QUERY_KEY } from "@/src/components/alumni/useAlumni";
import { BatchFormValues, batchSchema } from "../Schema/batchSchema";
import BatchForm from "./BatchForm";

/** `<input type="date">` only understands `yyyy-MM-dd`. */
const toDateInput = (value?: string | null) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10);
};

/** "2026-01-05" → "2026-01-05T00:00:00.000Z", the format the API stores. */
const toIsoDate = (value?: string) => {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
};

const emptyBatch = (courseId = ""): BatchFormValues => ({
  courseId,
  name: "",
  startDate: "",
  endDate: "",
  serial: 1,
  status: "ACTIVE",
});

interface CreateUpdateBatchProps {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: IBatch;
  /** Pre-fills the course select when opened from a course-filtered view. */
  initialCourseId?: string;
  /** Serial suggested for a new batch — one past the current last row. */
  nextSerial?: number;
}

const CreateUpdateBatch = ({
  isOpen,
  onClose,
  initialValues,
  initialCourseId,
  nextSerial = 1,
}: CreateUpdateBatchProps) => {
  const isUpdate = !!initialValues;

  const methods = useForm<BatchFormValues>({
    resolver: yupResolver(batchSchema) as Resolver<BatchFormValues>,
    defaultValues: emptyBatch(initialCourseId),
  });

  useEffect(() => {
    if (!isOpen) {
      methods.reset(emptyBatch());
      return;
    }

    methods.reset({
      courseId: initialValues?.courseId || initialCourseId || "",
      name: initialValues?.name || "",
      startDate: toDateInput(initialValues?.startDate),
      endDate: toDateInput(initialValues?.endDate),
      serial: initialValues?.serial ?? nextSerial,
      status: initialValues?.status || "ACTIVE",
    });
  }, [isOpen, initialValues, initialCourseId, nextSerial, methods]);

  // A batch rename or reorder changes the batch dropdown on the members tab
  // and the public alumni tree, so both are dropped alongside the batch lists.
  const invalidateKeys = [
    BATCHES_QUERY_KEY,
    BATCHES_LIST_QUERY_KEY,
    ALUMNI_MEMBERS_TREE_QUERY_KEY,
  ];

  const {
    mutate: createMutate,
    isPending: isCreating,
    error,
    reset: resetCreateError,
  } = usePost(
    BATCHES_ENDPOINT,
    () => {
      toast.success("Batch created successfully!");
      onClose();
    },
    invalidateKeys
  );

  const {
    mutate: updateMutate,
    isPending: isUpdating,
    error: updateError,
    reset: resetUpdateError,
  } = usePatch(() => {
    toast.success("Batch updated successfully!");
    onClose();
  }, invalidateKeys);

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

  const onSubmit = (values: BatchFormValues) => {
    // Optional dates are sent as `null` on update so a cleared date actually
    // clears; on create they are omitted and the API stores its own default.
    const optional = {
      startDate: toIsoDate(values.startDate),
      endDate: toIsoDate(values.endDate),
    };

    const payload: Record<string, unknown> = {
      courseId: values.courseId,
      name: values.name.trim(),
      serial: Number(values.serial),
      status: values.status,
      ...(isUpdate
        ? optional
        : Object.fromEntries(
            Object.entries(optional).filter(([, value]) => value !== null)
          )),
    };

    if (isUpdate && initialValues) {
      updateMutate({
        url: `${BATCHES_ENDPOINT}/${initialValues.id}`,
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
            {isUpdate ? "Update" : "Create"} Batch
          </DialogTitle>
        </DialogHeader>
        <div className="scrollbar-modern mt-2 flex-1 overflow-y-auto pr-2">
          <FormProvider {...methods}>
            <BatchForm
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

export default CreateUpdateBatch;
