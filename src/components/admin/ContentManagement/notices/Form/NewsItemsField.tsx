"use client";

import Image from "next/image";
import { cn } from "@/src/lib/utils";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { Button } from "@/src/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/src/components/ui/tooltip";
import { Plus, X } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";
import Paragraph from "@/src/components/shared/Paragraph";
import { INewsItem } from "../types";

interface NewsItemsFieldProps {
  name: string;
  disabled?: boolean;
}

const SUPPORTED_FORMATS = [
  "image/jpeg",
  "image/png",
  "image/jpg",
  "image/webp",
];

const getImagePreview = (img: File | string): string | null => {
  if (img instanceof File) return URL.createObjectURL(img);
  if (typeof img === "string" && img.trim()) return img;
  return null;
};

const isImageFilled = (img: File | string): boolean => {
  if (img instanceof File) return true;
  return typeof img === "string" && img.trim() !== "";
};

const NewsItemsField = ({ name, disabled }: NewsItemsFieldProps) => {
  const { control, setValue, getValues, watch } = useFormContext();
  const items: INewsItem[] = watch(name) || [];
  const categories: string[] = watch("categories") || [];
  const categoryOptions = categories.filter((c) => c !== "All");

  const lastItem = items[items.length - 1];
  const canAdd =
    items.length === 0 ||
    (lastItem.title.trim() !== "" &&
      lastItem.category.trim() !== "" &&
      isImageFilled(lastItem.image));
  const isAddDisabled = !canAdd || !!disabled;

  const handleAddItem = () => {
    if (!canAdd) return;
    const current: INewsItem[] = getValues(name) || [];
    setValue(name, [
      ...current,
      {
        category: "",
        title: "",
        date: "",
        shortDescription: "",
        description: "",
        image: "",
      },
    ]);
  };

  const handleRemoveItem = (index: number) => {
    const current: INewsItem[] = getValues(name) || [];
    setValue(
      name,
      current.filter((_, i) => i !== index)
    );
  };

  const handleUpdateField = (
    index: number,
    field: keyof INewsItem,
    value: string | File
  ) => {
    setValue(`${name}.${index}.${field}`, value);
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ fieldState: { error } }) => (
        <div className="space-y-4">
          {items.map((item, index) => {
            const imagePreview = getImagePreview(item.image);

            return (
              <div
                key={index}
                className="border border-gray-200 rounded-xl overflow-hidden"
              >
                {/* Card header */}
                <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 border-b border-gray-200">
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-medium text-pBlue truncate block">
                      {item.title || `Notice ${index + 1}`}
                    </span>
                    {item.category && (
                      <span className="text-xs text-gray-500 truncate block">
                        {item.category}
                        {item.date && ` · ${item.date}`}
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

                {/* Card body */}
                <div className="p-4 sm:p-5 space-y-5 bg-white">
                  {/* Image upload */}
                  <div>
                    <Paragraph className="font-semibold text-pBlue uppercase mb-2 text-sm!">
                      Notice Image
                    </Paragraph>
                    <label
                      htmlFor={`${name}-${index}-image`}
                      className={cn(
                        "relative w-full h-40 rounded-lg overflow-hidden border border-dashed border-gray-300 bg-[#F7F7F7] flex items-center justify-center cursor-pointer hover:border-primary transition-colors",
                        disabled && "opacity-60 pointer-events-none"
                      )}
                    >
                      {imagePreview ? (
                        <Image
                          src={imagePreview}
                          alt={item.title || "notice image"}
                          fill
                          className="object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "/placeholder.svg";
                          }}
                        />
                      ) : (
                        <div className="flex flex-col items-center gap-2">
                          <Image
                            src="/icons/plus.svg"
                            alt="upload"
                            width={24}
                            height={24}
                            className="w-6 opacity-40"
                          />
                          <span className="text-sm text-[#A6A6A6]">
                            Click to upload notice image
                          </span>
                          <span className="text-xs text-gray-400">
                            JPEG, PNG, WebP · max 5MB
                          </span>
                        </div>
                      )}
                      <input
                        id={`${name}-${index}-image`}
                        type="file"
                        accept={SUPPORTED_FORMATS.join(",")}
                        className="hidden"
                        disabled={disabled}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleUpdateField(index, "image", file);
                        }}
                      />
                    </label>
                  </div>

                  {/* Category + Date */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Paragraph className="font-semibold text-pBlue uppercase mb-2 text-sm!">
                        Category
                      </Paragraph>
                      <Select
                        value={item.category}
                        onValueChange={(val) =>
                          handleUpdateField(index, "category", val)
                        }
                        disabled={disabled || categoryOptions.length === 0}
                      >
                        <SelectTrigger className="bg-light shadow-none h-10.5">
                          <SelectValue
                            placeholder={
                              categoryOptions.length === 0
                                ? "Add categories first..."
                                : "Select category..."
                            }
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {categoryOptions.map((cat) => (
                            <SelectItem key={cat} value={cat}>
                              {cat}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Paragraph className="font-semibold text-pBlue uppercase mb-2 text-sm!">
                        Date
                      </Paragraph>
                      <Input
                        type="date"
                        value={item.date}
                        onChange={(e) =>
                          handleUpdateField(index, "date", e.target.value)
                        }
                        disabled={disabled}
                        className="bg-light shadow-none"
                      />
                    </div>
                  </div>

                  {/* Title */}
                  <div>
                    <Paragraph className="font-semibold text-pBlue uppercase mb-2 text-sm!">
                      Title
                    </Paragraph>
                    <Input
                      value={item.title}
                      onChange={(e) =>
                        handleUpdateField(index, "title", e.target.value)
                      }
                      placeholder="Notice to Mariners – Bay of Bengal Update"
                      disabled={disabled}
                      className="bg-light shadow-none"
                    />
                  </div>

                  {/* Short Description */}
                  <div>
                    <Paragraph className="font-semibold text-pBlue uppercase mb-2 text-sm!">
                      Short Description
                    </Paragraph>
                    <Textarea
                      value={item.shortDescription}
                      onChange={(e) =>
                        handleUpdateField(
                          index,
                          "shortDescription",
                          e.target.value
                        )
                      }
                      placeholder="Brief summary of the notice..."
                      disabled={disabled}
                      className="bg-light shadow-none resize-none h-20"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <Paragraph className="font-semibold text-pBlue uppercase mb-2 text-sm!">
                      Description
                    </Paragraph>
                    <Textarea
                      value={item.description}
                      onChange={(e) =>
                        handleUpdateField(index, "description", e.target.value)
                      }
                      placeholder="Full details of the notice..."
                      disabled={disabled}
                      className="bg-light shadow-none resize-none h-28"
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
                      Add Notice
                    </Button>
                  </span>
                </TooltipTrigger>
                {isAddDisabled && !disabled && (
                  <TooltipContent side="bottom" className="text-xs mt-1">
                    Please fill the Image, Title and Category of the previous
                    notice first
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

export default NewsItemsField;
