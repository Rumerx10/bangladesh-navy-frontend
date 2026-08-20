"use client";

import { useFormContext } from "react-hook-form";
import InputLabel from "@/src/components/shared/InputLabel";
import Paragraph from "@/src/components/shared/Paragraph";
import SubmitButton from "@/src/components/shared/SubmitButton";
import ErrorMessage from "@/src/components/shared/Errors/ErrorMessage";
import ControlledInputField from "@/src/components/shared/FromController/ControlledInputField";
import ControlledSelectField from "@/src/components/shared/FromController/ControlledSelectField";
import { Button } from "@/src/components/ui/button";
import { ErrorType, ISelectOption } from "@/src/components/shared/types/common";
import {
  ALUMNI_STATUS_OPTIONS,
  ORGANIZATION_SUGGESTIONS,
  REMARKS_SUGGESTIONS,
} from "@/src/components/alumni/types";
import { AlumniMemberFormValues } from "../Schema/alumniMemberSchema";

interface AlumniMemberFormProps {
  isEditMode?: boolean;
  courseOptions: ISelectOption[];
  onSubmit: (data: AlumniMemberFormValues) => void;
  onCancel: () => void;
  isPending?: boolean;
  error?: ErrorType;
}

const AlumniMemberForm = ({
  isEditMode = false,
  courseOptions,
  onSubmit,
  onCancel,
  isPending = false,
  error,
}: AlumniMemberFormProps) => {
  const { handleSubmit } = useFormContext<AlumniMemberFormValues>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-2 w-full space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
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

        <div className="sm:col-span-2">
          <InputLabel label="Rank & Name" required />
          <ControlledInputField
            name="rankAndName"
            placeholder="e.g. Instr Cdre M Jashim Uddin, (H1) (Rtd)"
            className="bg-light shadow-none"
          />
        </div>

        <div>
          <InputLabel label="P. No" />
          <ControlledInputField
            name="pNo"
            placeholder="e.g. 913"
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
          <InputLabel label="Organization" />
          <ControlledInputField
            name="organization"
            placeholder="BN"
            className="bg-light shadow-none"
            list="alumni-organization-options"
          />
        </div>

        <div>
          <InputLabel label="Remarks" />
          <ControlledInputField
            name="remarks"
            placeholder="Present Rank"
            className="bg-light shadow-none"
            list="alumni-remarks-options"
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

      <ErrorMessage error={error} />

      <div className="flex items-center justify-end gap-4">
        <Button
          type="button"
          onClick={onCancel}
          className="cursor-pointer border bg-transparent text-secondary-foreground shadow-none hover:bg-gray-100"
        >
          Cancel
        </Button>
        <SubmitButton
          isLoading={isPending}
          label={isEditMode ? "Update Member" : "Add Member"}
        />
      </div>

      {/* Shared suggestion lists for the repetitive columns. */}
      <datalist id="alumni-organization-options">
        {ORGANIZATION_SUGGESTIONS.map((option) => (
          <option key={option} value={option} />
        ))}
      </datalist>
      <datalist id="alumni-remarks-options">
        {REMARKS_SUGGESTIONS.map((option) => (
          <option key={option} value={option} />
        ))}
      </datalist>
    </form>
  );
};

export default AlumniMemberForm;
