"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/src/lib/utils";
import { useFormContext } from "react-hook-form";
import { Button } from "@/src/components/ui/button";
import ErrorMessage from "@/src/components/shared/Errors/ErrorMessage";
import ControlledInputField from "@/src/components/shared/FromController/ControlledInputField";
import ControlledTextareaField from "@/src/components/shared/FromController/ControlledTextareaField";
import { FileUploadController } from "@/src/components/shared/FromController/FileUploadController";
import Paragraph from "@/src/components/shared/Paragraph";
import SubmitButton from "@/src/components/shared/SubmitButton";
import { ErrorType } from "@/src/components/shared/types/common";
import { HistoryManagementSchemaForm } from "../Schema/historyManagementSchema";
import KeyMilestonesField from "./KeyMilestonesField";
import TimelineItemsField from "./TimelineItemsField";

interface HistoryManagementFormProps {
  isEditMode?: boolean;
  onSubmit: (data: HistoryManagementSchemaForm) => void;
  error?: ErrorType | null;
  isPending?: boolean;
  onCancel?: () => void;
}

const SectionHeader = ({
  label,
  onCancel,
  showCancel = false,
}: {
  label: string;
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
        <Paragraph className="xl:text-lg font-medium text-pBlue">
          {label}
        </Paragraph>
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
  const { handleSubmit } = useFormContext<HistoryManagementSchemaForm>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
      {/* Basic Information */}
      <div className="border border-light-silver rounded-lg p-8 bg-white">
        <SectionHeader
          label="Basic Information"
          onCancel={onCancel}
          showCancel
        />

        <div className="mt-6">
          <Paragraph className="font-semibold text-pBlue uppercase mb-2">
            Image
          </Paragraph>
          <FileUploadController name="image" label="Upload history image" />
        </div>

        <div className="flex flex-col gap-y-6 mt-6">
          <div>
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
        </div>
      </div>
      {/* Timeline Items */}
      <div className="border border-light-silver rounded-lg p-8 bg-white">
        <SectionHeader label="Timeline" />
        <div className="mt-6">
          <TimelineItemsField name="timelineItems" />
        </div>
      </div>
      {/* Key Milestones */}
      <div className="border border-light-silver rounded-lg p-8 bg-white">
        <SectionHeader label="Key Milestones" />
        <div className="mt-6">
          <KeyMilestonesField name="keyMilestones" />
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
          label={isEditMode ? "Updating Changes" : "Update Changes"}
        />
      </div>
    </form>
  );
};

export default HistoryManagementForm;
