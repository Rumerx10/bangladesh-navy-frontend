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
import { ICourseStatistic } from "@/src/components/course-statistics/types";
import {
  COURSE_STATISTICS_ENDPOINT,
  COURSE_STATISTICS_LIST_QUERY_KEY,
  COURSE_STATISTICS_QUERY_KEY,
} from "@/src/components/course-statistics/useCourseStatistics";
import {
  CourseStatisticFormValues,
  courseStatisticSchema,
} from "../Schema/courseStatisticSchema";
import CourseStatisticForm from "./CourseStatisticForm";

const toNumberOrNull = (value?: number) =>
  value === undefined || Number.isNaN(value) ? null : Number(value);

const EMPTY_COURSE_STATISTIC: CourseStatisticFormValues = {
  courseName: "",
  duration: "",
  coursesConducted: undefined,
  bn: undefined,
  otherMaritimeOrg: undefined,
  overseas: undefined,
  totalTrainees: undefined,
  remarks: "",
  serial: 1,
  status: "ACTIVE",
};

interface CreateUpdateCourseStatisticProps {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: ICourseStatistic;
  /** Serial suggested for a new row — one past the current last row. */
  nextSerial?: number;
}

const CreateUpdateCourseStatistic = ({
  isOpen,
  onClose,
  initialValues,
  nextSerial = 1,
}: CreateUpdateCourseStatisticProps) => {
  const isUpdate = !!initialValues;

  const methods = useForm<CourseStatisticFormValues>({
    resolver: yupResolver(courseStatisticSchema) as Resolver<CourseStatisticFormValues>,
    defaultValues: EMPTY_COURSE_STATISTIC,
  });

  useEffect(() => {
    if (!isOpen) {
      methods.reset(EMPTY_COURSE_STATISTIC);
      return;
    }

    methods.reset({
      courseName: initialValues?.courseName || "",
      duration: initialValues?.duration || "",
      coursesConducted: initialValues?.coursesConducted ?? undefined,
      bn: initialValues?.bn ?? undefined,
      otherMaritimeOrg: initialValues?.otherMaritimeOrg ?? undefined,
      overseas: initialValues?.overseas ?? undefined,
      totalTrainees: initialValues?.totalTrainees ?? undefined,
      remarks: initialValues?.remarks || "",
      serial: initialValues?.serial ?? nextSerial,
      status: initialValues?.status || "ACTIVE",
    });
  }, [isOpen, initialValues, nextSerial, methods]);

  const invalidateKeys = [
    COURSE_STATISTICS_QUERY_KEY,
    COURSE_STATISTICS_LIST_QUERY_KEY,
  ];

  const {
    mutate: createMutate,
    isPending: isCreating,
    error,
    reset: resetCreateError,
  } = usePost(
    COURSE_STATISTICS_ENDPOINT,
    () => {
      toast.success("Course statistics row created successfully!");
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
    toast.success("Course statistics row updated successfully!");
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

  const onSubmit = (values: CourseStatisticFormValues) => {
    // Optional fields are sent as `null` on update so a cleared figure actually
    // clears; on create they are omitted and the API stores its own default.
    const optional = {
      duration: values.duration?.trim() || null,
      coursesConducted: toNumberOrNull(values.coursesConducted),
      bn: toNumberOrNull(values.bn),
      otherMaritimeOrg: toNumberOrNull(values.otherMaritimeOrg),
      overseas: toNumberOrNull(values.overseas),
      totalTrainees: toNumberOrNull(values.totalTrainees),
      remarks: values.remarks?.trim() || null,
    };

    const payload: Record<string, unknown> = {
      courseName: values.courseName.trim(),
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
        url: `${COURSE_STATISTICS_ENDPOINT}/${initialValues.id}`,
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
            {isUpdate ? "Update" : "Create"} Course Statistics Row
          </DialogTitle>
        </DialogHeader>
        <div className="scrollbar-modern mt-2 flex-1 overflow-y-auto pr-2">
          <FormProvider {...methods}>
            <CourseStatisticForm
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

export default CreateUpdateCourseStatistic;
