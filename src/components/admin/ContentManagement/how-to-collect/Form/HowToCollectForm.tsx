"use client";

import { useFormContext } from "react-hook-form";
import { ListTree, Workflow } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import InputLabel from "@/src/components/shared/InputLabel";
import SubmitButton from "@/src/components/shared/SubmitButton";
import ErrorMessage from "@/src/components/shared/Errors/ErrorMessage";
import ControlledInputField from "@/src/components/shared/FromController/ControlledInputField";
import ControlledSelectField from "@/src/components/shared/FromController/ControlledSelectField";
import ControlledTextareaField from "@/src/components/shared/FromController/ControlledTextareaField";
import { ErrorType } from "@/src/components/shared/types/common";
import { HowToCollectFormValues } from "../Schema/howToCollectSchema";
import ExtraFieldsField from "./ExtraFieldsField";
import IconPickerField from "./IconPickerField";

const STATUS_OPTIONS = [
  { label: "Active", value: "ACTIVE" },
  { label: "Inactive", value: "INACTIVE" },
];

interface HowToCollectFormProps {
  isEditMode?: boolean;
  onSubmit: (data: HowToCollectFormValues) => void;
  onCancel: () => void;
  isPending?: boolean;
  error?: ErrorType;
}

const HowToCollectForm = ({
  isEditMode = false,
  onSubmit,
  onCancel,
  isPending = false,
  error,
}: HowToCollectFormProps) => {
  const { handleSubmit } = useFormContext<HowToCollectFormValues>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
      <div className="rounded-lg border border-light-silver bg-card p-6 lg:p-8">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-md border border-primary/20 bg-primary/10">
            <Workflow className="h-4 w-4 text-primary" />
          </div>
          <span className="font-medium text-pBlue xl:text-lg">
            Step Details
          </span>
        </div>

        <div className="flex flex-col gap-y-6">
          <div>
            <InputLabel label="Icon" required />
            <IconPickerField />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <InputLabel label="Step Name" required />
              <ControlledInputField
                name="stepName"
                placeholder="e.g. Step 01"
                className="bg-light shadow-none"
              />
            </div>
            <div>
              <InputLabel label="Title" required />
              <ControlledInputField
                name="title"
                placeholder="e.g. Visit the Hydrographic Office"
                className="bg-light shadow-none"
              />
            </div>
          </div>

          <div>
            <InputLabel label="Description" required />
            <ControlledTextareaField
              name="description"
              placeholder="Explain what the visitor has to do at this step..."
              className="h-28 resize-none shadow-none"
            />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <InputLabel label="Serial" required />
              <ControlledInputField
                name="serial"
                type="number"
                placeholder="e.g. 1"
                className="bg-light shadow-none"
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
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-light-silver bg-card p-6 lg:p-8">
        <div className="mb-2 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-md border border-primary/20 bg-primary/10">
            <ListTree className="h-4 w-4 text-primary" />
          </div>
          <span className="font-medium text-pBlue xl:text-lg">
            Extra Details
          </span>
        </div>
        <p className="mb-6 text-sm text-secondary-gary">
          Optional label/value rows shown inside this step — bank account
          details, office hours, contact numbers and the like.
        </p>

        <ExtraFieldsField />
      </div>

      <ErrorMessage error={error} />

      <div className="flex items-center justify-end gap-4">
        <Button
          type="button"
          onClick={onCancel}
          className="cursor-pointer border bg-transparent text-secondary-foreground duration-300 hover:bg-light-dark hover:shadow"
        >
          Cancel
        </Button>
        <SubmitButton
          isLoading={isPending}
          label={isEditMode ? "Update Step" : "Create Step"}
        />
      </div>
    </form>
  );
};

export default HowToCollectForm;
