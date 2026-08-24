"use client";

import { useFormContext } from "react-hook-form";
import InputLabel from "@/src/components/shared/InputLabel";
import SubmitButton from "@/src/components/shared/SubmitButton";
import ErrorMessage from "@/src/components/shared/Errors/ErrorMessage";
import ControlledInputField from "@/src/components/shared/FromController/ControlledInputField";
import ControlledSelectField from "@/src/components/shared/FromController/ControlledSelectField";
import { Button } from "@/src/components/ui/button";
import { ErrorType } from "@/src/components/shared/types/common";
import { ALUMNI_STATUS_OPTIONS } from "@/src/components/alumni/types";
import { AlumniCourseFormValues } from "../Schema/alumniCourseSchema";

interface AlumniCourseFormProps {
  isEditMode?: boolean;
  onSubmit: (data: AlumniCourseFormValues) => void;
  onCancel: () => void;
  isPending?: boolean;
  error?: ErrorType;
}

export default function AlumniCourseForm({
  isEditMode = false,
  onSubmit,
  onCancel,
  isPending = false,
  error,
}: AlumniCourseFormProps) {
  const { handleSubmit } = useFormContext<AlumniCourseFormValues>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-2 w-full space-y-5">
      <div>
        <InputLabel label="Course Name (English)" required />
        <ControlledInputField
          className="bg-light"
          name="nameEn"
          placeholder="e.g. Basic Hydro"
        />
      </div>

      <div>
        <InputLabel label="Course Name (Bengali)" />
        <ControlledInputField
          className="bg-light"
          name="nameBn"
          placeholder="কোর্সের নাম বাংলায় লিখুন"
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

      <ErrorMessage error={error} />

      <div className="flex items-center justify-end gap-4">
        <Button
          type="button"
          onClick={onCancel}
          className="cursor-pointer border bg-transparent text-secondary-foreground shadow-none hover:bg-transparent"
        >
          Cancel
        </Button>
        <SubmitButton
          isLoading={isPending}
          label={isEditMode ? "Update" : "Create"}
        />
      </div>
    </form>
  );
}
