import ErrorMessage from "@/src/components/shared/Errors/ErrorMessage";
import ControlledSwitchField from "@/src/components/shared/FromController/ControlledSwitchField";
import SubmitButton from "@/src/components/shared/SubmitButton";
import { Button } from "@/src/components/ui/button";
import { useFormContext } from "react-hook-form";
import { AddressFormValues } from "../Schema/addressSchema";
import { IAddressFormProps } from "../types";
import AddressFields from "./AddressFields";

const AddressForm = ({
  isEditMode = false,
  onSubmit,
  onCancel,
  isPending = false,
  error,
}: IAddressFormProps) => {
  const { handleSubmit } = useFormContext<AddressFormValues>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-2 w-full space-y-4">
      <AddressFields />

      {/* Editing can't change the default — that has its own action on the
          address card (PATCH /address/:id/default). */}
      {!isEditMode && (
        <ControlledSwitchField
          name="isDefault"
          label="Default address"
          description="Pre-select this address at checkout"
        />
      )}

      <ErrorMessage error={error} />

      <div className="flex items-center justify-end gap-4 pt-2">
        <Button
          type="button"
          onClick={onCancel}
          className="cursor-pointer border bg-transparent text-secondary-foreground shadow-none hover:bg-transparent"
        >
          Cancel
        </Button>
        <SubmitButton
          isLoading={isPending}
          label={isEditMode ? "Save changes" : "Save address"}
        />
      </div>
    </form>
  );
};

export default AddressForm;
