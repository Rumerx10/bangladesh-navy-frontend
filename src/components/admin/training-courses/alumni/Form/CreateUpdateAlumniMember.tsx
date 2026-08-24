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
import { useCoursesList } from "@/src/components/courses/useCourses";
import { IAlumniMember } from "@/src/components/alumni/types";
import {
  ALUMNI_MEMBERS_ENDPOINT,
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

const EMPTY_MEMBER: AlumniMemberFormValues = {
  courseId: "",
  rankAndName: "",
  pNo: "",
  organization: "BN",
  remarks: "",
  serial: 1,
  status: "ACTIVE",
};

interface CreateUpdateAlumniMemberProps {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: IAlumniMember;
}

const CreateUpdateAlumniMember = ({
  isOpen,
  onClose,
  initialValues,
}: CreateUpdateAlumniMemberProps) => {
  const isUpdate = !!initialValues;

  const { courses } = useCoursesList();
  const { groups } = useAlumniTree({ includeInactive: true });

  const courseOptions = useMemo(
    () => mapToSelectOptions(courses, "name", "id"),
    [courses]
  );

  const methods = useForm<AlumniMemberFormValues>({
    resolver: yupResolver(
      alumniMemberSchema
    ) as Resolver<AlumniMemberFormValues>,
    defaultValues: EMPTY_MEMBER,
  });

  const { watch, setValue } = methods;
  const courseId = watch("courseId");

  useEffect(() => {
    if (!isOpen) {
      methods.reset(EMPTY_MEMBER);
      return;
    }

    methods.reset({
      courseId: initialValues?.courseId || "",
      rankAndName: initialValues?.rankAndName || "",
      pNo: initialValues?.pNo || "",
      organization: initialValues?.organization || "BN",
      remarks: initialValues?.remarks || "",
      serial: initialValues?.serial ?? 1,
      status: initialValues?.status || "ACTIVE",
    });
  }, [isOpen, initialValues, methods]);

  // Picking a course on a new entry continues that course's numbering rather
  // than restarting at 1. An existing member keeps the serial it was saved with.
  useEffect(() => {
    if (!isOpen || isUpdate || !courseId) return;
    setValue("serial", nextMemberSerial(groups, courseId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId, isOpen, isUpdate]);

  const invalidateKeys = [
    ALUMNI_MEMBERS_QUERY_KEY,
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
      courseId: values.courseId,
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
            courseOptions={courseOptions}
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
