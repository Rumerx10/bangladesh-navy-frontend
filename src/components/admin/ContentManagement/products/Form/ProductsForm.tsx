"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronDown, FileText } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { useFormContext } from "react-hook-form";
import { useGet } from "@/src/hooks/useGet";
import { Button } from "@/src/components/ui/button";
import InputLabel from "@/src/components/shared/InputLabel";
import Paragraph from "@/src/components/shared/Paragraph";
import SubmitButton from "@/src/components/shared/SubmitButton";
import ErrorMessage from "@/src/components/shared/Errors/ErrorMessage";
import ControlledInputField from "@/src/components/shared/FromController/ControlledInputField";
import ControlledSelectField from "@/src/components/shared/FromController/ControlledSelectField";
import ControlledTextareaField from "@/src/components/shared/FromController/ControlledTextareaField";
import ControlledComboboxSelect from "@/src/components/shared/FromController/ControlledComboboxSelect";
import { MultipleImageUploadController } from "@/src/components/shared/FromController/MultipleImageFileInput";
import { ErrorType } from "@/src/components/shared/types/common";
import { chartIndexAreas } from "@/src/data/chartIndexAreas";
import { encIndexAreas } from "@/src/data/encIndexAreas";
import { IProduct, PRODUCT_CATEGORY_OPTIONS } from "../types";
import { ProductFormValues } from "../Schema/productsSchema";

const STATUS_OPTIONS = [
  { label: "Active", value: "ACTIVE" },
  { label: "Inactive", value: "INACTIVE" },
];

// Codes are compared case-insensitively because ENC cell numbers are
// alphanumeric ("BD307425") and can come back from the API in any casing.
const normaliseCode = (code: string | number) =>
  String(code).trim().toUpperCase();

interface ProductFormProps {
  isEditMode?: boolean;
  onSubmit: (data: ProductFormValues) => void;
  onCancel: () => void;
  isPending?: boolean;
  error?: ErrorType;
  initialValues?: IProduct;
}

const SectionHeader = ({ label }: { label: string }) => {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="bg-primary/10 w-9 h-9 flex items-center justify-center rounded-md border border-primary/20">
        <FileText className="w-4 h-4 text-primary" />
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
  const {
    handleSubmit,
    watch,
    setValue,
    formState: { dirtyFields },
  } = useFormContext<ProductFormValues>();
  const [showBnFields, setShowBnFields] = useState(false);

  const category = watch("category");

  // Chart Code suggestions are category-specific (paper serial numbers vs ENC
  // cell numbers, none at all for Tidal), so any category change invalidates
  // whatever code is currently selected — clear it so a code from the previous
  // category's list can't be submitted.
  // Gated on dirtyFields.category so this only reacts to the user actually
  // picking a category from the dropdown, not to the initial `reset()` that
  // populates an existing product on the edit page (reset() doesn't mark
  // fields dirty).
  useEffect(() => {
    if (dirtyFields.category) {
      setValue("chartCode", "", { shouldValidate: category === "TIDAL" });
    }
  }, [category, dirtyFields.category, setValue]);

  // Every existing product's chart code, so already-assigned codes drop out
  // of the suggestion lists. The product being edited is excluded from this
  // set so its own current code stays selectable.
  const { data: allProductsData } = useGet<IProduct[]>("/product", [
    "product-chart-codes",
  ]);

  const usedChartCodes = useMemo(() => {
    const products = Array.isArray(allProductsData?.data)
      ? allProductsData.data
      : [];
    const used = new Set<string>();
    for (const product of products) {
      if (product.chartCode === undefined || product.chartCode === null)
        continue;
      if (initialValues && product.id === initialValues.id) continue;
      used.add(normaliseCode(product.chartCode));
    }
    return used;
  }, [allProductsData, initialValues]);

  const paperChartOptions = useMemo(() => {
    const byNumber = new Map<string, (typeof chartIndexAreas)[number]>();
    for (const area of chartIndexAreas) {
      if (!byNumber.has(area.number)) byNumber.set(area.number, area);
    }
    return [...byNumber.values()]
      .filter((area) => !usedChartCodes.has(normaliseCode(area.number)))
      .sort((a, b) => Number(a.number) - Number(b.number))
      .map((area) => ({
        value: area.number,
        label: area.int ? `${area.number} (${area.int})` : area.number,
      }));
  }, [usedChartCodes]);

  // ENC products are identified by their cell number (cellNo, e.g.
  // "BD307425"), so that's what gets stored in chartCode. The national chart
  // number is kept in the label for context only.
  const encChartOptions = useMemo(() => {
    const byCellNo = new Map<string, (typeof encIndexAreas)[number]>();
    for (const cell of encIndexAreas) {
      if (!byCellNo.has(cell.cellNo)) byCellNo.set(cell.cellNo, cell);
    }
    return [...byCellNo.values()]
      .filter((cell) => !usedChartCodes.has(normaliseCode(cell.cellNo)))
      .sort((a, b) => Number(a.nationalNo) - Number(b.nationalNo))
      .map((cell) => ({
        value: cell.cellNo,
        label: cell.intNo
          ? `${cell.cellNo} (${cell.intNo}) — #${cell.nationalNo}`
          : `${cell.cellNo} — #${cell.nationalNo}`,
      }));
  }, [usedChartCodes]);

  // Chart Code suggestions follow the selected category: paper chart serial
  // numbers for PAPPER_CHART, ENC cell numbers for ELECTRONIC_NAVIGATIONAL_CHART.
  // Tidal has no chart code, and with nothing selected there's no list to
  // draw from — both leave the field disabled below.
  const chartCodeOptions =
    category === "ELECTRONIC_NAVIGATIONAL_CHART"
      ? encChartOptions
      : category === "PAPPER_CHART"
        ? paperChartOptions
        : [];

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
            <InputLabel label="Description (English)" />
            <ControlledTextareaField
              name="descriptionEn"
              placeholder="Enter product description in English"
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
              name="category"
              options={PRODUCT_CATEGORY_OPTIONS}
              placeholder="Select a category"
            />
          </div>
          <div>
            <InputLabel label="Price" />
            <ControlledInputField
              name="price"
              type="number"
              placeholder="e.g. 3500"
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
          <div>
            <InputLabel
              label="Chart Code"
              required={!!category && category !== "TIDAL"}
            />
            <ControlledComboboxSelect
              name="chartCode"
              options={chartCodeOptions}
              placeholder={
                !category
                  ? "Select a category first"
                  : category === "TIDAL"
                    ? "Not applicable for Tidal"
                    : "Select a chart code"
              }
              searchPlaceholder="Search chart code..."
              emptyMessage="Already used"
              listClassName="scrollbar-modern"
              disabled={!category || category === "TIDAL"}
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
            <InputLabel label="Edition Date" />
            <ControlledInputField
              name="editionDate"
              type="date"
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

      {/* Bengali Fields Section (optional, collapsed by default) */}
      <div className="border border-light-silver rounded-lg bg-white">
        <button
          type="button"
          onClick={() => setShowBnFields((prev) => !prev)}
          className="w-full flex items-center justify-between gap-3 p-8 cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 w-9 h-9 flex items-center justify-center rounded-md border border-primary/20">
              <FileText className="w-4 h-4 text-primary" />
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
