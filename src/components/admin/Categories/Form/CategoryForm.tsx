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
import { Loader2 } from "lucide-react";
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
  const { handleSubmit, watch, setValue } =
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
  const isLocked = isPending || isGenerating;
  const englishName = watch("nameEn").trim();
  const canGenerateBanglaName = englishName.length >= 10;

  const handleGenerateBanglaName = async () => {
    if (!canGenerateBanglaName) {
      toast.error("Please enter the English name first.");
      return;
    }

    const generatedName = await generateBanglaName(englishName);
    if (generatedName) {
      setValue("nameBn", generatedName, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-5 mt-2">
      {/* English Name */}
      <div>
        <InputLabel label="Category Name (English)" />

        <div className="flex-1">
          <ControlledInputField
            className="bg-light"
            name="nameEn"
            placeholder="Enter category name in English"
            disabled={isLocked}
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
          disabled={isLocked}
        />
        <Button
          type="button"
          onClick={handleGenerateBanglaName}
          disabled={isLocked || !canGenerateBanglaName}
          className="h-10! min-w-28 bg-primary text-white hover:bg-primary/90 disabled:cursor-not-allowed disabled:bg-primary/70 absolute right-0.5 top-1/2 -translate-y-[15%]"
        >
          {isGenerating ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Generating
            </span>
          ) : (
            "Generate"
          )}
        </Button>
      </div>

      {/* English Description */}
      <div>
        <InputLabel label="Description (English)" />
        <ControlledTextareaField
          className="bg-light"
          name="descriptionEn"
          placeholder="Enter category description in English"
          disabled={isLocked}
        />
      </div>
      {/* Bengali Description */}
      <div>
        <InputLabel label="Description (Bengali)" />
        <ControlledTextareaField
          className="bg-light"
          name="descriptionBn"
          placeholder="Enter category description in Bengali"
          disabled={isLocked}
        />
      </div>

      {/* Icon Upload */}
      <div>
        <InputLabel label="Icon (SVG or PNG)" />
        <FileUploadController
          name="icon"
          label="Upload icon"
          accept={["image/svg+xml", "image/png"]}
          disabled={isLocked}
        />
      </div>

      {/* Status */}
      <div>
        <InputLabel label="Status" />
        <ControlledSelectField
          name="status"
          options={statusOptions}
          placeholder="Select status"
          disabled={isLocked}
        />
      </div>

      <ErrorMessage error={error} />

      {/* Actions */}
      <div className="flex items-center justify-end gap-4">
        <Button
          type="button"
          onClick={onCancel}
          disabled={isLocked}
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
