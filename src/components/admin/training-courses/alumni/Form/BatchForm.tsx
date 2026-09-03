"use client";

import { CalendarRange } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { useCoursesList } from "@/src/components/courses/useCourses";
import { mapToSelectOptions } from "@/src/utils/mapToSelectOptions";
import InputLabel from "@/src/components/shared/InputLabel";
import Paragraph from "@/src/components/shared/Paragraph";
import SubmitButton from "@/src/components/shared/SubmitButton";
import ErrorMessage from "@/src/components/shared/Errors/ErrorMessage";
import ControlledInputField from "@/src/components/shared/FromController/ControlledInputField";
import ControlledSelectField from "@/src/components/shared/FromController/ControlledSelectField";
import { Button } from "@/src/components/ui/button";
import { ErrorType } from "@/src/components/shared/types/common";
import { BATCH_STATUS_OPTIONS } from "@/src/components/batches/types";
import { BatchFormValues } from "../Schema/batchSchema";

const SectionHeader = ({
  label,
  description,
  icon: Icon,
}: {
  label: string;
  description?: string;
  icon: React.ElementType;
}) => (
  <div className="mb-6 flex items-center gap-3">
    <div className="flex h-9 w-9 items-center justify-center rounded-md border border-primary/20 bg-primary/10">
      <Icon className="h-4 w-4 text-primary" />
    </div>
    <div>
      <Paragraph className="font-medium text-pBlue xl:text-lg">
        {label}
      </Paragraph>
      {description && (
        <Paragraph className="text-xs! text-gray-500">{description}</Paragraph>
      )}
    </div>
  </div>
);

interface BatchFormProps {
  isEditMode?: boolean;
  onSubmit: (data: BatchFormValues) => void;
  onCancel: () => void;
  isPending?: boolean;
  error?: ErrorType;
}

const BatchForm = ({
  isEditMode = false,
  onSubmit,
  onCancel,
  isPending = false,
  error,
}: BatchFormProps) => {
  const { handleSubmit } = useFormContext<BatchFormValues>();

  const { courses } = useCoursesList();
  const courseOptions = mapToSelectOptions(courses, "name", "id");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
      <div className="rounded-lg border border-light-silver bg-white p-6">
        <SectionHeader
          icon={CalendarRange}
          label="Batch Details"
          description="Which course this batch belongs to and when it ran"
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <InputLabel label="Course" required />
            <ControlledSelectField
              name="courseId"
              options={courseOptions}
              placeholder="Select a course"
            />
            {courseOptions.length === 0 && (
              <Paragraph className="mt-1 text-xs! text-amber-600">
                No courses yet — add one on the Courses tab first.
              </Paragraph>
            )}
          </div>
          <div>
            <InputLabel label="Batch Name" required />
            <ControlledInputField
              name="name"
              placeholder="e.g. Batch 2026-A"
              className="bg-light shadow-none"
            />
          </div>
          <div>
            <InputLabel label="Serial" required />
            <ControlledInputField
              name="serial"
              type="number"
              placeholder="e.g. 1"
              className="bg-light shadow-none"
            />
          </div>
          <div>
            <InputLabel label="Start Date" />
            <ControlledInputField
              name="startDate"
              type="date"
              className="bg-light shadow-none"
            />
          </div>
          <div>
            <InputLabel label="End Date" />
            <ControlledInputField
              name="endDate"
              type="date"
              className="bg-light shadow-none"
            />
          </div>
          <div>
            <InputLabel label="Status" required />
            <ControlledSelectField
              name="status"
              options={BATCH_STATUS_OPTIONS}
              placeholder="Select status"
            />
          </div>
        </div>
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

export default BatchForm;
