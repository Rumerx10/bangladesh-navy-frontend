"use client";

import Image from "next/image";
import { cn } from "@/src/lib/utils";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { Button } from "@/src/components/ui/button";
import { Plus, X } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/src/components/ui/tooltip";
import { Controller, useFormContext } from "react-hook-form";
import Paragraph from "@/src/components/shared/Paragraph";
import { ITimelineItem } from "../types";
import MultipleStringField from "./MultipleStringField";

interface TimelineItemsFieldProps {
  name: string;
  disabled?: boolean;
}

const SUPPORTED_FORMATS = [
  "image/jpeg",
  "image/png",
  "image/jpg",
  "image/webp",
];

const getIconPreview = (icon: File | string): string | null => {
  if (icon instanceof File) return URL.createObjectURL(icon);
  if (typeof icon === "string" && icon.trim()) return icon;
  return null;
};

const TimelineItemsField = ({ name, disabled }: TimelineItemsFieldProps) => {
  const { control, setValue, getValues, watch } = useFormContext();
  const items: ITimelineItem[] = watch(name) || [];

  const lastItem = items[items.length - 1];
  const canAdd =
    items.length === 0 ||
    (lastItem.period.trim() !== "" && lastItem.title.trim() !== "");
  const isAddDisabled = !canAdd || !!disabled;

  const handleAddItem = () => {
    if (!canAdd) return;
    const current: ITimelineItem[] = getValues(name) || [];
    const newItem: ITimelineItem = {
      id: Date.now(),
      period: "",
      title: "",
      icon: "",
      summary: "",
      highlights: [],
      note: "",
    };
    setValue(name, [...current, newItem]);
  };

  const handleRemoveItem = (index: number) => {
    const current: ITimelineItem[] = getValues(name) || [];
    setValue(
      name,
      current.filter((_, i) => i !== index)
    );
  };

  const handleUpdateField = (
    index: number,
    field: keyof Omit<ITimelineItem, "highlights">,
    value: string | number | File
  ) => {
    setValue(`${name}.${index}.${field}`, value);
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ fieldState: { error } }) => (
        <div className="space-y-3">
          {items.map((item, index) => {
            const iconPreview = getIconPreview(item.icon);

            return (
              <div
                key={item.id || index}
                className="border border-gray-200 rounded-xl overflow-hidden"
              >
                {/* Card header */}
                <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 border-b border-gray-200">
                  {iconPreview && (
                    <div className="relative w-7 h-7 rounded overflow-hidden border border-gray-200 shrink-0">
                      <Image
                        src={iconPreview}
                        alt={item.title || `Timeline ${index + 1}`}
                        fill
                        className="object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "/placeholder.svg";
                        }}
                      />
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-medium text-pBlue">
                      {item.period || `Timeline Item ${index + 1}`}
                    </span>
                    {item.title && (
                      <span className="text-xs text-gray-500 ml-2 truncate">
                        — {item.title}
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemoveItem(index)}
                    className="flex items-center justify-center rounded-md h-10 w-10 shrink-0 text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 duration-300"
                    disabled={disabled}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Card body — always visible */}
                <div className="p-4 sm:p-5 space-y-5 bg-white">
                  {/* Period + Title */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Paragraph className="font-semibold text-pBlue uppercase mb-2 text-sm!">
                        Period
                      </Paragraph>
                      <Input
                        value={item.period}
                        onChange={(e) =>
                          handleUpdateField(index, "period", e.target.value)
                        }
                        placeholder="e.g. 1996–2000"
                        disabled={disabled}
                        className="bg-light shadow-none"
                      />
                    </div>
                    <div>
                      <Paragraph className="font-semibold text-pBlue uppercase mb-2 text-sm!">
                        Title
                      </Paragraph>
                      <Input
                        value={item.title}
                        onChange={(e) =>
                          handleUpdateField(index, "title", e.target.value)
                        }
                        placeholder="Digital Transformation..."
                        disabled={disabled}
                        className="bg-light shadow-none"
                      />
                    </div>
                  </div>

                  {/* Icon upload */}
                  <div>
                    <Paragraph className="font-semibold text-pBlue uppercase mb-2 text-sm!">
                      Icon
                    </Paragraph>
                    <label
                      htmlFor={`${name}-${index}-icon`}
                      className={cn(
                        "relative w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden border border-dashed border-gray-300 bg-[#F7F7F7] flex items-center justify-center cursor-pointer hover:border-primary transition-colors",
                        disabled && "opacity-60 pointer-events-none"
                      )}
                    >
                      {iconPreview ? (
                        <Image
                          src={iconPreview}
                          alt="icon preview"
                          fill
                          className="object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "/placeholder.svg";
                          }}
                        />
                      ) : (
                        <div className="flex flex-col items-center">
                          <Image
                            src="/icons/plus.svg"
                            alt="upload"
                            width={18}
                            height={18}
                            className="w-4.5 mb-1 opacity-40"
                          />
                          <span className="text-xs text-[#A6A6A6] text-center px-2">
                            Upload icon
                          </span>
                        </div>
                      )}
                      <input
                        id={`${name}-${index}-icon`}
                        type="file"
                        accept={SUPPORTED_FORMATS.join(",")}
                        className="hidden"
                        disabled={disabled}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleUpdateField(index, "icon", file);
                        }}
                      />
                    </label>
                  </div>

                  {/* Summary */}
                  <div>
                    <Paragraph className="font-semibold text-pBlue uppercase mb-2 text-sm!">
                      Summary
                    </Paragraph>
                    <Textarea
                      value={item.summary}
                      onChange={(e) =>
                        handleUpdateField(index, "summary", e.target.value)
                      }
                      placeholder="A landmark collaboration..."
                      disabled={disabled}
                      className="bg-light shadow-none resize-none h-28"
                    />
                  </div>

                  {/* Highlights */}
                  <div>
                    <Paragraph className="font-semibold text-pBlue uppercase mb-2 text-sm!">
                      Highlights
                    </Paragraph>
                    <MultipleStringField
                      name={`${name}.${index}.highlights`}
                      placeholder="Add a highlight and press Add..."
                      disabled={disabled}
                    />
                  </div>

                  {/* Note */}
                  <div>
                    <Paragraph className="font-semibold text-pBlue uppercase mb-2 text-sm!">
                      Note
                    </Paragraph>
                    <Textarea
                      value={item.note}
                      onChange={(e) =>
                        handleUpdateField(index, "note", e.target.value)
                      }
                      placeholder="This project marked a paradigm shift..."
                      disabled={disabled}
                      className="bg-light shadow-none resize-none h-24"
                    />
                  </div>
                </div>
              </div>
            );
          })}

          <div className="flex justify-end">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="inline-block">
                    <Button
                      type="button"
                      onClick={handleAddItem}
                      disabled={isAddDisabled}
                      className="cursor-pointer h-10 px-4 bg-primary hover:bg-primary/90 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Plus size={20} className="w-5 h-5 mr-1" />
                      Add Timeline Item
                    </Button>
                  </span>
                </TooltipTrigger>
                {isAddDisabled && !disabled && (
                  <TooltipContent side="bottom" className="text-xs mt-1">
                    Please fill Period and Title of the previous item first
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          </div>

          {error && (
            <div className="text-rose-500 text-xs pl-2">{error.message}</div>
          )}
        </div>
      )}
    />
  );
};

export default TimelineItemsField;
