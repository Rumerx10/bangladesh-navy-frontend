import ErrorMessage from "@/src/components/shared/Errors/ErrorMessage";
import ControlledInputField from "@/src/components/shared/FromController/ControlledInputField";
import ControlledSelectField from "@/src/components/shared/FromController/ControlledSelectField";
import ControlledTextareaField from "@/src/components/shared/FromController/ControlledTextareaField";
import { FileUploadController } from "@/src/components/shared/FromController/FileUploadController";
import InputLabel from "@/src/components/shared/InputLabel";
import SubmitButton from "@/src/components/shared/SubmitButton";
import { Button } from "@/src/components/ui/button";
import { axiosInstance } from "@/src/helpers/axios/axiosInstance";
import { ErrorType } from "@/src/components/shared/types/common";
import { useMutation } from "@tanstack/react-query";
import { useFormContext } from "react-hook-form";
import { toast } from "react-toastify";
import { CategoryFormValues } from "../Schema/categorySchema";

export default function CategoryForm({
  isEditMode = false,
  onSubmit,
  onCancel,
  isPending = false,
  error,
}: {
  isEditMode?: boolean;
  onSubmit: (data: CategoryFormValues) => void;
  onCancel: () => void;
  isPending?: boolean;
  error?: ErrorType;
}) {
  const { handleSubmit } =
    useFormContext<CategoryFormValues>();
  const { mutateAsync: generateBanglaName, isPending: isGenerating } =
    useMutation({
      mutationFn: async (input: string) => {
        const response = await axiosInstance.post("/ai", { input });
        return response.data as string;
      },
      onError: () => {
        toast.error("Failed to generate Bangla name.");
      },
    });
  const statusOptions = [
    { label: "Active", value: "ACTIVE" },
    { label: "Inactive", value: "INACTIVE" },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-5 mt-2">
      <div>
        <InputLabel label="Category Name (English)" />

        <div className="flex-1">
          <ControlledInputField
            className="bg-light"
            name="nameEn"
            placeholder="Enter category name in English"
          />
        </div>
      </div>

      {/* Bengali Name */}
      <div className="relative">
        <InputLabel label="Category Name (Bengali)" required />
        <ControlledInputField
          className="bg-light"
          name="nameBn"
          placeholder="Enter category name in Bengali"
        />
      </div>

      {/* English Description */}
      <div>
        <InputLabel label="Description (English)" />
        <ControlledTextareaField
          className="bg-light"
          name="descriptionEn"
          placeholder="Enter category description in English"
        />
      </div>
      {/* Bengali Description */}
      <div>
        <InputLabel label="Description (Bengali)" />
        <ControlledTextareaField
          className="bg-light"
          name="descriptionBn"
          placeholder="Enter category description in Bengali"
        />
      </div>

      {/* Icon Upload */}
      <div>
        <InputLabel label="Icon (SVG or PNG)" />
        <FileUploadController
          name="icon"
          label="Upload icon"
          accept={["image/svg+xml", "image/png"]}
        />
      </div>

      {/* Status */}
      <div>
        <InputLabel label="Status" />
        <ControlledSelectField
          name="status"
          options={statusOptions}
          placeholder="Select status"
        />
      </div>

      <ErrorMessage error={error} />

      {/* Actions */}
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
          disabled={isGenerating}
          label={isEditMode ? "Update" : "Create"}
        />
      </div>
    </form>
  );
}
