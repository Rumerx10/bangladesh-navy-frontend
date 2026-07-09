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
import { NoticesSchemaForm } from "../Schema/noticesSchema";
import NewsItemsField from "./NewsItemsField";

interface NoticesFormProps {
  isEditMode?: boolean;
  onSubmit: (data: NoticesSchemaForm) => void;
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

const CategoriesEditor = ({ disabled }: { disabled?: boolean }) => {
  const { setValue, watch } = useFormContext<NoticesSchemaForm>();
  const categories: string[] = watch("categories") || [];
  const [input, setInput] = useState("");

  const isAddDisabled = !input.trim() || !!disabled;

  const handleAdd = () => {
    const trimmed = input.trim();
    if (!trimmed || categories.includes(trimmed)) return;
    setValue("categories", [...categories, trimmed]);
    setInput("");
  };

  const handleRemove = (i: number) => {
    setValue(
      "categories",
      categories.filter((_, idx) => idx !== i)
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
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {categories.map((cat, i) => (
            <span
              key={i}
              className="flex items-center gap-1.5 text-sm bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-full"
            >
              {cat}
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
            categories.length > 0
              ? "Add another category..."
              : "e.g. Hydrographic Notes, Notices to Mariners..."
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

const NoticesForm = ({
  isEditMode = false,
  onSubmit,
  error,
  isPending = false,
  onCancel,
}: NoticesFormProps) => {
  const { handleSubmit } = useFormContext<NoticesSchemaForm>();

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
              placeholder="Important Notices"
              className="bg-light shadow-none"
            />
          </div>
          <div>
            <Paragraph className="font-semibold text-pBlue uppercase mb-2">
              Sub Title
            </Paragraph>
            <ControlledInputField
              name="subTitle"
              placeholder="Stay updated with the latest hydrographic notices and maritime advisories"
              className="bg-light shadow-none"
            />
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="border border-light-silver rounded-lg p-6 sm:p-8 bg-white">
        <SectionHeader label="Categories" />
        <div className="mt-6">
          <CategoriesEditor />
        </div>
      </div>

      {/* News Items */}
      <div className="border border-light-silver rounded-lg p-6 sm:p-8 bg-white">
        <SectionHeader label="Notices" />
        <div className="mt-6">
          <NewsItemsField name="news" />
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

export default NoticesForm;
