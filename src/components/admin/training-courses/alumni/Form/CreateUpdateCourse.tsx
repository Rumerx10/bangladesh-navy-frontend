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
import { ICourse } from "@/src/components/courses/types";
import {
  COURSES_ENDPOINT,
  COURSES_LIST_QUERY_KEY,
  COURSES_QUERY_KEY,
} from "@/src/components/courses/useCourses";
import { ALUMNI_MEMBERS_TREE_QUERY_KEY } from "@/src/components/alumni/useAlumni";
import { CourseFormValues, courseSchema } from "../Schema/courseSchema";
import CourseForm from "./CourseForm";

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

const toNumberOrNull = (value?: number) =>
  value === undefined || Number.isNaN(value) ? null : Number(value);

const EMPTY_COURSE: CourseFormValues = {
  name: "",
  coursesConducted: undefined,
  duration: "",
  startDate: "",
  endDate: "",
  bn: undefined,
  otherMaritimeOrg: undefined,
  overseas: undefined,
  totalTrainees: undefined,
  remarks: "",
  serial: 1,
  status: "ACTIVE",
};

interface CreateUpdateCourseProps {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: ICourse;
  /** Serial suggested for a new course — one past the current last row. */
  nextSerial?: number;
}

const CreateUpdateCourse = ({
  isOpen,
  onClose,
  initialValues,
  nextSerial = 1,
}: CreateUpdateCourseProps) => {
  const isUpdate = !!initialValues;

  const methods = useForm<CourseFormValues>({
    resolver: yupResolver(courseSchema) as Resolver<CourseFormValues>,
    defaultValues: EMPTY_COURSE,
  });

  useEffect(() => {
    if (!isOpen) {
      methods.reset(EMPTY_COURSE);
      return;
    }

    methods.reset({
      name: initialValues?.name || "",
      coursesConducted: initialValues?.coursesConducted ?? undefined,
      duration: initialValues?.duration || "",
      startDate: toDateInput(initialValues?.startDate),
      endDate: toDateInput(initialValues?.endDate),
      bn: initialValues?.bn ?? undefined,
      otherMaritimeOrg: initialValues?.otherMaritimeOrg ?? undefined,
      overseas: initialValues?.overseas ?? undefined,
      totalTrainees: initialValues?.totalTrainees ?? undefined,
      remarks: initialValues?.remarks || "",
      serial: initialValues?.serial ?? nextSerial,
      status: initialValues?.status || "ACTIVE",
    });
  }, [isOpen, initialValues, nextSerial, methods]);

  // A course rename or reorder changes the public statistics table, the course
  // dropdown on the members tab and the alumni tree, so all three are dropped.
  const invalidateKeys = [
    COURSES_QUERY_KEY,
    COURSES_LIST_QUERY_KEY,
    ALUMNI_MEMBERS_TREE_QUERY_KEY,
  ];

  const {
    mutate: createMutate,
    isPending: isCreating,
    error,
    reset: resetCreateError,
  } = usePost(
    COURSES_ENDPOINT,
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

  const onSubmit = (values: CourseFormValues) => {
    // Optional fields are sent as `null` on update so a cleared figure actually
    // clears; on create they are omitted and the API stores its own default.
    const optional = {
      coursesConducted: toNumberOrNull(values.coursesConducted),
      duration: values.duration?.trim() || null,
      startDate: toIsoDate(values.startDate),
      endDate: toIsoDate(values.endDate),
      bn: toNumberOrNull(values.bn),
      otherMaritimeOrg: toNumberOrNull(values.otherMaritimeOrg),
      overseas: toNumberOrNull(values.overseas),
      totalTrainees: toNumberOrNull(values.totalTrainees),
      remarks: values.remarks?.trim() || null,
    };

    const payload: Record<string, unknown> = {
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
        url: `${COURSES_ENDPOINT}/${initialValues.id}`,
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
            {isUpdate ? "Update" : "Create"} Course
          </DialogTitle>
        </DialogHeader>
        <div className="scrollbar-modern mt-2 flex-1 overflow-y-auto pr-2">
          <FormProvider {...methods}>
            <CourseForm
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

export default CreateUpdateCourse;
