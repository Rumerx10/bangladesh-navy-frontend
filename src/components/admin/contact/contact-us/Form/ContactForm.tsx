"use client";
import { useFormContext } from "react-hook-form";
import { Button } from "@/src/components/ui/button";
import { ContactFormValues } from "../schema/ContactSchema";
import InputLabel from "@/src/components/shared/InputLabel";
import SubmitButton from "@/src/components/shared/SubmitButton";
import ControlledSelectField from "@/src/components/shared/FromController/ControlledSelectField";

interface ApiError {
  message?: string;
  response?: {
    data?: {
      message?: string;
    };
  };
}

interface ContactFormProps {
  error: ApiError | null;
  isPending: boolean;
  onCancel: () => void;
  onSubmit: (values: ContactFormValues) => void;
}

const ContactForm = ({
  error,
  isPending,
  onCancel,
  onSubmit,
}: ContactFormProps) => {
  const { handleSubmit } = useFormContext<ContactFormValues>();

  const statusOptions = [
    { label: "Pending", value: "PENDING" },
    { label: "In Progress", value: "IN_PROGRESS" },
    { label: "Resolved", value: "RESOLVED" },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-4">
      <div>
        <InputLabel label="Status" required />
        <ControlledSelectField
          name="status"
          options={statusOptions}
          placeholder="Select status"
        />
      </div>

      {error && (
        <p className="text-red-500 text-sm">
          {error?.response?.data?.message ||
            error?.message ||
            "Something went wrong"}
        </p>
      )}

      <div className="flex items-center justify-end gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isPending}
          className="h-11 px-6"
        >
          Cancel
        </Button>
        <SubmitButton isLoading={isPending} label="Update Status" />
      </div>
    </form>
  );
};

export default ContactForm;
