"use client";

import Image from "next/image";
import { FileText } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { useGet } from "@/src/hooks/useGet";
import { mapToSelectOptions } from "@/src/utils/mapToSelectOptions";
import { Button } from "@/src/components/ui/button";
import InputLabel from "@/src/components/shared/InputLabel";
import Paragraph from "@/src/components/shared/Paragraph";
import SubmitButton from "@/src/components/shared/SubmitButton";
import TextEditor from "@/src/components/shared/text-editor/TextEditor";
import ErrorMessage from "@/src/components/shared/Errors/ErrorMessage";
import ControlledInputField from "@/src/components/shared/FromController/ControlledInputField";
import ControlledSelectField from "@/src/components/shared/FromController/ControlledSelectField";
import { FileUploadController } from "@/src/components/shared/FromController/FileUploadController";
import { ErrorType } from "@/src/components/shared/types/common";
import { INewsEventCategory } from "../types";
import { NewsEventsFormValues } from "../Schema/newsEventsSchema";

interface NewsEventsFormProps {
  isEditMode?: boolean;
  onSubmit: (data: NewsEventsFormValues) => void;
  onCancel: () => void;
  isPending?: boolean;
  error?: ErrorType;
}

export default function NewsEventsForm({
  isEditMode = false,
  onSubmit,
  onCancel,
  isPending = false,
  error,
}: NewsEventsFormProps) {
  const {
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useFormContext<NewsEventsFormValues>();

  const { data: categoryData } = useGet<INewsEventCategory[]>(
    "/news-events-category/list",
    ["news-events-category-list"]
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
            <InputLabel label="Title (English)" required />
            <ControlledInputField
              name="titleEn"
              placeholder="Enter title in English"
              className="bg-light shadow-none"
            />
          </div>

          <div>
            <InputLabel label="Content (English)" required />
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

      {/* Bengali Content */}
      <div className="border border-light-silver rounded-lg p-8 bg-white">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-primary/10 w-9 h-9 flex items-center justify-center rounded-md border border-primary/20">
            <FileText className="w-4 h-4 text-primary" />
          </div>
          <Paragraph className="xl:text-lg font-medium text-pBlue">
            Bengali Content
          </Paragraph>
        </div>

        <div className="flex flex-col gap-y-6">
          <div>
            <InputLabel label="Title (Bengali)" />
            <ControlledInputField
              name="titleBn"
              placeholder="Enter title in Bengali"
              className="bg-light shadow-none"
            />
          </div>

          <div>
            <InputLabel label="Content (Bengali)" />
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

      {/* Image, Category */}
      <div className="border border-light-silver rounded-lg p-8 bg-white">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-primary/10 w-9 h-9 flex items-center justify-center rounded-md border border-primary/20">
            <Image
              src="/icons/media.svg"
              alt="image and category"
              width={36}
              height={36}
              className="w-4"
            />
          </div>
          <Paragraph className="xl:text-lg font-medium text-pBlue">
            Image & Category
          </Paragraph>
        </div>

        <div className="flex flex-col gap-y-6">
          <div>
            <InputLabel label="Cover Image" />
            <FileUploadController
              name="image"
              label="Upload cover image"
              accept={["image/jpeg", "image/png", "image/webp"]}
            />
          </div>

          <div>
            <InputLabel label="Category" required />
            <ControlledSelectField
              name="newsCategoryId"
              options={categoryOptions}
              placeholder="Select a category"
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
          label={isEditMode ? "Update News" : "Create News"}
        />
      </div>
    </form>
  );
}
