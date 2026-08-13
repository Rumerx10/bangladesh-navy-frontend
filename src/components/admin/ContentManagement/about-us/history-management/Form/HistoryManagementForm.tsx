"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { useFormContext } from "react-hook-form";
import { Button } from "@/src/components/ui/button";
import ErrorMessage from "@/src/components/shared/Errors/ErrorMessage";
import Paragraph from "@/src/components/shared/Paragraph";
import SubmitButton from "@/src/components/shared/SubmitButton";
import { ErrorType } from "@/src/components/shared/types/common";
import { HistoryManagementSchemaForm } from "../Schema/historyManagementSchema";
import InputLabel from "@/src/components/shared/InputLabel";
import TextEditor from "@/src/components/shared/text-editor/TextEditor";
// Commented out — Key Milestones/Timeline are not part of the current /history API.
// Kept for potential future re-enablement.
// import { FileUploadController } from "@/src/components/shared/FromController/FileUploadController";
// import ControlledInputField from "@/src/components/shared/FromController/ControlledInputField";
// import KeyMilestonesField from "./KeyMilestonesField";
// import TimelineItemsField from "./TimelineItemsField";

interface HistoryManagementFormProps {
  isEditMode?: boolean;
  onSubmit: (data: HistoryManagementSchemaForm) => void;
  error?: ErrorType | null;
  isPending?: boolean;
  onCancel?: () => void;
}

const SectionHeader = ({
  label,
  description,
  onCancel,
  showCancel = false,
}: {
  label: string;
  description?: string;
  onCancel?: () => void;
  showCancel?: boolean;
}) => {
  const [iconLoaded, setIconLoaded] = useState(false);

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="bg-primary/10 w-9 h-9 flex items-center justify-center rounded-md border border-primary/20">
          <Image
            src="/icons/media.svg"
            alt={label}
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
        <div>
          <Paragraph className="xl:text-lg font-medium text-pBlue">
            {label}
          </Paragraph>
          {description && (
            <Paragraph className="text-xs! text-gray-500">
              {description}
            </Paragraph>
          )}
        </div>
      </div>
      {showCancel && (
        <Button
          type="button"
          onClick={onCancel}
          className="text-secondary-foreground bg-transparent hover:bg-gray-100 duration-300 border hover:shadow cursor-pointer"
        >
          Cancel
        </Button>
      )}
    </div>
  );
};

const HistoryManagementForm = ({
  isEditMode = false,
  onSubmit,
  error,
  isPending = false,
  onCancel,
}: HistoryManagementFormProps) => {
  const {
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<HistoryManagementSchemaForm>();
  const [showBnContent, setShowBnContent] = useState(false);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
      {/* Basic Information */}
      <div className="border border-light-silver rounded-lg p-8 bg-white">
        <SectionHeader label="History Content" onCancel={onCancel} showCancel />

        {/* Commented out — Image/Title/Sub Title are not part of the current /history API. */}
        {/* <div className="mt-6">
          <Paragraph className="font-semibold text-pBlue uppercase mb-2">
            Image
          </Paragraph>
          <FileUploadController name="image" label="Upload history image" />
        </div> */}

        <div className="flex flex-col gap-y-6 mt-6">
          {/* <div>
            <Paragraph className="font-semibold text-pBlue uppercase mb-2">
              Title
            </Paragraph>
            <ControlledInputField
              name="title"
              placeholder="History of Bangladesh Navy"
              className="bg-light shadow-none"
            />
          </div>
          <div>
            <Paragraph className="font-semibold text-pBlue uppercase mb-2">
              Sub Title
            </Paragraph>
            <ControlledInputField
              name="subTitle"
              placeholder="A legacy of maritime excellence"
              className="bg-light shadow-none"
            />
          </div> */}
          <div>
            <InputLabel
              label="English Content"
              required
              className="font-semibold text-pBlue uppercase mb-2"
            />
            <TextEditor
              value={watch("contentEn")}
              onChange={(value) =>
                setValue("contentEn", value, { shouldValidate: true })
              }
              error={errors?.contentEn}
            />
          </div>
        </div>
      </div>

      {/* Bengali Content Section (optional, collapsed by default) */}
      <div className="border border-light-silver rounded-lg bg-white">
        <button
          type="button"
          onClick={() => setShowBnContent((prev) => !prev)}
          className="w-full flex items-center justify-between gap-3 p-8 cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 w-9 h-9 flex items-center justify-center rounded-md border border-primary/20">
              <Image
                src="/icons/media.svg"
                alt="bengali content"
                width={36}
                height={36}
                className="w-4"
              />
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
              showBnContent && "rotate-180"
            )}
          />
        </button>

        <div
          className={cn(
            "grid transition-all duration-300 ease-in-out",
            showBnContent ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          )}
        >
          <div className="overflow-hidden">
            <div className="px-8 pb-8">
              <InputLabel
                label="Bengali Content"
                className="font-semibold text-pBlue uppercase mb-2"
              />
              <TextEditor
                value={watch("contentBn")}
                onChange={(value) =>
                  setValue("contentBn", value, { shouldValidate: true })
                }
                error={errors?.contentBn}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Commented out — Timeline is not part of the current /history API. */}
      {/* <div className="border border-light-silver rounded-lg p-8 bg-white">
        <SectionHeader label="Timeline" />
        <div className="mt-6">
          <TimelineItemsField name="timelineItems" />
        </div>
      </div> */}

      {/* Commented out — Key Milestones is not part of the current /history API. */}
      {/* <div className="border border-light-silver rounded-lg p-8 bg-white">
        <SectionHeader label="Key Milestones" />
        <div className="mt-6">
          <KeyMilestonesField name="keyMilestones" />
        </div>
      </div> */}

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
          label={isEditMode ? "Update History" : "Create History"}
        />
      </div>
    </form>
  );
};

export default HistoryManagementForm;
