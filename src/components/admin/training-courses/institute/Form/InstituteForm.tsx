"use client";

import { useFormContext } from "react-hook-form";
import { Button } from "@/src/components/ui/button";
import ErrorMessage from "@/src/components/shared/Errors/ErrorMessage";
import ControlledInputField from "@/src/components/shared/FromController/ControlledInputField";
import ControlledTextareaField from "@/src/components/shared/FromController/ControlledTextareaField";
import MultipleStringField from "@/src/components/shared/FromController/MultipleStringField";
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
  const { handleSubmit } = useFormContext<InstituteSchemaForm>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
      {/* Basic Information */}
      <div className="border border-light-silver rounded-lg p-6 sm:p-8 bg-white">
        <FormSectionHeader
          label="Basic Information"
          description="Heading shown at the top of the institute page"
          onCancel={onCancel}
          showCancel
        />
        <div className="flex flex-col gap-y-6 mt-6">
          <div>
            <Paragraph className="font-semibold text-pBlue uppercase mb-2">
              Title
            </Paragraph>
            <ControlledInputField
              name="title"
              placeholder="About BN Hydrographic Institute"
              className="bg-light shadow-none"
            />
          </div>
          <div>
            <Paragraph className="font-semibold text-pBlue uppercase mb-2">
              Sub Title
            </Paragraph>
            <ControlledInputField
              name="subTitle"
              placeholder="Established 1983 at BNS Issa Khan"
              className="bg-light shadow-none"
            />
          </div>
        </div>
      </div>

      {/* About */}
      <div className="border border-light-silver rounded-lg p-6 sm:p-8 bg-white">
        <FormSectionHeader
          label="About the Institute"
          description="Each entry renders as its own paragraph"
        />
        <div className="mt-6">
          <ParagraphListField
            name="aboutParagraphs"
            placeholder="Describe the institute..."
            emptyMessage="No about paragraphs added yet."
          />
        </div>
      </div>

      {/* Vision */}
      <div className="border border-light-silver rounded-lg p-6 sm:p-8 bg-white">
        <FormSectionHeader label="Vision" />
        <div className="flex flex-col gap-y-6 mt-6">
          <div>
            <Paragraph className="font-semibold text-pBlue uppercase mb-2">
              Title
            </Paragraph>
            <ControlledInputField
              name="visionTitle"
              placeholder="Vision"
              className="bg-light shadow-none"
            />
          </div>
          <div>
            <Paragraph className="font-semibold text-pBlue uppercase mb-2">
              Description
            </Paragraph>
            <ControlledTextareaField
              name="visionDescription"
              placeholder="Describe the vision..."
              className="bg-light shadow-none"
            />
          </div>
        </div>
      </div>

      {/* Mission */}
      <div className="border border-light-silver rounded-lg p-6 sm:p-8 bg-white">
        <FormSectionHeader
          label="Mission"
          description="Each point renders as a bullet in the mission card"
        />
        <div className="flex flex-col gap-y-6 mt-6">
          <div>
            <Paragraph className="font-semibold text-pBlue uppercase mb-2">
              Title
            </Paragraph>
            <ControlledInputField
              name="missionTitle"
              placeholder="Mission"
              className="bg-light shadow-none"
            />
          </div>
          <div>
            <Paragraph className="font-semibold text-pBlue uppercase mb-2">
              Mission Points
            </Paragraph>
            <MultipleStringField
              name="missionPoints"
              itemLabel="Point"
              placeholder="Deliver high-quality training in hydrography..."
            />
          </div>
        </div>
      </div>

      {/* Training Overview */}
      <div className="border border-light-silver rounded-lg p-6 sm:p-8 bg-white">
        <FormSectionHeader
          label="Training Overview"
          description="Closing block on the institute page"
        />
        <div className="flex flex-col gap-y-6 mt-6">
          <div>
            <Paragraph className="font-semibold text-pBlue uppercase mb-2">
              Title
            </Paragraph>
            <ControlledInputField
              name="trainingOverviewTitle"
              placeholder="Training Overview"
              className="bg-light shadow-none"
            />
          </div>
          <div>
            <Paragraph className="font-semibold text-pBlue uppercase mb-2">
              Paragraphs
            </Paragraph>
            <ParagraphListField
              name="trainingOverviewParagraphs"
              placeholder="Describe how training is delivered and how to apply..."
              emptyMessage="No training overview paragraphs added yet."
            />
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
          label={isEditMode ? "Update Changes" : "Save Content"}
        />
      </div>
    </form>
  );
};

export default InstituteForm;
