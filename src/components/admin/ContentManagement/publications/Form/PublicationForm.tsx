"use client";

import { Controller, useFormContext } from "react-hook-form";
import { Button } from "@/src/components/ui/button";
import InputLabel from "@/src/components/shared/InputLabel";
import SubmitButton from "@/src/components/shared/SubmitButton";
import ErrorMessage from "@/src/components/shared/Errors/ErrorMessage";
import ControlledInputField from "@/src/components/shared/FromController/ControlledInputField";
import { FileUploadController } from "@/src/components/shared/FromController/FileUploadController";
import { ErrorType } from "@/src/components/shared/types/common";
import { PublicationFormValues } from "../Schema/publicationSchema";

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
  const { handleSubmit, control } = useFormContext<PublicationFormValues>();

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
        <InputLabel label="Title" required />
        <ControlledInputField
          name="title"
          placeholder="e.g. Sailing Directions for the Bay of Bengal"
          className="bg-light shadow-none"
        />
      </div>
      <div>
        <InputLabel label="Publication Code" required />
        <Controller
          name="code"
          control={control}
          render={({ field, fieldState }) => (
            <div>
              <div
                className={`flex h-11 w-full items-stretch overflow-hidden rounded-md border bg-light ${
                  fieldState.error
                    ? "border-rose-500"
                    : "border-light-silver"
                }`}
              >
                <span className="flex items-center border-r border-light-silver bg-gray-100 px-3 text-sm font-semibold text-gray-500">
                  P
                </span>
                <input
                  {...field}
                  value={field.value ?? ""}
                  onChange={(e) =>
                    field.onChange(e.target.value.replace(/\D/g, ""))
                  }
                  type="text"
                  inputMode="numeric"
                  placeholder="105"
                  className="flex-1 bg-transparent px-3 text-base outline-none md:text-sm"
                />
              </div>
              {fieldState.error && (
                <p className="mt-1 pl-2 text-xs text-rose-500">
                  {fieldState.error.message}
                </p>
              )}
            </div>
          )}
        />
      </div>
      <div>
        <InputLabel label="Date" required />
        <ControlledInputField
          name="date"
          type="date"
          className="bg-light shadow-none"
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
