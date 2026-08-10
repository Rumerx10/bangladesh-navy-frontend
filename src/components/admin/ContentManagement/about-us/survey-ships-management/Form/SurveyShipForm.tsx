"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronDown, FileText } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { useFormContext } from "react-hook-form";
import { useGet } from "@/src/hooks/useGet";
import { mapToSelectOptions } from "@/src/utils/mapToSelectOptions";
import InputLabel from "@/src/components/shared/InputLabel";
import Paragraph from "@/src/components/shared/Paragraph";
import SubmitButton from "@/src/components/shared/SubmitButton";
import ErrorMessage from "@/src/components/shared/Errors/ErrorMessage";
import ControlledInputField from "@/src/components/shared/FromController/ControlledInputField";
import ControlledSelectField from "@/src/components/shared/FromController/ControlledSelectField";
import ControlledTextareaField from "@/src/components/shared/FromController/ControlledTextareaField";
import MultipleStringField from "@/src/components/shared/FromController/MultipleStringField";
import { FileUploadController } from "@/src/components/shared/FromController/FileUploadController";
import { Button } from "@/src/components/ui/button";
import { ErrorType } from "@/src/components/shared/types/common";
import { ISurveyCategory } from "../types";
import { SurveyShipFormValues } from "../Schema/surveyShipSchema";

const STATUS_OPTIONS = [
  { label: "Active", value: "ACTIVE" },
  { label: "Inactive", value: "INACTIVE" },
];

interface SurveyShipFormProps {
  isEditMode?: boolean;
  onSubmit: (data: SurveyShipFormValues) => void;
  onCancel: () => void;
  isPending?: boolean;
  error?: ErrorType;
}

const SurveyShipForm = ({
  isEditMode = false,
  onSubmit,
  onCancel,
  isPending = false,
  error,
}: SurveyShipFormProps) => {
  const [showBnFields, setShowBnFields] = useState(false);
  const { handleSubmit } = useFormContext<SurveyShipFormValues>();

  const { data: categoryData } = useGet<ISurveyCategory[]>(
    "/survey-category/list",
    ["survey-category-list"]
  );

  const categoryOptions = mapToSelectOptions(
    Array.isArray(categoryData?.data) ? categoryData.data : [],
    "nameEn",
    "id"
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
      {/* English Content */}
      <div className="border border-light-silver rounded-lg p-8 bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 w-9 h-9 flex items-center justify-center rounded-md border border-primary/20">
              <FileText className="w-4 h-4 text-primary" />
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
            <InputLabel label="Ship Name (English)" required />
            <ControlledInputField
              name="nameEn"
              placeholder="e.g. BNS Anushandhan"
              className="bg-light shadow-none"
            />
          </div>
          <div>
            <InputLabel label="Description (English)" required />
            <ControlledTextareaField
              name="descriptionEn"
              placeholder="Enter ship description in English"
              className="bg-light shadow-none min-h-24"
            />
          </div>
        </div>
      </div>

      {/* Image, Category & Status */}
      <div className="border border-light-silver rounded-lg p-8 bg-white">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-primary/10 w-9 h-9 flex items-center justify-center rounded-md border border-primary/20">
            <Image
              src="/icons/media.svg"
              alt="media"
              width={36}
              height={36}
              className="w-4"
            />
          </div>
          <Paragraph className="xl:text-lg font-medium text-pBlue">
            Image, Category & Status
          </Paragraph>
        </div>

        <div className="flex flex-col gap-y-6">
          <div>
            <InputLabel label="Ship Image" required />
            <FileUploadController
              name="image"
              label="Upload ship image"
              accept={["image/jpeg", "image/png", "image/webp"]}
            />
          </div>

          <div>
            <InputLabel label="Category" required />
            <ControlledSelectField
              name="surveyCategoryId"
              options={categoryOptions}
              placeholder="Select a category"
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
        </div>
      </div>

      {/* Basic Information */}
      <div className="border border-light-silver rounded-lg p-8 bg-white">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-primary/10 w-9 h-9 flex items-center justify-center rounded-md border border-primary/20">
            <FileText className="w-4 h-4 text-primary" />
          </div>
          <Paragraph className="xl:text-lg font-medium text-pBlue">
            Basic Information
          </Paragraph>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <InputLabel label="Length" required />
            <ControlledInputField
              name="length"
              placeholder="e.g. 60 m"
              className="bg-light shadow-none"
            />
          </div>
          <div>
            <InputLabel label="Beam" required />
            <ControlledInputField
              name="beam"
              placeholder="e.g. 10 m"
              className="bg-light shadow-none"
            />
          </div>
          <div>
            <InputLabel label="Draft" required />
            <ControlledInputField
              name="draft"
              placeholder="e.g. 3 m"
              className="bg-light shadow-none"
            />
          </div>
          <div>
            <InputLabel label="Crew" required />
            <ControlledInputField
              name="crew"
              placeholder="e.g. 45"
              className="bg-light shadow-none"
            />
          </div>
        </div>

        <div className="mt-6">
          <InputLabel label="Capabilities" required />
          <MultipleStringField
            name="surveyEquipment"
            itemLabel="Equipment"
            placeholder="e.g. Multibeam echo sounder"
          />
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
                Bengali Content
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
                <InputLabel label="Ship Name (Bengali)" />
                <ControlledInputField
                  name="nameBn"
                  placeholder="জাহাজের নাম বাংলায় লিখুন"
                  className="bg-light shadow-none"
                />
              </div>
              <div>
                <InputLabel label="Description (Bengali)" />
                <ControlledTextareaField
                  name="descriptionBn"
                  placeholder="জাহাজের বিবরণ বাংলায় লিখুন"
                  className="bg-light shadow-none min-h-24"
                />
              </div>
            </div>
          </div>
        </div>
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
          label={isEditMode ? "Update Survey Ship" : "Create Survey Ship"}
        />
      </div>
    </form>
  );
};

export default SurveyShipForm;
