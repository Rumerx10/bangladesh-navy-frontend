"use client";

import Image from "next/image";
import { useState } from "react";
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
import ProductAttributesField from "./ProductAttributesField";

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
      <Paragraph className="xl:text-lg font-medium text-pBlue">{label}</Paragraph>
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

  const { data: categoryData } = useGet<IProductCategory[]>(
    "/category/list",
    ["category-list"]
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

      {/* Bengali Content */}
      <div className="border border-light-silver rounded-lg p-8 bg-white">
        <SectionHeader label="Bengali Content" />
        <div className="flex flex-col gap-y-6">
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

      {/* Attributes */}
      <div className="border border-light-silver rounded-lg p-8 bg-white">
        <SectionHeader label="Product Attributes" />
        <ProductAttributesField
          existingAttributes={initialValues?.productAttributes}
        />
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
