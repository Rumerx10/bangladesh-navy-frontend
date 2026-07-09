"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/src/lib/utils";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { Button } from "@/src/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/src/components/ui/tooltip";
import { Plus, X, Check, Circle } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import Paragraph from "@/src/components/shared/Paragraph";
import { IBasicInformation, ISurveyShip } from "../types";

interface SurveyShipFieldProps {
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

const EquipmentListEditor = ({
  name,
  disabled,
}: {
  name: string;
  disabled?: boolean;
}) => {
  const { setValue, watch } = useFormContext();
  const items: string[] = watch(name) || [];
  const [input, setInput] = useState("");

  const isAddDisabled = !input.trim() || !!disabled;

  const handleAdd = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setValue(name, [...items, trimmed]);
    setInput("");
  };

  const handleRemove = (i: number) => {
    setValue(
      name,
      items.filter((_, idx) => idx !== i)
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="flex-1 text-sm bg-gray-50 border border-gray-200 rounded-md px-3 py-2 truncate">
            {item}
          </span>
          <button
            type="button"
            onClick={() => handleRemove(i)}
            className="flex items-center justify-center rounded-md h-8 w-8 shrink-0 text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 duration-300"
            disabled={disabled}
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      ))}
      <div className="flex items-center gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={
            items.length > 0
              ? "Add another equipment..."
              : "e.g. Multibeam Echosounder..."
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
                  className="cursor-pointer h-10 px-3 bg-primary hover:bg-primary/90 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus className="w-4 h-4" />
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

const SurveyShipField = ({ name, disabled }: SurveyShipFieldProps) => {
  const { control, setValue, getValues, watch } = useFormContext();
  const ships: ISurveyShip[] = watch(name) || [];
  const shipTypes: string[] = watch("shipTypes") || [];

  const lastShip = ships[ships.length - 1];
  const canAdd =
    ships.length === 0 ||
    (lastShip.name.trim() !== "" && isImageFilled(lastShip.image));
  const isAddDisabled = !canAdd || !!disabled;

  const handleAddShip = () => {
    if (!canAdd) return;
    const current: ISurveyShip[] = getValues(name) || [];
    const newShip: ISurveyShip = {
      image: "",
      isActive: true,
      name: "",
      type: "",
      description: "",
      basicInformation: { length: "", beam: "", draft: "", crew: "" },
      surveyEquipment: [],
      detailsLink: "",
    };
    setValue(name, [...current, newShip]);
  };

  const handleRemoveShip = (index: number) => {
    const current: ISurveyShip[] = getValues(name) || [];
    setValue(
      name,
      current.filter((_, i) => i !== index)
    );
  };

  const handleUpdateField = (
    index: number,
    field: keyof Omit<ISurveyShip, "basicInformation" | "surveyEquipment">,
    value: string | boolean | File
  ) => {
    setValue(`${name}.${index}.${field}`, value);
  };

  const handleUpdateBasicInfo = (
    index: number,
    field: keyof IBasicInformation,
    value: string
  ) => {
    setValue(`${name}.${index}.basicInformation.${field}`, value);
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ fieldState: { error } }) => (
        <div className="space-y-4">
          {ships.map((ship, index) => {
            const imagePreview = getImagePreview(ship.image);

            return (
              <div
                key={index}
                className="border border-gray-200 rounded-xl overflow-hidden"
              >
                {/* Card header */}
                <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 border-b border-gray-200">
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-medium text-pBlue truncate block">
                      {ship.name || `Ship ${index + 1}`}
                    </span>
                    {ship.type && (
                      <span className="text-xs text-gray-500 truncate block">
                        {ship.type}
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      handleUpdateField(index, "isActive", !ship.isActive)
                    }
                    className={cn(
                      "flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border transition-colors shrink-0",
                      ship.isActive
                        ? "bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
                        : "bg-gray-100 border-gray-200 text-gray-500 hover:bg-gray-200"
                    )}
                    disabled={disabled}
                  >
                    {ship.isActive ? (
                      <>
                        <Check className="w-3 h-3" />
                        Active
                      </>
                    ) : (
                      <>
                        <Circle className="w-3 h-3" />
                        Inactive
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRemoveShip(index)}
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
                      Ship Image
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
                          alt={ship.name || "ship image"}
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
                            Click to upload ship image
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

                  {/* Name + Type */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Paragraph className="font-semibold text-pBlue uppercase mb-2 text-sm!">
                        Name
                      </Paragraph>
                      <Input
                        value={ship.name}
                        onChange={(e) =>
                          handleUpdateField(index, "name", e.target.value)
                        }
                        placeholder="BNS Anusandhani"
                        disabled={disabled}
                        className="bg-light shadow-none"
                      />
                    </div>
                    <div>
                      <Paragraph className="font-semibold text-pBlue uppercase mb-2 text-sm!">
                        Type
                      </Paragraph>
                      <Select
                        value={ship.type}
                        onValueChange={(val) =>
                          handleUpdateField(index, "type", val)
                        }
                        disabled={disabled || shipTypes.length === 0}
                      >
                        <SelectTrigger className="bg-light shadow-none h-10.5">
                          <SelectValue
                            placeholder={
                              shipTypes.length === 0
                                ? "Add ship types first..."
                                : "Select type..."
                            }
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {shipTypes.map((t) => (
                            <SelectItem key={t} value={t}>
                              {t}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <Paragraph className="font-semibold text-pBlue uppercase mb-2 text-sm!">
                      Description
                    </Paragraph>
                    <Textarea
                      value={ship.description}
                      onChange={(e) =>
                        handleUpdateField(index, "description", e.target.value)
                      }
                      placeholder="Brief description of the vessel..."
                      disabled={disabled}
                      className="bg-light shadow-none resize-none h-24"
                    />
                  </div>

                  {/* Basic Information */}
                  <div>
                    <Paragraph className="font-semibold text-pBlue uppercase mb-3 text-sm!">
                      Basic Information
                    </Paragraph>
                    <div className="grid grid-cols-2 gap-3">
                      {(
                        [
                          { field: "length", placeholder: "e.g. 58.5 m" },
                          { field: "beam", placeholder: "e.g. 10.2 m" },
                          { field: "draft", placeholder: "e.g. 3.5 m" },
                          { field: "crew", placeholder: "e.g. 65" },
                        ] as const
                      ).map(({ field, placeholder }) => (
                        <div key={field}>
                          <Paragraph className="font-medium text-gray-600 capitalize mb-1.5 text-xs!">
                            {field}
                          </Paragraph>
                          <Input
                            value={ship.basicInformation[field]}
                            onChange={(e) =>
                              handleUpdateBasicInfo(
                                index,
                                field,
                                e.target.value
                              )
                            }
                            placeholder={placeholder}
                            disabled={disabled}
                            className="bg-light shadow-none"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Survey Equipment */}
                  <div>
                    <Paragraph className="font-semibold text-pBlue uppercase mb-2 text-sm!">
                      Survey Equipment
                    </Paragraph>
                    <EquipmentListEditor
                      name={`${name}.${index}.surveyEquipment`}
                      disabled={disabled}
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
                      onClick={handleAddShip}
                      disabled={isAddDisabled}
                      className="cursor-pointer h-10 px-4 bg-primary hover:bg-primary/90 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Plus size={20} className="w-5 h-5 mr-1" />
                      Add Survey Ship
                    </Button>
                  </span>
                </TooltipTrigger>
                {isAddDisabled && !disabled && (
                  <TooltipContent side="bottom" className="text-xs mt-1">
                    Please fill the Name and Image of the previous ship first
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

export default SurveyShipField;
