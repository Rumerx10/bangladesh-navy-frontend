"use client";

import { useEffect } from "react";
import { CalendarRange, Users } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { useGet } from "@/src/hooks/useGet";
import { mapToSelectOptions } from "@/src/utils/mapToSelectOptions";
import InputLabel from "@/src/components/shared/InputLabel";
import Paragraph from "@/src/components/shared/Paragraph";
import SubmitButton from "@/src/components/shared/SubmitButton";
import ErrorMessage from "@/src/components/shared/Errors/ErrorMessage";
import ControlledInputField from "@/src/components/shared/FromController/ControlledInputField";
import ControlledSelectField from "@/src/components/shared/FromController/ControlledSelectField";
import ControlledTextareaField from "@/src/components/shared/FromController/ControlledTextareaField";
import { Button } from "@/src/components/ui/button";
import { ErrorType } from "@/src/components/shared/types/common";
import {
  ALUMNI_STATUS_OPTIONS,
  IAlumniCourse,
} from "@/src/components/alumni/types";
import {
  ALUMNI_COURSES_ENDPOINT,
  ALUMNI_COURSES_LIST_QUERY_KEY,
} from "@/src/components/alumni/useAlumni";
import { ordinal } from "@/src/components/alumni/utils";
import { AlumniBatchFormValues } from "../Schema/alumniBatchSchema";
import AlumniMemberField from "./AlumniMemberField";

const SectionHeader = ({
  label,
  description,
  icon: Icon,
  action,
}: {
  label: string;
  description?: string;
  icon: React.ElementType;
  action?: React.ReactNode;
}) => (
  <div className="mb-6 flex items-start justify-between gap-3">
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-md border border-primary/20 bg-primary/10">
        <Icon className="h-4 w-4 text-primary" />
      </div>
      <div>
        <Paragraph className="font-medium text-pBlue xl:text-lg">
          {label}
        </Paragraph>
        {description && (
          <Paragraph className="text-xs! text-gray-500">
            {description}
          </Paragraph>
        )}
      </div>
    </div>
    {action}
  </div>
);

interface AlumniBatchFormProps {
  isEditMode?: boolean;
  onSubmit: (data: AlumniBatchFormValues) => void;
  onCancel: () => void;
  isPending?: boolean;
  error?: ErrorType;
}

const AlumniBatchForm = ({
  isEditMode = false,
  onSubmit,
  onCancel,
  isPending = false,
  error,
}: AlumniBatchFormProps) => {
  const { handleSubmit, watch, setValue } =
    useFormContext<AlumniBatchFormValues>();

  const { data: courseData } = useGet<IAlumniCourse[]>(
    `${ALUMNI_COURSES_ENDPOINT}/list`,
    ALUMNI_COURSES_LIST_QUERY_KEY
  );

  const courses = Array.isArray(courseData?.data) ? courseData.data : [];
  const courseOptions = mapToSelectOptions(courses, "nameEn", "id");

  const batchNo = watch("batchNo");
  const courseId = watch("alumniCourseId");
  const titleEn = watch("titleEn");
  const members = watch("members");

  // Suggest "1st Basic Hydro" once a course and batch number are picked, but
  // never overwrite a title the user has already typed.
  useEffect(() => {
    if (titleEn?.trim()) return;
    const course = courses.find((item) => item.id === courseId);
    if (!course || !batchNo) return;
    setValue("titleEn", `${ordinal(Number(batchNo))} ${course.nameEn}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [batchNo, courseId]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
      {/* Batch details */}
      <div className="rounded-lg border border-light-silver bg-white p-6 lg:p-8">
        <SectionHeader
          icon={CalendarRange}
          label="Batch Details"
          description="Which course this batch belongs to and when it ran"
          action={
            <Button
              type="button"
              onClick={onCancel}
              className="cursor-pointer border bg-transparent text-secondary-foreground duration-300 hover:bg-gray-100 hover:shadow"
            >
              Cancel
            </Button>
          }
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <InputLabel label="Course" required />
            <ControlledSelectField
              name="alumniCourseId"
              options={courseOptions}
              placeholder="Select a course"
            />
          </div>
          <div>
            <InputLabel label="Batch Number" required />
            <ControlledInputField
              name="batchNo"
              type="number"
              placeholder="e.g. 1"
              className="bg-light shadow-none"
            />
          </div>
          <div>
            <InputLabel label="Start Date" required />
            <ControlledInputField
              name="startDate"
              type="date"
              className="bg-light shadow-none"
            />
          </div>
          <div>
            <InputLabel label="End Date" required />
            <ControlledInputField
              name="endDate"
              type="date"
              className="bg-light shadow-none"
            />
          </div>
          <div>
            <InputLabel label="Batch Title (English)" required />
            <ControlledInputField
              name="titleEn"
              placeholder="e.g. 1st Basic Hydro"
              className="bg-light shadow-none"
            />
          </div>
          <div>
            <InputLabel label="Batch Title (Bengali)" />
            <ControlledInputField
              name="titleBn"
              placeholder="ব্যাচের শিরোনাম বাংলায় লিখুন"
              className="bg-light shadow-none"
            />
          </div>
          <div>
            <InputLabel label="Status" required />
            <ControlledSelectField
              name="status"
              options={ALUMNI_STATUS_OPTIONS}
              placeholder="Select status"
            />
          </div>
        </div>

        <div className="mt-6">
          <InputLabel label="Description" />
          <ControlledTextareaField
            name="descriptionEn"
            placeholder="Optional note shown above the roster on the public page"
            className="min-h-24 bg-light shadow-none"
          />
        </div>
      </div>

      {/* Roster */}
      <div className="rounded-lg border border-light-silver bg-white p-6 lg:p-8">
        <SectionHeader
          icon={Users}
          label="Participants"
          description="The Ser / P. No / Rank & Name roster — serials follow row order"
          action={
            <span className="shrink-0 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary tabular-nums">
              {members?.length ?? 0} added
            </span>
          }
        />
        <AlumniMemberField />
      </div>

      <ErrorMessage error={error} />

      <div className="flex items-center justify-end gap-4">
        <Button
          type="button"
          onClick={onCancel}
          className="cursor-pointer border bg-transparent text-secondary-foreground duration-300 hover:bg-gray-100 hover:shadow"
        >
          Cancel
        </Button>
        <SubmitButton
          isLoading={isPending}
          label={isEditMode ? "Update Batch" : "Create Batch"}
        />
      </div>
    </form>
  );
};

export default AlumniBatchForm;
