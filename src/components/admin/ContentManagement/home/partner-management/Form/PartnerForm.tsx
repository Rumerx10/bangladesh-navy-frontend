"use client";

import { useFormContext } from "react-hook-form";
import { Button } from "@/src/components/ui/button";
import InputLabel from "@/src/components/shared/InputLabel";
import SubmitButton from "@/src/components/shared/SubmitButton";
import ErrorMessage from "@/src/components/shared/Errors/ErrorMessage";
import ControlledInputField from "@/src/components/shared/FromController/ControlledInputField";
import ControlledSelectField from "@/src/components/shared/FromController/ControlledSelectField";
import { FileUploadController } from "@/src/components/shared/FromController/FileUploadController";
import { ErrorType } from "@/src/components/shared/types/common";
import { PartnerFormValues } from "../Schema/partnerSchema";

const STATUS_OPTIONS = [
  { label: "Active", value: "ACTIVE" },
  { label: "Inactive", value: "INACTIVE" },
];

interface PartnerFormProps {
  isEditMode?: boolean;
  onSubmit: (data: PartnerFormValues) => void;
  onCancel: () => void;
  isPending?: boolean;
  error?: ErrorType;
}

export default function PartnerForm({
  isEditMode = false,
  onSubmit,
  onCancel,
  isPending = false,
  error,
}: PartnerFormProps) {
  const { handleSubmit } = useFormContext<PartnerFormValues>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
      <div>
        <InputLabel label="Partner Logo" required />
        <FileUploadController
          name="image"
          label="Upload partner logo"
          accept={["image/jpeg", "image/png", "image/webp"]}
        />
      </div>
      <div>
        <InputLabel label="Website Link" />
        <ControlledInputField
          name="link"
          placeholder="https://example.com"
          className="bg-light shadow-none"
        />
      </div>
      <div>
        <InputLabel label="Status" />
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
          label={isEditMode ? "Update Partner" : "Create Partner"}
        />
      </div>
    </form>
  );
}
