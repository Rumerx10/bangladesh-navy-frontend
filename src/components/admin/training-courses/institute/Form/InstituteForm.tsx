"use client";

import { useState } from "react";
import { ChevronDown, FileText } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { useFormContext } from "react-hook-form";
import { Button } from "@/src/components/ui/button";
import ErrorMessage from "@/src/components/shared/Errors/ErrorMessage";
import ControlledInputField from "@/src/components/shared/FromController/ControlledInputField";
import ControlledTextareaField from "@/src/components/shared/FromController/ControlledTextareaField";
import StringListField from "@/src/components/shared/FromController/StringListField";
import InputLabel from "@/src/components/shared/InputLabel";
import Paragraph from "@/src/components/shared/Paragraph";
import SubmitButton from "@/src/components/shared/SubmitButton";
import { ErrorType } from "@/src/components/shared/types/common";
import FormSectionHeader from "../../FormSectionHeader";
import ParagraphListField from "../../ParagraphListField";
import { InstituteSchemaForm } from "../Schema/instituteSchema";

interface InstituteFormProps {
  isEditMode?: boolean;
  onSubmit: (data: InstituteSchemaForm) => void;
  error?: ErrorType | null;
  isPending?: boolean;
  onCancel?: () => void;
}

const InstituteForm = ({
  isEditMode = false,
  onSubmit,
  error,
  isPending = false,
  onCancel,
}: InstituteFormProps) => {
  const [showBnFields, setShowBnFields] = useState(false);
  const { handleSubmit } = useFormContext<InstituteSchemaForm>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
      {/* Basic Information */}
      <div className="border border-light-silver rounded-lg p-6 sm:p-8 bg-card">
        <FormSectionHeader
          label="Basic Information"
          description="Heading shown at the top of the institute page"
          onCancel={onCancel}
          showCancel
        />
        <div className="flex flex-col gap-y-6 mt-6">
          <div>
            <InputLabel label="Title (English)" required />
            <ControlledInputField
              name="titleEn"
              placeholder="About BN Hydrographic Institute"
              className="bg-light shadow-none"
            />
          </div>
          <div>
            <InputLabel label="Sub Title (English)" />
            <ControlledInputField
              name="subTitleEn"
              placeholder="Established 04 May 1983 at BNS Issa Khan"
              className="bg-light shadow-none"
            />
          </div>
        </div>
      </div>

      {/* About */}
      <div className="border border-light-silver rounded-lg p-6 sm:p-8 bg-card">
        <FormSectionHeader
          label="About the Institute"
          description="Each entry renders as its own paragraph"
        />
        <div className="mt-6">
          <InputLabel label="Paragraphs (English)" required />
          <ParagraphListField
            name="aboutParagraphsEn"
            placeholder="Describe the institute..."
            emptyMessage="No about paragraphs added yet."
          />
        </div>
      </div>

      {/* Vision */}
      <div className="border border-light-silver rounded-lg p-6 sm:p-8 bg-card">
        <FormSectionHeader label="Vision" />
        <div className="flex flex-col gap-y-6 mt-6">
          <div>
            <InputLabel label="Vision Title (English)" required />
            <ControlledInputField
              name="visionTitleEn"
              placeholder="Vision"
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

      {/* Mission */}
      <div className="border border-light-silver rounded-lg p-6 sm:p-8 bg-card">
        <FormSectionHeader
          label="Mission"
          description="Each point renders as a bullet in the mission card"
        />
        <div className="flex flex-col gap-y-6 mt-6">
          <div>
            <InputLabel label="Mission Title (English)" required />
            <ControlledInputField
              name="missionTitleEn"
              placeholder="Mission"
              className="bg-light shadow-none"
            />
          </div>
          <div>
            <InputLabel label="Mission Points (English)" required />
            <StringListField
              name="missionPointsEn"
              itemLabel="Point"
              placeholder="Deliver high-quality training in hydrography..."
              emptyMessage="No mission points added yet."
            />
          </div>
        </div>
      </div>

      {/* Training Overview */}
      <div className="border border-light-silver rounded-lg p-6 sm:p-8 bg-card">
        <FormSectionHeader
          label="Training Overview"
          description="Closing block on the institute page"
        />
        <div className="flex flex-col gap-y-6 mt-6">
          <div>
            <InputLabel label="Title (English)" required />
            <ControlledInputField
              name="trainingOverviewTitleEn"
              placeholder="Training Overview"
              className="bg-light shadow-none"
            />
          </div>
          <div>
            <InputLabel label="Paragraphs (English)" required />
            <ParagraphListField
              name="trainingOverviewParagraphsEn"
              placeholder="Describe how training is delivered and how to apply..."
              emptyMessage="No training overview paragraphs added yet."
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
                  placeholder="বিএন হাইড্রোগ্রাফিক ইনস্টিটিউট সম্পর্কে"
                  className="bg-light shadow-none"
                />
              </div>
              <div>
                <InputLabel label="Sub Title (Bangla)" />
                <ControlledInputField
                  name="subTitleBn"
                  placeholder="০৪ মে ১৯৮৩ সালে বানৌজা ঈসা খানে প্রতিষ্ঠিত"
                  className="bg-light shadow-none"
                />
              </div>
              <div>
                <InputLabel label="About Paragraphs (Bangla)" />
                <ParagraphListField
                  name="aboutParagraphsBn"
                  placeholder="ইনস্টিটিউট সম্পর্কে বাংলায় লিখুন"
                  emptyMessage="No Bangla about paragraphs added yet."
                />
              </div>
              <div>
                <InputLabel label="Vision Title (Bangla)" />
                <ControlledInputField
                  name="visionTitleBn"
                  placeholder="রূপকল্প"
                  className="bg-light shadow-none"
                />
              </div>
              <div>
                <InputLabel label="Vision Description (Bangla)" />
                <ControlledTextareaField
                  name="visionDescriptionBn"
                  placeholder="রূপকল্পের বিবরণ বাংলায় লিখুন"
                  className="bg-light shadow-none min-h-28"
                />
              </div>
              <div>
                <InputLabel label="Mission Title (Bangla)" />
                <ControlledInputField
                  name="missionTitleBn"
                  placeholder="অভিলক্ষ্য"
                  className="bg-light shadow-none"
                />
              </div>
              <div>
                <InputLabel label="Mission Points (Bangla)" />
                <StringListField
                  name="missionPointsBn"
                  itemLabel="Point"
                  placeholder="হাইড্রোগ্রাফি ও সংশ্লিষ্ট বিষয়ে উচ্চমানের প্রশিক্ষণ প্রদান।"
                  emptyMessage="No Bangla mission points added yet."
                />
              </div>
              <div>
                <InputLabel label="Training Overview Title (Bangla)" />
                <ControlledInputField
                  name="trainingOverviewTitleBn"
                  placeholder="প্রশিক্ষণ সংক্ষিপ্ত বিবরণ"
                  className="bg-light shadow-none"
                />
              </div>
              <div>
                <InputLabel label="Training Overview Paragraphs (Bangla)" />
                <ParagraphListField
                  name="trainingOverviewParagraphsBn"
                  placeholder="প্রশিক্ষণ সম্পর্কে বাংলায় লিখুন"
                  emptyMessage="No Bangla training overview paragraphs added yet."
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

export default InstituteForm;
