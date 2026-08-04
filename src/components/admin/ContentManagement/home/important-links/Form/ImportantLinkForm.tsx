"use client";

import { useFormContext } from "react-hook-form";
import { Button } from "@/src/components/ui/button";
import InputLabel from "@/src/components/shared/InputLabel";
import SubmitButton from "@/src/components/shared/SubmitButton";
import ErrorMessage from "@/src/components/shared/Errors/ErrorMessage";
import ControlledInputField from "@/src/components/shared/FromController/ControlledInputField";
import ControlledSelectField from "@/src/components/shared/FromController/ControlledSelectField";
import { ErrorType } from "@/src/components/shared/types/common";
import { ImportantLinkFormValues } from "../Schema/importantLinkSchema";

const STATUS_OPTIONS = [
  { label: "Active", value: "ACTIVE" },
  { label: "Inactive", value: "INACTIVE" },
];

interface ImportantLinkFormProps {
  isEditMode?: boolean;
  onSubmit: (data: ImportantLinkFormValues) => void;
  onCancel: () => void;
  isPending?: boolean;
  error?: ErrorType;
}

export default function ImportantLinkForm({
  isEditMode = false,
  onSubmit,
  onCancel,
  isPending = false,
  error,
}: ImportantLinkFormProps) {
  const { handleSubmit } = useFormContext<ImportantLinkFormValues>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
      <div>
        <InputLabel label="Name" required />
        <ControlledInputField
          name="name"
          placeholder="e.g. Bangladesh Navy"
          className="bg-light shadow-none"
        />
      </div>
      <div>
        <InputLabel label="Link" required />
        <ControlledInputField
          name="link"
          placeholder="https://navy.mil.bd"
          className="bg-light shadow-none"
        />
      </div>
      <div>
        <InputLabel label="Status" required />
        <ControlledSelectField
          name="status"
          options={STATUS_OPTIONS}
          placeholder="Select status"
        />
      </div>

      <ErrorMessage error={error} />

      <div className="flex items-center justify-end gap-4">
        <Button
          type="button"
          onClick={onCancel}
          className="text-secondary-foreground bg-transparent hover:bg-gray-100 duration-300 border hover:shadow cursor-pointer"
        >
          Cancel
        </Button>
        <SubmitButton
          isLoading={isPending}
          label={isEditMode ? "Update Link" : "Create Link"}
        />
      </div>
    </form>
  );
}
