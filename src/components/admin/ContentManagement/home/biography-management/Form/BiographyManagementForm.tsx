"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/src/lib/utils";
import { Button } from "@/src/components/ui/button";
import { useFormContext } from "react-hook-form";
import InputLabel from "@/src/components/shared/InputLabel";
import Paragraph from "@/src/components/shared/Paragraph";
import SubmitButton from "@/src/components/shared/SubmitButton";
import TextEditor from "@/src/components/shared/text-editor/TextEditor";
import { ErrorType } from "@/src/components/shared/types/common";
import ErrorMessage from "@/src/components/shared/Errors/ErrorMessage";
import { BiographyManagementSchemaForm } from "../Schema/biographyManagementSchema";
import ControlledInputField from "@/src/components/shared/FromController/ControlledInputField";
import ControlledSelectField from "@/src/components/shared/FromController/ControlledSelectField";
import { FileUploadController } from "@/src/components/shared/FromController/FileUploadController";

interface BiographyManagementFormProps {
  error?: ErrorType | null;
  isEditMode?: boolean;
  isPending?: boolean;
  onCancel?: () => void;
  onSubmit: (data: BiographyManagementSchemaForm) => void;
}

const BiographyManagementForm = ({
  error,
  isEditMode = false,
  isPending = false,
  onCancel,
  onSubmit,
}: BiographyManagementFormProps) => {
  const [iconLoaded, setIconLoaded] = useState(false);

  const {
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useFormContext<BiographyManagementSchemaForm>();

  const statusOptions = [
    { label: "Active", value: "ACTIVE" },
    { label: "Inactive", value: "INACTIVE" },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
      {/* English Content Section */}
      <div className="border border-light-silver rounded-lg p-8 bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 w-9 h-9 flex items-center justify-center rounded-md border border-primary/20">
              <Image
                src="/icons/file.svg"
                alt="english content"
                width={36}
                height={36}
                className={cn(
                  "w-4 transition-opacity duration-700 ease-in-out",
                  iconLoaded ? "opacity-100" : "opacity-0"
                )}
                onLoad={() => setIconLoaded(true)}
                onError={() => setIconLoaded(true)}
              />
            </div>
            <Paragraph className="xl:text-lg font-medium text-pBlue">
              English Content
            </Paragraph>
          </div>
          <Button
            type="button"
            onClick={onCancel}
            className="text-secondary-foreground bg-transparent hover:bg-gray-100 duration-300 border hover:shadow cursor-pointer"
          >
            Cancel
          </Button>
        </div>

        <div className="flex flex-col gap-y-6 mt-6">
          <div>
            <InputLabel label="Name (English)" required />
            <ControlledInputField
              name="nameEn"
              placeholder="Enter name in English"
              className="bg-light shadow-none"
            />
          </div>

          <div>
            <InputLabel label="Designation (English)" required />
            <ControlledInputField
              name="designationEn"
              placeholder="Enter designation in English"
              className="bg-light shadow-none"
            />
          </div>

          <div>
            <InputLabel label="Message (English)" required />
            <TextEditor
              value={watch("messageEn")}
              onChange={(value) =>
                setValue("messageEn", value, { shouldValidate: true })
              }
              error={errors?.messageEn}
            />
          </div>
        </div>
      </div>

      {/* Bengali Content Section */}
      <div className="border border-light-silver rounded-lg p-8 bg-white">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-primary/10 w-9 h-9 flex items-center justify-center rounded-md border border-primary/20">
            <Image
              src="/icons/file.svg"
              alt="bengali content"
              width={36}
              height={36}
              className="w-4"
            />
          </div>
          <Paragraph className="xl:text-lg font-medium text-pBlue">
            Bengali Content
          </Paragraph>
        </div>

        <div className="flex flex-col gap-y-6">
          <div>
            <InputLabel label="Name (Bengali)" required />
            <ControlledInputField
              name="nameBn"
              placeholder="Enter name in Bengali"
              className="bg-light shadow-none"
            />
          </div>

          <div>
            <InputLabel label="Designation (Bengali)" />
            <ControlledInputField
              name="designationBn"
              placeholder="Enter designation in Bengali"
              className="bg-light shadow-none"
            />
          </div>

          <div>
            <InputLabel label="Message (Bengali)" required />
            <TextEditor
              value={watch("messageBn")}
              onChange={(value) =>
                setValue("messageBn", value, { shouldValidate: true })
              }
              error={errors?.messageBn}
            />
          </div>
        </div>
      </div>

      {/* Image & Status Section */}
      <div className="border border-light-silver rounded-lg p-8 bg-white">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-primary/10 w-9 h-9 flex items-center justify-center rounded-md border border-primary/20">
            <Image
              src="/icons/media.svg"
              alt="image & status"
              width={36}
              height={36}
              className="w-4"
            />
          </div>
          <Paragraph className="xl:text-lg font-medium text-pBlue">
            Image & Status
          </Paragraph>
        </div>

        <div className="flex flex-col gap-y-6">
          <div>
            <InputLabel label="Profile Image" />
            <FileUploadController
              name="image"
              label="Upload profile image"
              accept={["image/jpeg", "image/png", "image/webp"]}
            />
          </div>

          <div>
            <InputLabel label="Status" required />
            <ControlledSelectField
              name="status"
              options={statusOptions}
              placeholder="Select status"
            />
          </div>
        </div>
      </div>

      {/* Error Message */}
      <ErrorMessage error={error} />

      {/* Footer Actions */}
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
          label={isEditMode ? "Update Biography" : "Create Biography"}
        />
      </div>
    </form>
  );
};

export default BiographyManagementForm;
