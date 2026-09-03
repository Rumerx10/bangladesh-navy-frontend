"use client";

import { useEffect, useMemo } from "react";
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
import { mapToSelectOptions } from "@/src/utils/mapToSelectOptions";
import { useBatchesList } from "@/src/components/batches/useBatches";
import { IAlumniMember } from "@/src/components/alumni/types";
import {
  ALUMNI_MEMBERS_ENDPOINT,
  ALUMNI_MEMBERS_LIST_QUERY_KEY,
  ALUMNI_MEMBERS_QUERY_KEY,
  ALUMNI_MEMBERS_TREE_QUERY_KEY,
  nextMemberSerial,
  useAlumniTree,
} from "@/src/components/alumni/useAlumni";
import {
  AlumniMemberFormValues,
  alumniMemberSchema,
} from "../Schema/alumniMemberSchema";
import AlumniMemberForm from "./AlumniMemberForm";

const emptyMember = (batchId = ""): AlumniMemberFormValues => ({
  batchId,
  rankAndName: "",
  pNo: "",
  organization: "BN",
  remarks: "",
  serial: 1,
  status: "ACTIVE",
});

interface CreateUpdateAlumniMemberProps {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: IAlumniMember;
  /** Pre-fills the batch select when opened from a batch-filtered view. */
  initialBatchId?: string;
}

const CreateUpdateAlumniMember = ({
  isOpen,
  onClose,
  initialValues,
  initialBatchId,
}: CreateUpdateAlumniMemberProps) => {
  const isUpdate = !!initialValues;

  const { batches } = useBatchesList();
  const { groups } = useAlumniTree({ includeInactive: true });

  const batchOptions = useMemo(
    () =>
      mapToSelectOptions(
        batches,
        (batch) => (batch.courseName ? `${batch.courseName} — ${batch.name}` : batch.name),
        "id"
      ),
    [batches]
  );

  const methods = useForm<AlumniMemberFormValues>({
    resolver: yupResolver(
      alumniMemberSchema
    ) as Resolver<AlumniMemberFormValues>,
    defaultValues: emptyMember(initialBatchId),
  });

  const { watch, setValue } = methods;
  const batchId = watch("batchId");

  useEffect(() => {
    if (!isOpen) {
      methods.reset(emptyMember());
      return;
    }

    methods.reset({
      batchId: initialValues?.batchId || initialBatchId || "",
      rankAndName: initialValues?.rankAndName || "",
      pNo: initialValues?.pNo || "",
      organization: initialValues?.organization || "BN",
      remarks: initialValues?.remarks || "",
      serial: initialValues?.serial ?? 1,
      status: initialValues?.status || "ACTIVE",
    });
  }, [isOpen, initialValues, initialBatchId, methods]);

  // Picking a batch on a new entry continues that batch's numbering rather
  // than restarting at 1. An existing member keeps the serial it was saved with.
  useEffect(() => {
    if (!isOpen || isUpdate || !batchId) return;
    setValue("serial", nextMemberSerial(groups, batchId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [batchId, isOpen, isUpdate]);

  const invalidateKeys = [
    ALUMNI_MEMBERS_QUERY_KEY,
    ALUMNI_MEMBERS_LIST_QUERY_KEY,
    ALUMNI_MEMBERS_TREE_QUERY_KEY,
  ];

  const {
    mutate: createMutate,
    isPending: isCreating,
    error,
    reset: resetCreateError,
  } = usePost(
    ALUMNI_MEMBERS_ENDPOINT,
    () => {
      toast.success("Alumni member added successfully!");
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
    toast.success("Alumni member updated successfully!");
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

  const onSubmit = (values: AlumniMemberFormValues) => {
    // On update the optional cells go out as `null` so a cleared field actually
    // clears; on create they are simply left out.
    const optional = {
      pNo: values.pNo?.trim() || null,
      organization: values.organization?.trim() || null,
      remarks: values.remarks?.trim() || null,
    };

    const payload: Record<string, unknown> = {
      batchId: values.batchId,
      rankAndName: values.rankAndName.trim(),
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
        url: `${ALUMNI_MEMBERS_ENDPOINT}/${initialValues.id}`,
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
      <DialogContent className="scrollbar-modern max-h-[90vh] min-w-[50vw] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-secondary">
            {isUpdate ? "Update" : "Add"} Alumni Member
          </DialogTitle>
        </DialogHeader>
        <FormProvider {...methods}>
          <AlumniMemberForm
            isEditMode={isUpdate}
            batchOptions={batchOptions}
            onSubmit={onSubmit}
            onCancel={handleClose}
            isPending={isCreating || isUpdating}
            error={error || updateError}
          />
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default CreateUpdateAlumniMember;
