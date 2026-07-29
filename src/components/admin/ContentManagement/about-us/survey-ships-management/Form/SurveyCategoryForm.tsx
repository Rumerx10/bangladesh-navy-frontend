import ControlledInputField from "@/src/components/shared/FromController/ControlledInputField";
import ControlledSelectField from "@/src/components/shared/FromController/ControlledSelectField";
import ErrorMessage from "@/src/components/shared/Errors/ErrorMessage";
import InputLabel from "@/src/components/shared/InputLabel";
import SubmitButton from "@/src/components/shared/SubmitButton";
import { Button } from "@/src/components/ui/button";
import { ErrorType } from "@/src/components/shared/types/common";
import { useFormContext } from "react-hook-form";
import { SurveyCategoryFormValues } from "../Schema/surveyCategorySchema";

const STATUS_OPTIONS = [
  { label: "Active", value: "ACTIVE" },
  { label: "Inactive", value: "INACTIVE" },
];

interface SurveyCategoryFormProps {
  isEditMode?: boolean;
  onSubmit: (data: SurveyCategoryFormValues) => void;
  onCancel: () => void;
  isPending?: boolean;
  error?: ErrorType;
}

export default function SurveyCategoryForm({
  isEditMode = false,
  onSubmit,
  onCancel,
  isPending = false,
  error,
}: SurveyCategoryFormProps) {
  const { handleSubmit } = useFormContext<SurveyCategoryFormValues>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-5 mt-2">
      <div>
        <InputLabel label="Category Name (English)" required />
        <ControlledInputField
          className="bg-light"
          name="nameEn"
          placeholder="Enter category name in English"
        />
      </div>

      <div>
        <InputLabel label="Category Name (Bengali)" />
        <ControlledInputField
          className="bg-light"
          name="nameBn"
          placeholder="Enter category name in Bengali"
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
          className="text-secondary-foreground bg-transparent hover:bg-transparent border shadow-none cursor-pointer"
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
