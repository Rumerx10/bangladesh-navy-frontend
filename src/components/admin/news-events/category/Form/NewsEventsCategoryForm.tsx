import ControlledInputField from "@/src/components/shared/FromController/ControlledInputField";
import ErrorMessage from "@/src/components/shared/Errors/ErrorMessage";
import InputLabel from "@/src/components/shared/InputLabel";
import SubmitButton from "@/src/components/shared/SubmitButton";
import { Button } from "@/src/components/ui/button";
import { ErrorType } from "@/src/components/shared/types/common";
import { useFormContext } from "react-hook-form";
import { NewsEventsCategoryFormValues } from "../Schema/newsEventsCategorySchema";

interface NewsEventsCategoryFormProps {
  isEditMode?: boolean;
  onSubmit: (data: NewsEventsCategoryFormValues) => void;
  onCancel: () => void;
  isPending?: boolean;
  error?: ErrorType;
}

const NewsEventsCategoryForm = ({
  isEditMode = false,
  onSubmit,
  onCancel,
  isPending = false,
  error,
}: NewsEventsCategoryFormProps) => {
  const { handleSubmit } = useFormContext<NewsEventsCategoryFormValues>();

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
};

export default NewsEventsCategoryForm;
