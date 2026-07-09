"use client";

import Image from "next/image";
import { cn } from "@/src/lib/utils";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/src/components/ui/tooltip";
import { Plus, X, Check, Circle } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";
import { IPartner } from "../types";

interface MultiplePartnerFieldProps {
  name: string;
  disabled?: boolean;
}

const SUPPORTED_FORMATS = [
  "image/jpeg",
  "image/png",
  "image/jpg",
  "image/webp",
];

const getImagePreview = (image: File | string): string | null => {
  if (image instanceof File) return URL.createObjectURL(image);
  if (typeof image === "string" && image.trim()) return image;
  return null;
};

const isImageFilled = (img: File | string): boolean => {
  if (img instanceof File) return true;
  return typeof img === "string" && img.trim() !== "";
};

const MultiplePartnerField = ({
  name,
  disabled,
}: MultiplePartnerFieldProps) => {
  const { control, setValue, watch } = useFormContext();
  const partners: IPartner[] = watch(name) || [];

  const lastPartner = partners[partners.length - 1];
  const canAdd =
    partners.length === 0 ||
    (lastPartner.name.trim() !== "" && isImageFilled(lastPartner.image));
  const isAddDisabled = !canAdd || !!disabled;

  const handleAddPartner = () => {
    if (!canAdd) return;
    const newPartner: IPartner = { image: "", name: "", isActive: true };
    setValue(name, [...partners, newPartner]);
  };

  const handleRemovePartner = (index: number) => {
    setValue(
      name,
      partners.filter((_, i) => i !== index)
    );
  };

  const handleUpdateName = (index: number, value: string) => {
    const updated = [...partners];
    updated[index] = { ...updated[index], name: value };
    setValue(name, updated);
  };

  const handleUpdateImage = (index: number, file: File) => {
    const updated = [...partners];
    updated[index] = { ...updated[index], image: file };
    setValue(name, updated);
  };

  const handleToggleActive = (index: number) => {
    const updated = [...partners];
    updated[index] = { ...updated[index], isActive: !updated[index].isActive };
    setValue(name, updated);
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ fieldState: { error } }) => (
        <div className="space-y-3">
          {partners.length > 0 && (
            <div className="space-y-3">
              {partners.map((partner, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg bg-gray-50"
                >
                  <label
                    htmlFor={`${name}-${index}-image`}
                    className="relative w-12 h-12 rounded-lg overflow-hidden border border-dashed border-gray-300 bg-white flex items-center justify-center cursor-pointer hover:border-primary transition-colors shrink-0"
                  >
                    {getImagePreview(partner.image) ? (
                      <Image
                        src={getImagePreview(partner.image)!}
                        alt={partner.name || `Partner ${index + 1}`}
                        fill
                        className="object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "/placeholder.svg";
                        }}
                      />
                    ) : (
                      <Image
                        src="/icons/plus.svg"
                        alt="upload"
                        width={16}
                        height={16}
                        className="w-4 opacity-40"
                      />
                    )}
                    <input
                      id={`${name}-${index}-image`}
                      type="file"
                      accept={SUPPORTED_FORMATS.join(",")}
                      className="hidden"
                      disabled={disabled}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleUpdateImage(index, file);
                      }}
                    />
                  </label>

                  <div className="relative flex-1">
                    <Input
                      value={partner.name}
                      onChange={(e) => handleUpdateName(index, e.target.value)}
                      placeholder={`Partner ${index + 1} name`}
                      disabled={disabled}
                      className={cn(
                        "bg-light shadow-none pr-10",
                        !partner.isActive && "opacity-60 line-through",
                        error && "border-rose-500"
                      )}
                    />
                    <button
                      type="button"
                      onClick={() => handleToggleActive(index)}
                      className={cn(
                        "absolute right-3 top-1/2 -translate-y-1/2 transition-colors",
                        partner.isActive
                          ? "text-green-500 hover:text-green-700"
                          : "text-gray-400 hover:text-gray-600"
                      )}
                      disabled={disabled}
                    >
                      {partner.isActive ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Circle className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemovePartner(index)}
                    className="flex items-center justify-center rounded-md h-10 w-10 shrink-0 text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 duration-300"
                    disabled={disabled}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-end">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="inline-block">
                    <Button
                      type="button"
                      onClick={handleAddPartner}
                      disabled={isAddDisabled}
                      className="cursor-pointer h-10 px-4 bg-primary hover:bg-primary/90 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Plus size={20} className="w-5 h-5 mr-1" />
                      Add Partner
                    </Button>
                  </span>
                </TooltipTrigger>
                {isAddDisabled && !disabled && (
                  <TooltipContent side="bottom" className="text-xs mt-1">
                    Please fill the current field first
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

export default MultiplePartnerField;
