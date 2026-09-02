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
import { PublicationFormValues } from "../Schema/publicationSchema";

const STATUS_OPTIONS = [
  { label: "Active", value: "ACTIVE" },
  { label: "Inactive", value: "INACTIVE" },
];

interface PublicationFormProps {
  isEditMode?: boolean;
  onSubmit: (data: PublicationFormValues) => void;
  onCancel: () => void;
  isPending?: boolean;
  error?: ErrorType;
}

const PublicationForm = ({
  isEditMode = false,
  onSubmit,
  onCancel,
  isPending = false,
  error,
}: PublicationFormProps) => {
  const { handleSubmit } = useFormContext<PublicationFormValues>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
      <div>
        <InputLabel label="Cover Image" required />
        <FileUploadController
          name="image"
          label="Upload publication cover"
          accept={["image/jpeg", "image/png", "image/webp"]}
        />
      </div>
      <div>
        <InputLabel label="Title (English)" required />
        <ControlledInputField
          name="titleEn"
          placeholder="e.g. Sailing Directions for the Bay of Bengal"
          className="bg-light shadow-none"
        />
      </div>
      <div>
        <InputLabel label="Title (Bangla)" />
        <ControlledInputField
          name="titleBn"
          placeholder="বাংলা শিরোনাম লিখুন"
          className="bg-light shadow-none"
        />
      </div>
      <div>
        <InputLabel label="Publication Code" />
        <ControlledInputField
          name="code"
          placeholder="e.g. PUB 21/2026"
          className="bg-light shadow-none"
        />
      </div>
      <div>
        <InputLabel label="Date" />
        <ControlledInputField
          name="date"
          type="date"
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
          label={isEditMode ? "Update Publication" : "Create Publication"}
        />
      </div>
    </form>
  );
};

export default PublicationForm;
