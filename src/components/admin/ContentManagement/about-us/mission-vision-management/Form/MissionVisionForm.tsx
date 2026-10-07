"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronDown, FileText } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { useFormContext } from "react-hook-form";
import { Button } from "@/src/components/ui/button";
import ErrorMessage from "@/src/components/shared/Errors/ErrorMessage";
import ControlledInputField from "@/src/components/shared/FromController/ControlledInputField";
import ControlledTextareaField from "@/src/components/shared/FromController/ControlledTextareaField";
import InputLabel from "@/src/components/shared/InputLabel";
import Paragraph from "@/src/components/shared/Paragraph";
import SubmitButton from "@/src/components/shared/SubmitButton";
import { ErrorType } from "@/src/components/shared/types/common";
import { MissionVisionSchemaForm } from "../Schema/missionVisionSchema";

interface MissionVisionFormProps {
  isEditMode?: boolean;
  onSubmit: (data: MissionVisionSchemaForm) => void;
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
    <div className="flex items-center justify-between gap-4">
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
            <Paragraph className="text-xs! text-secondary-foreground">
              {description}
            </Paragraph>
          )}
        </div>
      </div>
      {showCancel && (
        <Button
          type="button"
          onClick={onCancel}
          className="text-secondary-foreground bg-transparent hover:bg-light-dark duration-300 border hover:shadow cursor-pointer"
        >
          Cancel
        </Button>
      )}
    </div>
  );
};

const MissionVisionForm = ({
  isEditMode = false,
  onSubmit,
  error,
  isPending = false,
  onCancel,
}: MissionVisionFormProps) => {
  const [showBnFields, setShowBnFields] = useState(false);
  const { handleSubmit } = useFormContext<MissionVisionSchemaForm>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
      {/* Section heading */}
      <div className="border border-light-silver rounded-lg p-6 sm:p-8 bg-card">
        <SectionHeader
          label="Section Heading"
          description="Shown above the mission and vision cards"
          onCancel={onCancel}
          showCancel
        />
        <div className="flex flex-col gap-y-6 mt-6">
          <div>
            <InputLabel label="Title (English)" required />
            <ControlledInputField
              name="titleEn"
              placeholder="Vision & Mission"
              className="bg-light shadow-none"
            />
          </div>
          <div>
            <InputLabel label="Sub Title (English)" />
            <ControlledInputField
              name="subTitleEn"
              placeholder="Our guiding principles and strategic direction."
              className="bg-light shadow-none"
            />
          </div>
        </div>
      </div>

      {/* Mission */}
      <div className="border border-light-silver rounded-lg p-6 sm:p-8 bg-card">
        <SectionHeader label="Mission" />
        <div className="flex flex-col gap-y-6 mt-6">
          <div>
            <InputLabel label="Mission Title (English)" required />
            <ControlledInputField
              name="missionTitleEn"
              placeholder="Our Mission"
              className="bg-light shadow-none"
            />
          </div>
          <div>
            <InputLabel label="Mission Description (English)" required />
            <ControlledTextareaField
              name="missionDescriptionEn"
              placeholder="Describe the mission..."
              className="bg-light shadow-none min-h-28"
            />
          </div>
        </div>
      </div>

      {/* Vision */}
      <div className="border border-light-silver rounded-lg p-6 sm:p-8 bg-card">
        <SectionHeader label="Vision" />
        <div className="flex flex-col gap-y-6 mt-6">
          <div>
            <InputLabel label="Vision Title (English)" required />
            <ControlledInputField
              name="visionTitleEn"
              placeholder="Our Vision"
              className="bg-light shadow-none"
            />
          </div>
          <div>
            <InputLabel label="Vision Description (English)" required />
            <ControlledTextareaField
              name="visionDescriptionEn"
              placeholder="Describe the vision..."
              className="bg-light shadow-none min-h-28"
            />
          </div>
        </div>
      </div>

      {/* Bangla Content (optional, collapsed by default) */}
      <div className="border border-light-silver rounded-lg bg-card">
        <button
          type="button"
          onClick={() => setShowBnFields((prev) => !prev)}
          className="w-full flex items-center justify-between gap-3 p-6 sm:p-8 cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 w-9 h-9 flex items-center justify-center rounded-md border border-primary/20">
              <FileText className="w-4 h-4 text-primary" />
            </div>
            <div className="text-left">
              <Paragraph className="xl:text-lg font-medium text-pBlue">
                Bangla Content
              </Paragraph>
              <Paragraph className="text-xs! text-secondary-foreground">
                Optional — stored alongside the English copy
              </Paragraph>
            </div>
          </div>
          <ChevronDown
            className={cn(
              "w-5 h-5 text-secondary-foreground transition-transform duration-300",
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
            <div className="flex flex-col gap-y-6 px-6 sm:px-8 pb-8">
              <div>
                <InputLabel label="Title (Bangla)" />
                <ControlledInputField
                  name="titleBn"
                  placeholder="লক্ষ্য ও উদ্দেশ্য"
                  className="bg-light shadow-none"
                />
              </div>
              <div>
                <InputLabel label="Sub Title (Bangla)" />
                <ControlledInputField
                  name="subTitleBn"
                  placeholder="আমাদের সেবার মূলনীতি"
                  className="bg-light shadow-none"
                />
              </div>
              <div>
                <InputLabel label="Mission Title (Bangla)" />
                <ControlledInputField
                  name="missionTitleBn"
                  placeholder="আমাদের লক্ষ্য"
                  className="bg-light shadow-none"
                />
              </div>
              <div>
                <InputLabel label="Mission Description (Bangla)" />
                <ControlledTextareaField
                  name="missionDescriptionBn"
                  placeholder="লক্ষ্যের বিবরণ বাংলায় লিখুন"
                  className="bg-light shadow-none min-h-28"
                />
              </div>
              <div>
                <InputLabel label="Vision Title (Bangla)" />
                <ControlledInputField
                  name="visionTitleBn"
                  placeholder="আমাদের উদ্দেশ্য"
                  className="bg-light shadow-none"
                />
              </div>
              <div>
                <InputLabel label="Vision Description (Bangla)" />
                <ControlledTextareaField
                  name="visionDescriptionBn"
                  placeholder="উদ্দেশ্যের বিবরণ বাংলায় লিখুন"
                  className="bg-light shadow-none min-h-28"
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
          className="text-secondary-foreground bg-transparent hover:bg-light-dark duration-300 border hover:shadow cursor-pointer"
        >
          Cancel
        </Button>
        <SubmitButton
          isLoading={isPending}
          label={isEditMode ? "Update Content" : "Save Content"}
        />
      </div>
    </form>
  );
};

export default MissionVisionForm;
