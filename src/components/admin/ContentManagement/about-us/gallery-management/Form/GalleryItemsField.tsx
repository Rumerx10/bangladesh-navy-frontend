"use client";

import Image from "next/image";
import { cn } from "@/src/lib/utils";
import { Input } from "@/src/components/ui/input";
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
import { IGalleryItem } from "../types";

interface GalleryItemsFieldProps {
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

const GalleryItemsField = ({ name, disabled }: GalleryItemsFieldProps) => {
  const { control, setValue, getValues, watch } = useFormContext();
  const items: IGalleryItem[] = watch(name) || [];
  const categories: string[] = watch("categories") || [];
  const categoryOptions = categories.filter((c) => c !== "All");

  const lastItem = items[items.length - 1];
  const canAdd =
    items.length === 0 ||
    (isImageFilled(lastItem.image) &&
      lastItem.title.trim() !== "" &&
      lastItem.category.trim() !== "");
  const isAddDisabled = !canAdd || !!disabled;

  const handleAddItem = () => {
    if (!canAdd) return;
    const current: IGalleryItem[] = getValues(name) || [];
    setValue(name, [...current, { image: "", title: "", category: "" }]);
  };

  const handleRemoveItem = (index: number) => {
    const current: IGalleryItem[] = getValues(name) || [];
    setValue(
      name,
      current.filter((_, i) => i !== index)
    );
  };

  const handleUpdateField = (
    index: number,
    field: keyof IGalleryItem,
    value: string | File
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
            const imagePreview = getImagePreview(item.image);

            return (
              <div
                key={index}
                className="flex flex-col sm:flex-row items-start gap-4 p-4 border border-gray-200 rounded-lg bg-gray-50"
              >
                {/* Image upload */}
                <label
                  htmlFor={`${name}-${index}-image`}
                  className={cn(
                    "relative w-full sm:w-24 h-24 rounded-lg overflow-hidden border border-dashed border-gray-300 bg-[#F7F7F7] flex items-center justify-center cursor-pointer hover:border-primary transition-colors shrink-0",
                    disabled && "opacity-60 pointer-events-none"
                  )}
                >
                  {imagePreview ? (
                    <Image
                      src={imagePreview}
                      alt={item.title || `Gallery ${index + 1}`}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/placeholder.svg";
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
                      <span className="text-xs text-[#A6A6A6] text-center px-1">
                        Upload
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

                {/* Fields */}
                <div className="flex-1 w-full space-y-3">
                  <div>
                    <Paragraph className="font-semibold text-pBlue uppercase mb-1.5 text-xs!">
                      Title
                    </Paragraph>
                    <Input
                      value={item.title}
                      onChange={(e) =>
                        handleUpdateField(index, "title", e.target.value)
                      }
                      placeholder="Survey Vessel at Sea"
                      disabled={disabled}
                      className="bg-light shadow-none"
                    />
                  </div>
                  <div>
                    <Paragraph className="font-semibold text-pBlue uppercase mb-1.5 text-xs!">
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
                </div>

                {/* Remove */}
                <button
                  type="button"
                  onClick={() => handleRemoveItem(index)}
                  className="flex items-center justify-center rounded-md h-10 w-10 shrink-0 text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 duration-300 self-start"
                  disabled={disabled}
                >
                  <X className="w-4 h-4" />
                </button>
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
                      Add Gallery Item
                    </Button>
                  </span>
                </TooltipTrigger>
                {isAddDisabled && !disabled && (
                  <TooltipContent side="bottom" className="text-xs mt-1">
                    Please fill the Image, Title and Category of the previous
                    item first
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

export default GalleryItemsField;
