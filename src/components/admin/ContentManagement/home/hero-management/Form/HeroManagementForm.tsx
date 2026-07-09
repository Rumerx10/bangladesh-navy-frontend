// src/modules/admin/hero-management/components/Form/HeroManagementForm.tsx
"use client";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/src/lib/utils";
import { useFormContext } from "react-hook-form";
import { Button } from "@/src/components/ui/button";
import ErrorMessage from "@/src/components/shared/Errors/ErrorMessage";
import ControlledInputField from "@/src/components/shared/FromController/ControlledInputField";
import ControlledTextareaField from "@/src/components/shared/FromController/ControlledTextareaField";
import { MultipleImageUploadController } from "@/src/components/shared/FromController/MultipleImageFileInput";
import Paragraph from "@/src/components/shared/Paragraph";
import SubmitButton from "@/src/components/shared/SubmitButton";
import { ErrorType } from "@/src/components/shared/types/common";
import { HeroManagementSchemaForm } from "../Schema/heroManagementSchema";
import MultipleInputField from "@/src/components/MultipleInputField";

interface HeroManagementFormProps {
  isEditMode?: boolean;
  onSubmit: (data: HeroManagementSchemaForm) => void;
  error?: ErrorType | null;
  isPending?: boolean;
  onCancel?: () => void;
}

const HeroManagementForm = ({
  isEditMode = false,
  onSubmit,
  error,
  isPending = false,
  onCancel,
}: HeroManagementFormProps) => {
  const { handleSubmit } = useFormContext<HeroManagementSchemaForm>();
  const [iconLoaded, setIconLoaded] = useState(false);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
      <div className="border border-light-silver rounded-lg p-8 bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 w-9 h-9 flex items-center justify-center rounded-md border border-primary/20">
              <Image
                src="/icons/media.svg"
                alt="basic information"
                width={36}
                height={36}
                className={cn(
                  "w-4 transition-opacity duration-700 ease-in-out",
                  iconLoaded ? "opacity-100" : "opacity-0"
                )}
                onLoad={() => setIconLoaded(true)}
                onError={() => setIconLoaded(true)} // Show anyway if fails
              />
            </div>
            <Paragraph className="xl:text-lg font-medium text-pBlue">
              Image
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

        <div className="mt-6">
          <MultipleImageUploadController name="images" />
        </div>

        <div className="flex flex-col gap-y-6 gap-x-6 mt-6">
          <div>
            <Paragraph className="font-semibold text-pBlue uppercase mb-2">
              Title
            </Paragraph>
            <ControlledInputField
              name="title"
              placeholder="Your Health, Our Priority"
              className="bg-light shadow-none"
            />
          </div>
          <div>
            <Paragraph className="font-semibold text-pBlue uppercase mb-2">
              Slogan
            </Paragraph>
            <ControlledInputField
              name="slogan"
              placeholder="Your Health, Our Priority"
              className="bg-light shadow-none"
            />
          </div>
          <div>
            <Paragraph className="font-semibold text-pBlue uppercase mb-2">
              Description
            </Paragraph>
            <ControlledTextareaField
              name="description"
              placeholder="Write here your..."
              className="bg-light shadow-none"
            />
          </div>
          <div>
            <Paragraph className="font-semibold text-pBlue uppercase mb-2">
              Notices
            </Paragraph>
            <MultipleInputField
              name="notices"
              placeholder="Type a notice and press Add..."
              className="bg-light shadow-none"
            />
          </div>
        </div>
      </div>

      {/* Footer */}
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
          label={isEditMode ? "Updating Changes" : "Update Changes"}
        />
      </div>
    </form>
  );
};

export default HeroManagementForm;
