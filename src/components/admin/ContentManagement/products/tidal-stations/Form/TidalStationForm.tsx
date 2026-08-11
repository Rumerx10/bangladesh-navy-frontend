"use client";

import { useFormContext } from "react-hook-form";
import { useGet } from "@/src/hooks/useGet";
import { mapToSelectOptions } from "@/src/utils/mapToSelectOptions";
import { Button } from "@/src/components/ui/button";
import InputLabel from "@/src/components/shared/InputLabel";
import SubmitButton from "@/src/components/shared/SubmitButton";
import ErrorMessage from "@/src/components/shared/Errors/ErrorMessage";
import ControlledInputField from "@/src/components/shared/FromController/ControlledInputField";
import ControlledSelectField from "@/src/components/shared/FromController/ControlledSelectField";
import { ErrorType } from "@/src/components/shared/types/common";
import { TidalStationFormValues } from "../Schema/tidalStationSchema";
import { ITidalProductOption } from "../types";

interface TidalStationFormProps {
  isEditMode?: boolean;
  onSubmit: (data: TidalStationFormValues) => void;
  onCancel: () => void;
  isPending?: boolean;
  error?: ErrorType;
}

const STATUS_OPTIONS = [
  { label: "Active", value: "ACTIVE" },
  { label: "Inactive", value: "INACTIVE" },
];

export default function TidalStationForm({
  isEditMode = false,
  onSubmit,
  onCancel,
  isPending = false,
  error,
}: TidalStationFormProps) {
  const { handleSubmit } = useFormContext<TidalStationFormValues>();

  const { data: productData } = useGet<ITidalProductOption[]>(
    "/product/tidal/list",
    ["product-tidal-list"]
  );

  const productOptions = mapToSelectOptions(
    Array.isArray(productData?.data) ? productData.data : [],
    "nameEn",
    "id"
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-5 mt-2">
      <div>
        <InputLabel label="Product" required />
        <ControlledSelectField
          name="productId"
          options={productOptions}
          placeholder="Select a tidal product"
        />
      </div>

      <div>
        <InputLabel label="General Area" required />
        <ControlledInputField
          className="bg-light"
          name="generalArea"
          placeholder="e.g. Bay of Bengal"
        />
      </div>

      <div>
        <InputLabel label="Location" required />
        <ControlledInputField
          className="bg-light"
          name="location"
          placeholder="e.g. Chattogram Port"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <InputLabel label="Latitude" required />
          <ControlledInputField
            className="bg-light"
            name="latitude"
            placeholder="e.g. 22° 14.5' N"
          />
        </div>
        <div>
          <InputLabel label="Longitude" required />
          <ControlledInputField
            className="bg-light"
            name="longitude"
            placeholder="e.g. 91° 48.2' E"
          />
        </div>
      </div>

      <div>
        <InputLabel label="Status" required />
        <ControlledSelectField
          name="status"
          options={STATUS_OPTIONS}
          placeholder="Select status"
        />
      </div>

      <ErrorMessage error={error} />

      <div className="flex items-center justify-end gap-4">
        <Button
          type="button"
          onClick={onCancel}
          className="text-secondary-foreground bg-transparent hover:bg-transparent border shadow-none cursor-pointer"
        >
          Cancel
        </Button>
        <SubmitButton
          isLoading={isPending}
          label={isEditMode ? "Update" : "Create"}
        />
      </div>
    </form>
  );
}
