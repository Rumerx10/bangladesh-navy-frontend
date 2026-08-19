"use client";

import { FileText } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { Button } from "@/src/components/ui/button";
import InputLabel from "@/src/components/shared/InputLabel";
import Paragraph from "@/src/components/shared/Paragraph";
import SubmitButton from "@/src/components/shared/SubmitButton";
import ErrorMessage from "@/src/components/shared/Errors/ErrorMessage";
import ControlledInputField from "@/src/components/shared/FromController/ControlledInputField";
import ControlledSelectField from "@/src/components/shared/FromController/ControlledSelectField";
import ControlledTextareaField from "@/src/components/shared/FromController/ControlledTextareaField";
import { FileUploadController } from "@/src/components/shared/FromController/FileUploadController";
import { ErrorType } from "@/src/components/shared/types/common";
import { NOTICE_TYPE_OPTIONS } from "@/src/components/notices/types";
import { NoticeFormValues } from "../Schema/noticeSchema";

const STATUS_OPTIONS = [
  { label: "Active", value: "ACTIVE" },
  { label: "Inactive", value: "INACTIVE" },
];

const SectionHeader = ({ label }: { label: string }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="bg-primary/10 w-9 h-9 flex items-center justify-center rounded-md border border-primary/20">
      <FileText className="w-4 h-4 text-primary" />
    </div>
    <Paragraph className="xl:text-lg font-medium text-pBlue">{label}</Paragraph>
  </div>
);

interface NoticeFormProps {
  isEditMode?: boolean;
  onSubmit: (data: NoticeFormValues) => void;
  onCancel: () => void;
  isPending?: boolean;
  error?: ErrorType;
}

export default function NoticeForm({
  isEditMode = false,
  onSubmit,
  onCancel,
  isPending = false,
  error,
}: NoticeFormProps) {
  const { handleSubmit } = useFormContext<NoticeFormValues>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
      {/* Notice details */}
      <div className="border border-light-silver rounded-lg p-8 bg-white">
        <SectionHeader label="Notice Details" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <InputLabel label="Notice Number" required />
            <ControlledInputField
              name="noticeNumber"
              placeholder="e.g. NM 21/2026"
              className="bg-light shadow-none"
            />
          </div>
          <div>
            <InputLabel label="Type" required />
            <ControlledSelectField
              name="type"
              options={NOTICE_TYPE_OPTIONS}
              placeholder="Select a notice type"
            />
          </div>
          <div>
            <InputLabel label="Published Date" required />
            <ControlledInputField
              name="publishedAt"
              type="date"
              className="bg-light shadow-none"
            />
          </div>
          <div>
            <InputLabel label="Status" />
            <ControlledSelectField
              name="status"
              options={STATUS_OPTIONS}
              placeholder="Select status"
            />
          </div>
        </div>
      </div>

      {/* English content */}
      <div className="border border-light-silver rounded-lg p-8 bg-white">
        <SectionHeader label="English Content" />
        <div className="flex flex-col gap-y-6">
          <div>
            <InputLabel label="Title (English)" required />
            <ControlledInputField
              name="titleEn"
              placeholder="Enter the notice title in English"
              className="bg-light shadow-none"
            />
          </div>
          <div>
            <InputLabel label="Description (English)" />
            <ControlledTextareaField
              name="descriptionEn"
              placeholder="Enter the notice description in English"
              className="bg-light shadow-none min-h-28"
            />
          </div>
        </div>
      </div>

      {/* Bengali content */}
      <div className="border border-light-silver rounded-lg p-8 bg-white">
        <SectionHeader label="Bengali Content" />
        <div className="flex flex-col gap-y-6">
          <div>
            <InputLabel label="Title (Bengali)" />
            <ControlledInputField
              name="titleBn"
              placeholder="নোটিশের শিরোনাম বাংলায় লিখুন"
              className="bg-light shadow-none"
            />
          </div>
          <div>
            <InputLabel label="Description (Bengali)" />
            <ControlledTextareaField
              name="descriptionBn"
              placeholder="নোটিশের বিবরণ বাংলায় লিখুন"
              className="bg-light shadow-none min-h-28"
            />
          </div>
        </div>
      </div>

      {/* Attachment */}
      <div className="border border-light-silver rounded-lg p-8 bg-white">
        <SectionHeader label="Attachment" />
        <InputLabel label="Notice PDF" />
        <FileUploadController
          name="pdf"
          label="Upload notice PDF"
          accept={["application/pdf"]}
        />
        <Paragraph className="text-xs! text-gray-500 mt-3">
          Optional — when attached, a download button appears on the public
          notice card. Max 10MB.
        </Paragraph>
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
          label={isEditMode ? "Update Notice" : "Create Notice"}
        />
      </div>
    </form>
  );
}
