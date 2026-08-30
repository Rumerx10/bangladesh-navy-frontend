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
import { IAlumniCourse } from "@/src/components/alumni/types";
import {
  ALUMNI_COURSES_ENDPOINT,
  ALUMNI_COURSES_LIST_QUERY_KEY,
  ALUMNI_COURSES_QUERY_KEY,
} from "@/src/components/alumni/useAlumni";
import {
  AlumniCourseFormValues,
  alumniCourseSchema,
} from "../Schema/alumniCourseSchema";
import AlumniCourseForm from "./AlumniCourseForm";

const EMPTY_COURSE: AlumniCourseFormValues = {
  nameEn: "",
  nameBn: "",
  status: "ACTIVE",
};

interface CreateUpdateAlumniCourseProps {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: IAlumniCourse;
}

const CreateUpdateAlumniCourse = ({
  isOpen,
  onClose,
  initialValues,
}: CreateUpdateAlumniCourseProps) => {
  const isUpdate = !!initialValues;

  const methods = useForm<AlumniCourseFormValues>({
    resolver: yupResolver(
      alumniCourseSchema
    ) as Resolver<AlumniCourseFormValues>,
    defaultValues: EMPTY_COURSE,
  });

  useEffect(() => {
    if (isOpen) {
      methods.reset({
        nameEn: initialValues?.nameEn || "",
        nameBn: initialValues?.nameBn || "",
        status: initialValues?.status || "ACTIVE",
      });
    } else {
      methods.reset(EMPTY_COURSE);
    }
  }, [isOpen, initialValues, methods]);

  const invalidateKeys = [
    ALUMNI_COURSES_QUERY_KEY,
    ALUMNI_COURSES_LIST_QUERY_KEY,
  ];

  const {
    mutate: createMutate,
    isPending: isCreating,
    error,
    reset: resetCreateError,
  } = usePost(
    ALUMNI_COURSES_ENDPOINT,
    () => {
      toast.success("Course created successfully!");
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
    toast.success("Course updated successfully!");
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

  const onSubmit = (values: AlumniCourseFormValues) => {
    const payload = {
      nameEn: values.nameEn.trim(),
      status: values.status,
      ...(values.nameBn?.trim() && { nameBn: values.nameBn.trim() }),
    };

    if (isUpdate && initialValues) {
      updateMutate({
        url: `${ALUMNI_COURSES_ENDPOINT}/${initialValues.id}`,
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
      <DialogContent className="scrollbar-modern max-h-[90vh] min-w-[40vw] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-secondary">
            {isUpdate ? "Update" : "Create"} Alumni Course
          </DialogTitle>
        </DialogHeader>
        <FormProvider {...methods}>
          <AlumniCourseForm
            isEditMode={isUpdate}
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

export default CreateUpdateAlumniCourse;
