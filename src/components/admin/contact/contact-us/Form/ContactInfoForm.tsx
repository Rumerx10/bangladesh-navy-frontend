"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/src/lib/utils";
import { Button } from "@/src/components/ui/button";
import { useFormContext } from "react-hook-form";
import InputLabel from "@/src/components/shared/InputLabel";
import Paragraph from "@/src/components/shared/Paragraph";
import SubmitButton from "@/src/components/shared/SubmitButton";
import { ErrorType } from "@/src/components/shared/types/common";
import ErrorMessage from "@/src/components/shared/Errors/ErrorMessage";
import { ContactInfoFormValues } from "../Schema/contactInfoSchema";
import ControlledInputField from "@/src/components/shared/FromController/ControlledInputField";
import MultipleStringField from "@/src/components/shared/FromController/MultipleStringField";

interface ContactInfoFormProps {
  error?: ErrorType | null;
  isEditMode?: boolean;
  isPending?: boolean;
  onCancel?: () => void;
  onSubmit: (data: ContactInfoFormValues) => void;
}

const ContactInfoForm = ({
  error,
  isEditMode = false,
  isPending = false,
  onCancel,
  onSubmit,
}: ContactInfoFormProps) => {
  const { handleSubmit } = useFormContext<ContactInfoFormValues>();
  const [iconLoaded, setIconLoaded] = useState(false);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
      <div className="border border-light-silver rounded-lg p-8 bg-white">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 w-9 h-9 flex items-center justify-center rounded-md border border-primary/20">
              <Image
                src="/icons/phone.svg"
                alt="contact info"
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
              Contact Information
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

        <div className="flex flex-col gap-y-6">
          <div>
            <InputLabel label="Phone Numbers" required />
            <MultipleStringField
              name="phones"
              itemLabel="Phone"
              placeholder="e.g. +8801711111111"
            />
          </div>

          <div>
            <InputLabel label="Email Addresses" required />
            <MultipleStringField
              name="emails"
              itemLabel="Email"
              placeholder="e.g. info@navy.mil.bd"
            />
          </div>

          <div>
            <InputLabel label="Office Hour" required />
            <ControlledInputField
              name="office_hour"
              placeholder="e.g. Sunday - Thursday, 9:00 AM - 5:00 PM"
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
          label={isEditMode ? "Update Contact Info" : "Create Contact Info"}
        />
      </div>
    </form>
  );
};

export default ContactInfoForm;
