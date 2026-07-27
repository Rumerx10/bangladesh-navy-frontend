"use client";

import { useFormContext } from "react-hook-form";
import { Button } from "@/src/components/ui/button";
import InputLabel from "@/src/components/shared/InputLabel";
import SubmitButton from "@/src/components/shared/SubmitButton";
import ErrorMessage from "@/src/components/shared/Errors/ErrorMessage";
import ControlledInputField from "@/src/components/shared/FromController/ControlledInputField";
import ControlledSelectField from "@/src/components/shared/FromController/ControlledSelectField";
import ControlledTextareaField from "@/src/components/shared/FromController/ControlledTextareaField";
import { ErrorType } from "@/src/components/shared/types/common";
import { CategoryFormValues } from "../Schema/categorySchema";

const STATUS_OPTIONS = [
  { label: "Active", value: "ACTIVE" },
  { label: "Inactive", value: "INACTIVE" },
];

interface CategoryFormProps {
  isEditMode?: boolean;
  onSubmit: (data: CategoryFormValues) => void;
  onCancel: () => void;
  isPending?: boolean;
  error?: ErrorType;
}

export default function CategoryForm({
  isEditMode = false,
  onSubmit,
  onCancel,
  isPending = false,
  error,
}: CategoryFormProps) {
  const { handleSubmit } = useFormContext<CategoryFormValues>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <InputLabel label="Name (English)" required />
          <ControlledInputField
            name="nameEn"
            placeholder="e.g. Electronics"
            className="bg-light shadow-none"
          />
        </div>
        <div>
          <InputLabel label="Name (Bengali)" />
          <ControlledInputField
            name="nameBn"
            placeholder="ইলেকট্রনিক্স"
            className="bg-light shadow-none"
          />
        </div>
      </div>

      <div>
        <InputLabel label="Icon" />
        <ControlledInputField
          name="icon"
          placeholder="Icon name or URL (optional)"
          className="bg-light shadow-none"
        />
      </div>

      <div>
        <InputLabel label="Description (English)" required />
        <ControlledTextareaField
          name="descriptionEn"
          placeholder="Enter category description in English"
          className="bg-light shadow-none min-h-20"
        />
      </div>

      <div>
        <InputLabel label="Description (Bengali)" />
        <ControlledTextareaField
          name="descriptionBn"
          placeholder="বাংলায় বিভাগের বিবরণ লিখুন"
          className="bg-light shadow-none min-h-20"
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

      <div className="flex items-center justify-end gap-3 pt-1">
        <Button
          type="button"
          onClick={onCancel}
          className="text-secondary-foreground bg-transparent hover:bg-gray-100 duration-300 border hover:shadow cursor-pointer"
        >
          Cancel
        </Button>
        <SubmitButton
          isLoading={isPending}
          label={isEditMode ? "Update Category" : "Create Category"}
        />
      </div>
    </form>
  );
}
