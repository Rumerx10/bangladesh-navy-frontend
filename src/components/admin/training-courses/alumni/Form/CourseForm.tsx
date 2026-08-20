"use client";

import { BarChart3, CalendarRange } from "lucide-react";
import { useFormContext } from "react-hook-form";
import InputLabel from "@/src/components/shared/InputLabel";
import Paragraph from "@/src/components/shared/Paragraph";
import SubmitButton from "@/src/components/shared/SubmitButton";
import ErrorMessage from "@/src/components/shared/Errors/ErrorMessage";
import ControlledInputField from "@/src/components/shared/FromController/ControlledInputField";
import ControlledSelectField from "@/src/components/shared/FromController/ControlledSelectField";
import { Button } from "@/src/components/ui/button";
import { ErrorType } from "@/src/components/shared/types/common";
import { COURSE_STATUS_OPTIONS } from "@/src/components/courses/types";
import { CourseFormValues } from "../Schema/courseSchema";

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

interface CourseFormProps {
  isEditMode?: boolean;
  onSubmit: (data: CourseFormValues) => void;
  onCancel: () => void;
  isPending?: boolean;
  error?: ErrorType;
}

const toCount = (value: unknown) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

const CourseForm = ({
  isEditMode = false,
  onSubmit,
  onCancel,
  isPending = false,
  error,
}: CourseFormProps) => {
  const { handleSubmit, watch, setValue } = useFormContext<CourseFormValues>();

  const bn = watch("bn");
  const otherMaritimeOrg = watch("otherMaritimeOrg");
  const overseas = watch("overseas");
  const totalTrainees = watch("totalTrainees");

  // The public table prints the API's `totalTrainees` verbatim, so a mismatch
  // with the three columns beside it is worth surfacing before it is saved.
  const sum = toCount(bn) + toCount(otherMaritimeOrg) + toCount(overseas);
  const showSumHint = sum > 0 && toCount(totalTrainees) !== sum;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
      {/* Course details */}
      <div className="rounded-lg border border-light-silver bg-white p-6">
        <SectionHeader
          icon={CalendarRange}
          label="Course Details"
          description="Name, run dates and where the row sits in the statistics table"
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <InputLabel label="Course Name" required />
            <ControlledInputField
              name="name"
              placeholder="e.g. Basic Hydrographic (Cat B)"
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
            <InputLabel label="Courses Conducted" />
            <ControlledInputField
              name="coursesConducted"
              type="number"
              placeholder="e.g. 19"
              className="bg-light shadow-none"
            />
          </div>
          <div>
            <InputLabel label="Duration" />
            <ControlledInputField
              name="duration"
              placeholder="e.g. 24 weeks"
              className="bg-light shadow-none"
            />
          </div>
          <div>
            <InputLabel label="Remarks" />
            <ControlledInputField
              name="remarks"
              placeholder="e.g. Officers"
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
              options={COURSE_STATUS_OPTIONS}
              placeholder="Select status"
            />
          </div>
        </div>
      </div>

      {/* Trainee statistics */}
      <div className="rounded-lg border border-light-silver bg-white p-6">
        <SectionHeader
          icon={BarChart3}
          label="Trainee Statistics"
          description="Headcounts printed in the public Course Statistics table"
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <InputLabel label="BN" />
            <ControlledInputField
              name="bn"
              type="number"
              placeholder="e.g. 86"
              className="bg-light shadow-none"
            />
          </div>
          <div>
            <InputLabel label="Other Maritime Org" />
            <ControlledInputField
              name="otherMaritimeOrg"
              type="number"
              placeholder="e.g. 20"
              className="bg-light shadow-none"
            />
          </div>
          <div>
            <InputLabel label="Overseas" />
            <ControlledInputField
              name="overseas"
              type="number"
              placeholder="e.g. 27"
              className="bg-light shadow-none"
            />
          </div>
          <div>
            <InputLabel label="Total Trainees" />
            <ControlledInputField
              name="totalTrainees"
              type="number"
              placeholder="e.g. 133"
              className="bg-light shadow-none"
            />
          </div>
        </div>

        {showSumHint && (
          <div className="mt-4 flex flex-wrap items-center gap-3 rounded-md border border-amber-200 bg-amber-50 px-4 py-3">
            <Paragraph className="text-xs! text-amber-800">
              BN + Other Maritime Org + Overseas ={" "}
              <span className="font-bold tabular-nums">{sum}</span>, which does
              not match Total Trainees.
            </Paragraph>
            <Button
              type="button"
              onClick={() =>
                setValue("totalTrainees", sum, { shouldValidate: true })
              }
              className="h-8 cursor-pointer bg-amber-600 px-3 text-xs text-white hover:bg-amber-700"
            >
              Use {sum}
            </Button>
          </div>
        )}

        <Paragraph className="mt-4 text-xs! text-gray-500">
          Leave a figure empty where none is available — the public table prints
          an em dash (—) for it. The totals row is calculated by the API.
        </Paragraph>
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
          label={isEditMode ? "Update Course" : "Create Course"}
        />
      </div>
    </form>
  );
};

export default CourseForm;
