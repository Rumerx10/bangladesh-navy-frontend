"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/src/lib/utils";
import { useFormContext } from "react-hook-form";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/src/components/ui/tooltip";
import { Plus, X } from "lucide-react";
import ErrorMessage from "@/src/components/shared/Errors/ErrorMessage";
import ControlledInputField from "@/src/components/shared/FromController/ControlledInputField";
import Paragraph from "@/src/components/shared/Paragraph";
import SubmitButton from "@/src/components/shared/SubmitButton";
import { ErrorType } from "@/src/components/shared/types/common";
import { SurveyShipsSchemaForm } from "../Schema/surveyShipsSchema";
import SurveyShipField from "./SurveyShipField";

interface SurveyShipsFormProps {
  isEditMode?: boolean;
  onSubmit: (data: SurveyShipsSchemaForm) => void;
  error?: ErrorType | null;
  isPending?: boolean;
  onCancel?: () => void;
}

const SectionHeader = ({
  label,
  onCancel,
  showCancel = false,
}: {
  label: string;
  onCancel?: () => void;
  showCancel?: boolean;
}) => {
  const [iconLoaded, setIconLoaded] = useState(false);
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="bg-primary/10 w-9 h-9 flex items-center justify-center rounded-md border border-primary/20">
          <Image
            src="/icons/media.svg"
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
      {showCancel && (
        <Button
          type="button"
          onClick={onCancel}
          className="text-secondary-foreground bg-transparent hover:bg-gray-100 duration-300 border hover:shadow cursor-pointer"
        >
          Cancel
        </Button>
      )}
    </div>
  );
};

const ShipTypesEditor = ({ disabled }: { disabled?: boolean }) => {
  const { setValue, watch } = useFormContext<SurveyShipsSchemaForm>();
  const shipTypes: string[] = watch("shipTypes") || [];
  const [input, setInput] = useState("");

  const isAddDisabled = !input.trim() || !!disabled;

  const handleAdd = () => {
    const trimmed = input.trim();
    if (!trimmed || shipTypes.includes(trimmed)) return;
    setValue("shipTypes", [...shipTypes, trimmed]);
    setInput("");
  };

  const handleRemove = (i: number) => {
    setValue(
      "shipTypes",
      shipTypes.filter((_, idx) => idx !== i)
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className="space-y-3">
      {shipTypes.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {shipTypes.map((type, i) => (
            <span
              key={i}
              className="flex items-center gap-1.5 text-sm bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-full"
            >
              {type}
              <button
                type="button"
                onClick={() => handleRemove(i)}
                className="text-primary hover:text-red-500 transition-colors"
                disabled={disabled}
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}
      <div className="flex items-center gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={
            shipTypes.length > 0
              ? "Add another type..."
              : "e.g. Hydrographic Survey Vessel..."
          }
          disabled={disabled}
          className="bg-light shadow-none flex-1"
        />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="inline-block">
                <Button
                  type="button"
                  onClick={handleAdd}
                  disabled={isAddDisabled}
                  className="cursor-pointer h-10 px-4 bg-primary hover:bg-primary/90 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus size={20} className="w-5 h-5 mr-1" />
                  Add
                </Button>
              </span>
            </TooltipTrigger>
            {isAddDisabled && !disabled && (
              <TooltipContent side="bottom" className="text-xs mt-1">
                Please fill the field first
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

const SurveyShipsForm = ({
  isEditMode = false,
  onSubmit,
  error,
  isPending = false,
  onCancel,
}: SurveyShipsFormProps) => {
  const { handleSubmit } = useFormContext<SurveyShipsSchemaForm>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
      {/* Basic Information */}
      <div className="border border-light-silver rounded-lg p-6 sm:p-8 bg-white">
        <SectionHeader
          label="Basic Information"
          onCancel={onCancel}
          showCancel
        />
        <div className="flex flex-col gap-y-6 mt-6">
          <div>
            <Paragraph className="font-semibold text-pBlue uppercase mb-2">
              Title
            </Paragraph>
            <ControlledInputField
              name="title"
              placeholder="Our Survey Ships"
              className="bg-light shadow-none"
            />
          </div>
          <div>
            <Paragraph className="font-semibold text-pBlue uppercase mb-2">
              Sub Title
            </Paragraph>
            <ControlledInputField
              name="subTitle"
              placeholder="State-of-the-art hydrographic survey vessels"
              className="bg-light shadow-none"
            />
          </div>
        </div>
      </div>

      {/* Ship Types */}
      <div className="border border-light-silver rounded-lg p-6 sm:p-8 bg-white">
        <SectionHeader label="Ship Types" />
        <div className="mt-6">
          <ShipTypesEditor />
        </div>
      </div>

      {/* Survey Ships */}
      <div className="border border-light-silver rounded-lg p-6 sm:p-8 bg-white">
        <SectionHeader label="Survey Ships" />
        <div className="mt-6">
          <SurveyShipField name="surveyShips" />
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
          label={isEditMode ? "Updating Changes" : "Update Changes"}
        />
      </div>
    </form>
  );
};

export default SurveyShipsForm;
