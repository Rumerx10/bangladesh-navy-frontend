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
import CourseSectionField from "./CourseSectionField";
import { CoursesSchemaForm } from "../Schema/coursesSchema";

interface CoursesFormProps {
  isEditMode?: boolean;
  onSubmit: (data: CoursesSchemaForm) => void;
  error?: ErrorType | null;
  isPending?: boolean;
  onCancel?: () => void;
}

const CoursesForm = ({
  isEditMode = false,
  onSubmit,
  error,
  isPending = false,
  onCancel,
}: CoursesFormProps) => {
  const { handleSubmit } = useFormContext<CoursesSchemaForm>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
      {/* Introduction */}
      <div className="border border-light-silver rounded-lg p-6 sm:p-8 bg-white">
        <FormSectionHeader
          label="Introduction"
          description="Opening block of the public courses page"
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
              placeholder="Courses"
              className="bg-light shadow-none"
            />
          </div>
          <div>
            <Paragraph className="font-semibold text-pBlue uppercase mb-2">
              Introduction
            </Paragraph>
            <ControlledTextareaField
              name="introduction"
              placeholder="BN Hydrographic Institute offers professional courses in..."
              className="bg-light shadow-none"
            />
          </div>
          <div>
            <Paragraph className="font-semibold text-pBlue uppercase mb-2">
              Course Sequence
            </Paragraph>
            <MultipleStringField
              name="courseSequence"
              itemLabel="Step"
              placeholder="Long Hydrographic Cat-A Course"
            />
          </div>
        </div>
      </div>

      {/* Course descriptions */}
      <div className="border border-light-silver rounded-lg p-6 sm:p-8 bg-white">
        <FormSectionHeader
          label="Course Descriptions"
          description="Rendered in order, numbered on the public page"
        />
        <div className="mt-6">
          <CourseSectionField />
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

export default CoursesForm;
