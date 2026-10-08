"use client";

import { useState } from "react";
import { ChevronDown, FileText } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { cn } from "@/src/lib/utils";
import { Button } from "@/src/components/ui/button";
import InputLabel from "@/src/components/shared/InputLabel";
import Paragraph from "@/src/components/shared/Paragraph";
import SubmitButton from "@/src/components/shared/SubmitButton";
import ErrorMessage from "@/src/components/shared/Errors/ErrorMessage";
import ControlledInputField from "@/src/components/shared/FromController/ControlledInputField";
import ControlledTextareaField from "@/src/components/shared/FromController/ControlledTextareaField";
import StringListField from "@/src/components/shared/FromController/StringListField";
import { ErrorType } from "@/src/components/shared/types/common";
import FormSectionHeader from "../../FormSectionHeader";
import { CourseContentFormValues } from "../Schema/courseContentSchema";
import CourseSectionField from "./CourseSectionField";

interface CourseContentFormProps {
  isEditMode?: boolean;
  onSubmit: (data: CourseContentFormValues) => void;
  error?: ErrorType | null;
  isPending?: boolean;
  onCancel?: () => void;
}

const CourseContentForm = ({
  isEditMode = false,
  onSubmit,
  error,
  isPending = false,
  onCancel,
}: CourseContentFormProps) => {
  const [showBnFields, setShowBnFields] = useState(false);
  const { handleSubmit } = useFormContext<CourseContentFormValues>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
      {/* English Content */}
      <div className="border border-light-silver rounded-lg p-6 sm:p-8 bg-card">
        <FormSectionHeader
          label="English Content"
          description="Heading and introduction at the top of the public courses page"
          onCancel={onCancel}
          showCancel
        />
        <div className="flex flex-col gap-y-6 mt-6">
          <div>
            <InputLabel label="Title (English)" required />
            <ControlledInputField
              name="titleEn"
              placeholder="Courses"
              className="bg-light shadow-none"
            />
          </div>
          <div>
            <InputLabel label="Introduction (English)" required />
            <ControlledTextareaField
              name="introductionEn"
              placeholder="Describe what the institute offers..."
              className="bg-light shadow-none min-h-28"
            />
          </div>
          <div>
            <InputLabel label="Course Sequence (English)" required />
            <Paragraph className="mb-2 text-xs! text-secondary-foreground">
              Rendered as the numbered list in the “Course Sequence” card — the
              order here is the order visitors see.
            </Paragraph>
            <StringListField
              name="courseSequenceEn"
              itemLabel="Course"
              numbered
              placeholder="e.g. Long Hydrographic Cat-A Course"
              emptyMessage="No courses added yet."
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
                  placeholder="কোর্সসমূহ"
                  className="bg-light shadow-none"
                />
              </div>
              <div>
                <InputLabel label="Introduction (Bangla)" />
                <ControlledTextareaField
                  name="introductionBn"
                  placeholder="ভূমিকা বাংলায় লিখুন"
                  className="bg-light shadow-none min-h-28"
                />
              </div>
              <div>
                <InputLabel label="Course Sequence (Bangla)" />
                <StringListField
                  name="courseSequenceBn"
                  itemLabel="Course"
                  numbered
                  placeholder="দীর্ঘ হাইড্রোগ্রাফিক ক্যাট-এ কোর্স"
                  emptyMessage="No Bangla courses added yet."
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Descriptions */}
      <div className="border border-light-silver rounded-lg p-6 sm:p-8 bg-card">
        <FormSectionHeader
          label="Course Descriptions"
          description="One block per course category, in the order shown on the page"
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

export default CourseContentForm;
