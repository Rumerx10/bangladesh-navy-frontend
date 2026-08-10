"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronDown, FileText } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { Button } from "@/src/components/ui/button";
import { useFormContext } from "react-hook-form";
import InputLabel from "@/src/components/shared/InputLabel";
import Paragraph from "@/src/components/shared/Paragraph";
import SubmitButton from "@/src/components/shared/SubmitButton";
import { ErrorType } from "@/src/components/shared/types/common";
import ErrorMessage from "@/src/components/shared/Errors/ErrorMessage";
import { HeroManagementSchemaForm } from "../Schema/heroManagementSchema";
import ControlledInputField from "@/src/components/shared/FromController/ControlledInputField";
import ControlledSelectField from "@/src/components/shared/FromController/ControlledSelectField";
import ControlledTextareaField from "@/src/components/shared/FromController/ControlledTextareaField";
import { MultipleImageUploadController } from "@/src/components/shared/FromController/MultipleImageFileInput";

interface HeroManagementFormProps {
  error?: ErrorType | null;
  isEditMode?: boolean;
  isPending?: boolean;
  onCancel?: () => void;
  onSubmit: (data: HeroManagementSchemaForm) => void;
}

const HeroManagementForm = ({
  error,
  isEditMode = false,
  isPending = false,
  onCancel,
  onSubmit,
}: HeroManagementFormProps) => {
  const { handleSubmit } = useFormContext<HeroManagementSchemaForm>();
  const [iconLoaded, setIconLoaded] = useState(false);
  const [showBnFields, setShowBnFields] = useState(false);

  const statusOptions = [
    { label: "Active", value: "ACTIVE" },
    { label: "Inactive", value: "INACTIVE" },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
      {/* Images Section */}
      <div className="border border-light-silver rounded-lg p-8 bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 w-9 h-9 flex items-center justify-center rounded-md border border-primary/20">
              <Image
                src="/icons/media.svg"
                alt="hero images"
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
              Hero Images
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
      </div>

      {/* Content Section */}
      <div className="border border-light-silver rounded-lg p-8 bg-white">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-primary/10 w-9 h-9 flex items-center justify-center rounded-md border border-primary/20">
            <FileText className="w-4 h-4 text-primary" />
          </div>
          <Paragraph className="xl:text-lg font-medium text-pBlue">
            Hero Content
          </Paragraph>
        </div>

        <div className="flex flex-col gap-y-6">
          <div>
            <InputLabel label="English Title" required />
            <ControlledInputField
              name="titleEn"
              placeholder="Enter english title"
              className="bg-light shadow-none"
            />
          </div>

          <div>
            <InputLabel label="English Subtitle" required />
            <ControlledInputField
              name="subTitleEn"
              placeholder="Enter english subtitle"
              className="bg-light shadow-none"
            />
          </div>

          <div>
            <InputLabel label="English Description" required />
            <ControlledTextareaField
              name="descriptionEn"
              placeholder="Enter english description"
              className="bg-light shadow-none"
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

      {/* Bengali Fields Section (optional, collapsed by default) */}
      <div className="border border-light-silver rounded-lg bg-white">
        <button
          type="button"
          onClick={() => setShowBnFields((prev) => !prev)}
          className="w-full flex items-center justify-between gap-3 p-8 cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 w-9 h-9 flex items-center justify-center rounded-md border border-primary/20">
              <FileText className="w-4 h-4 text-primary" />
            </div>
            <div className="text-left">
              <Paragraph className="xl:text-lg font-medium text-pBlue">
                Bengali Fields
              </Paragraph>
              <Paragraph className="text-xs! text-gray-500">
                Optional — shown on the site when provided
              </Paragraph>
            </div>
          </div>
          <ChevronDown
            className={cn(
              "w-5 h-5 text-gray-500 transition-transform duration-300",
              showBnFields && "rotate-180"
            )}
          />
        </button>

        <div
          className={cn(
            "grid transition-all duration-300 ease-in-out",
            showBnFields ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          )}
        >
          <div className="overflow-hidden">
            <div className="flex flex-col gap-y-6 px-8 pb-8">
              <div>
                <InputLabel label="Bengali Title" />
                <ControlledInputField
                  name="titleBn"
                  placeholder="Enter bengali title"
                  className="bg-light shadow-none"
                />
              </div>

              <div>
                <InputLabel label="Bengali Subtitle" />
                <ControlledInputField
                  name="subTitleBn"
                  placeholder="Enter bengali subtitle"
                  className="bg-light shadow-none"
                />
              </div>

              <div>
                <InputLabel label="Bengali Description" />
                <ControlledTextareaField
                  name="descriptionBn"
                  placeholder="Enter bengali description"
                  className="bg-light shadow-none"
                />
              </div>
            </div>
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
          label={isEditMode ? "Update Hero" : "Create Hero"}
        />
      </div>
    </form>
  );
};

export default HeroManagementForm;
