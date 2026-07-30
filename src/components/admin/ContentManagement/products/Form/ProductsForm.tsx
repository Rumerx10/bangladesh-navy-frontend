"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { useFormContext } from "react-hook-form";
import { Button } from "@/src/components/ui/button";
import InputLabel from "@/src/components/shared/InputLabel";
import Paragraph from "@/src/components/shared/Paragraph";
import SubmitButton from "@/src/components/shared/SubmitButton";
import ErrorMessage from "@/src/components/shared/Errors/ErrorMessage";
import ControlledInputField from "@/src/components/shared/FromController/ControlledInputField";
import ControlledSelectField from "@/src/components/shared/FromController/ControlledSelectField";
import ControlledTextareaField from "@/src/components/shared/FromController/ControlledTextareaField";
import { MultipleImageUploadController } from "@/src/components/shared/FromController/MultipleImageFileInput";
import { ErrorType } from "@/src/components/shared/types/common";
import { useGet } from "@/src/hooks/useGet";
import { mapToSelectOptions } from "@/src/utils/mapToSelectOptions";
import { IProductCategory, IProduct } from "../types";
import { ProductFormValues } from "../Schema/productsSchema";

const STATUS_OPTIONS = [
  { label: "Active", value: "ACTIVE" },
  { label: "Inactive", value: "INACTIVE" },
];

interface ProductFormProps {
  isEditMode?: boolean;
  onSubmit: (data: ProductFormValues) => void;
  onCancel: () => void;
  isPending?: boolean;
  error?: ErrorType;
  initialValues?: IProduct;
}

const SectionHeader = ({ label }: { label: string }) => {
  const [iconLoaded, setIconLoaded] = useState(false);
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="bg-primary/10 w-9 h-9 flex items-center justify-center rounded-md border border-primary/20">
        <Image
          src="/icons/file.svg"
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
  );
};

export default function ProductForm({
  isEditMode = false,
  onSubmit,
  onCancel,
  isPending = false,
  error,
  initialValues,
}: ProductFormProps) {
  const { handleSubmit } = useFormContext<ProductFormValues>();
  const [showBnFields, setShowBnFields] = useState(false);

  const { data: categoryData } = useGet<IProductCategory[]>("/category/list", [
    "category-list",
  ]);

  const categoryOptions = mapToSelectOptions(
    Array.isArray(categoryData?.data) ? categoryData.data : [],
    "nameEn",
    "id"
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
      {/* English Content */}
      <div className="border border-light-silver rounded-lg p-8 bg-white">
        <div className="flex items-center justify-between mb-6">
          <SectionHeader label="English Content" />
          <Button
            type="button"
            onClick={onCancel}
            className="text-secondary-foreground bg-transparent hover:bg-gray-100 duration-300 border hover:shadow cursor-pointer -mt-6"
          >
            Cancel
          </Button>
        </div>
        <div className="flex flex-col gap-y-6">
          <div>
            <InputLabel label="Product Name (English)" required />
            <ControlledInputField
              name="nameEn"
              placeholder="e.g. Bay of Bengal Coastal Chart"
              className="bg-light shadow-none"
            />
          </div>
          <div>
            <InputLabel label="Description (English)" required />
            <ControlledTextareaField
              name="descriptionEn"
              placeholder="Enter product description in English"
              className="bg-light shadow-none min-h-24"
            />
          </div>
        </div>
      </div>

      {/* Bengali Fields Section (optional, collapsed by default) */}
      <div className="border border-light-silver rounded-lg bg-white">
        <button
          type="button"
          onClick={() => setShowBnFields((prev) => !prev)}
          className="w-full flex items-center justify-between gap-3 p-8 cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 w-9 h-9 flex items-center justify-center rounded-md border border-primary/20">
              <Image
                src="/icons/file.svg"
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
            <div className="flex flex-col gap-y-6 px-8 pb-8">
              <div>
                <InputLabel label="Product Name (Bengali)" />
                <ControlledInputField
                  name="nameBn"
                  placeholder="পণ্যের নাম বাংলায় লিখুন"
                  className="bg-light shadow-none"
                />
              </div>
              <div>
                <InputLabel label="Description (Bengali)" />
                <ControlledTextareaField
                  name="descriptionBn"
                  placeholder="পণ্যের বিবরণ বাংলায় লিখুন"
                  className="bg-light shadow-none min-h-24"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Images */}
      <div className="border border-light-silver rounded-lg p-8 bg-white">
        <SectionHeader label="Product Images" />
        <InputLabel label="Images" required />
        <MultipleImageUploadController
          name="images"
          label="Upload product images"
          initialUrls={initialValues?.images || []}
        />
      </div>

      {/* Category, Status, Chart Code */}
      <div className="border border-light-silver rounded-lg p-8 bg-white">
        <SectionHeader label="Details" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <InputLabel label="Category" required />
            <ControlledSelectField
              name="categoryId"
              options={categoryOptions}
              placeholder="Select a category"
            />
          </div>
          <div>
            <InputLabel label="Status" required />
            <ControlledSelectField
              name="status"
              options={STATUS_OPTIONS}
              placeholder="Select status"
            />
          </div>
          <div>
            <InputLabel label="Chart Code" required />
            <ControlledInputField
              name="chartCode"
              type="number"
              placeholder="e.g. 123456"
              className="bg-light shadow-none"
            />
          </div>
        </div>
      </div>

      {/* Nautical Chart Details */}
      <div className="border border-light-silver rounded-lg p-8 bg-white">
        <SectionHeader label="Nautical Chart Details" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="sm:col-span-2">
            <InputLabel label="Geographic Location" />
            <ControlledInputField
              name="geographicLocation"
              placeholder="e.g. Bay of Bengal"
              className="bg-light shadow-none"
            />
          </div>
          <div>
            <InputLabel label="Scale" />
            <ControlledInputField
              name="scale"
              placeholder="e.g. 1:12 500"
              className="bg-light shadow-none"
            />
          </div>
          <div>
            <InputLabel label="Projection" />
            <ControlledInputField
              name="projection"
              placeholder="e.g. Mercator"
              className="bg-light shadow-none"
            />
          </div>
          <div>
            <InputLabel label="North Latitude" />
            <ControlledInputField
              name="northLatitude"
              placeholder="e.g. 22°30.64'N"
              className="bg-light shadow-none"
            />
          </div>
          <div>
            <InputLabel label="South Latitude" />
            <ControlledInputField
              name="southLatitude"
              placeholder="e.g. 22°26.59'N"
              className="bg-light shadow-none"
            />
          </div>
          <div>
            <InputLabel label="East Longitude" />
            <ControlledInputField
              name="eastLongitude"
              placeholder="e.g. 092°15.05'E"
              className="bg-light shadow-none"
            />
          </div>
          <div>
            <InputLabel label="West Longitude" />
            <ControlledInputField
              name="westLongitude"
              placeholder="e.g. 092°02.20'E"
              className="bg-light shadow-none"
            />
          </div>
          <div>
            <InputLabel label="Edition" />
            <ControlledInputField
              name="edition"
              placeholder="e.g. 1st Edition"
              className="bg-light shadow-none"
            />
          </div>
          <div>
            <InputLabel label="Publication Date" />
            <ControlledInputField
              name="publicationDate"
              type="date"
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
          label={isEditMode ? "Update Product" : "Create Product"}
        />
      </div>
    </form>
  );
}
