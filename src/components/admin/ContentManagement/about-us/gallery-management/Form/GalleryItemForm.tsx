"use client";

import Image from "next/image";
import { useState } from "react";
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
import { FileUploadController } from "@/src/components/shared/FromController/FileUploadController";
import { Button } from "@/src/components/ui/button";
import { ErrorType } from "@/src/components/shared/types/common";
import { IGalleryCategory } from "../types";
import { GalleryItemFormValues } from "../Schema/galleryItemSchema";

interface GalleryItemFormProps {
  isEditMode?: boolean;
  onSubmit: (data: GalleryItemFormValues) => void;
  onCancel: () => void;
  isPending?: boolean;
  error?: ErrorType;
}

export default function GalleryItemForm({
  isEditMode = false,
  onSubmit,
  onCancel,
  isPending = false,
  error,
}: GalleryItemFormProps) {
  const [iconLoaded, setIconLoaded] = useState(false);
  const { handleSubmit } = useFormContext<GalleryItemFormValues>();

  const { data: categoryData } = useGet<IGalleryCategory[]>(
    "/gallery-category/list",
    ["gallery-category-list"]
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
              <Image
                src="/icons/file.svg"
                alt="english content"
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

        <div className="mt-6">
          <InputLabel label="Title (English)" required />
          <ControlledInputField
            name="titleEn"
            placeholder="Enter title in English"
            className="bg-light shadow-none"
          />
        </div>
      </div>

      {/* Bengali Content */}
      <div className="border border-light-silver rounded-lg p-8 bg-white">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-primary/10 w-9 h-9 flex items-center justify-center rounded-md border border-primary/20">
            <Image
              src="/icons/file.svg"
              alt="bengali content"
              width={36}
              height={36}
              className="w-4"
            />
          </div>
          <Paragraph className="xl:text-lg font-medium text-pBlue">
            Bengali Content
          </Paragraph>
        </div>

        <InputLabel label="Title (Bengali)" />
        <ControlledInputField
          name="titleBn"
          placeholder="Enter title in Bengali"
          className="bg-light shadow-none"
        />
      </div>

      {/* Image, Category & Position */}
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
            Image, Category & Position
          </Paragraph>
        </div>

        <div className="flex flex-col gap-y-6">
          <div>
            <InputLabel label="Gallery Image" required />
            <FileUploadController
              name="image"
              label="Upload gallery image"
              accept={["image/jpeg", "image/png", "image/webp"]}
            />
          </div>

          <div>
            <InputLabel label="Category" required />
            <ControlledSelectField
              name="galleryCategoryId"
              options={categoryOptions}
              placeholder="Select a category"
            />
          </div>

          <div>
            <InputLabel label="Position" required />
            <ControlledInputField
              name="position"
              type="number"
              placeholder="Enter display position (e.g. 1)"
              className="bg-light shadow-none"
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
          label={isEditMode ? "Update Gallery Item" : "Create Gallery Item"}
        />
      </div>
    </form>
  );
}
