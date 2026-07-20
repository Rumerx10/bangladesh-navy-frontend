"use client";
import { useState } from "react";
import { cn } from "@/src/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/src/components/ui/tooltip";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { Plus, X, Check, Circle } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";
import { INotice } from "./admin/ContentManagement/home/notices/types";

interface MultipleInputFieldProps {
  name: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

const MultipleInputField = ({
  name,
  placeholder = "Add a notice...",
  className,
  disabled,
}: MultipleInputFieldProps) => {
  const { control, setValue, watch } = useFormContext();
  const notices: INotice[] = watch(name) || [];
  const [currentInput, setCurrentInput] = useState("");

  const handleAddNotice = () => {
    const trimmed = currentInput.trim();
    if (trimmed) {
      const newNotice: INotice = {
        message: trimmed,
        isActive: true,
      };
      const updatedNotices = [...notices, newNotice];
      setValue(name, updatedNotices);
      setCurrentInput("");
    }
  };

  const handleRemoveNotice = (index: number) => {
    const updatedNotices = notices.filter((_, i) => i !== index);
    setValue(name, updatedNotices);
  };

  const handleUpdateNotice = (index: number, value: string) => {
    const updatedNotices = [...notices];
    updatedNotices[index] = {
      ...updatedNotices[index],
      message: value,
    };
    setValue(name, updatedNotices);
  };

  const handleToggleActive = (index: number) => {
    const updatedNotices = [...notices];
    updatedNotices[index] = {
      ...updatedNotices[index],
      isActive: !updatedNotices[index].isActive,
    };
    setValue(name, updatedNotices);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddNotice();
    }
  };

  const isAddDisabled = !currentInput.trim() || disabled;

  return (
    <Controller
      name={name}
      control={control}
      render={({ fieldState: { error } }) => (
        <div className="space-y-3">
          {/* Existing Notices - Each as an input field */}
          {notices.length > 0 && (
            <div className="space-y-2">
              {notices.map((notice, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Input
                      value={notice.message}
                      onChange={(e) =>
                        handleUpdateNotice(index, e.target.value)
                      }
                      placeholder={`Notice ${index + 1}`}
                      disabled={disabled}
                      className={cn(
                        "bg-light shadow-none pr-10",
                        className,
                        !notice.isActive && "opacity-60 line-through",
                        error && "border-rose-500"
                      )}
                    />
                    <button
                      type="button"
                      onClick={() => handleToggleActive(index)}
                      className={cn(
                        "absolute right-3 top-1/2 -translate-y-1/2 transition-colors",
                        notice.isActive
                          ? "text-green-500 hover:text-green-700"
                          : "text-gray-400 hover:text-gray-600"
                      )}
                      disabled={disabled}
                    >
                      {notice.isActive ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Circle className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  <Button
                    type="button"
                    onClick={() => handleRemoveNotice(index)}
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 shrink-0 text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 duration-300"
                    disabled={disabled}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          {/* Add New Notice Input */}
          <div className="flex items-center gap-2">
            <Input
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                notices.length > 0 ? "Add another notice..." : placeholder
              }
              disabled={disabled}
              className={cn(
                "bg-light shadow-none flex-1",
                className,
                error && "border-rose-500"
              )}
            />

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="shrink-0">
                    <Button
                      type="button"
                      onClick={handleAddNotice}
                      disabled={isAddDisabled}
                      className="cursor-pointer h-10 px-4 bg-primary hover:bg-primary/90 text-white shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Plus size={20} className="w-5 h-5" />
                      Add More
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

          {/* Error Message */}
          {error && (
            <div className="text-rose-500 text-xs pl-2">{error.message}</div>
          )}
        </div>
      )}
    />
  );
};

export default MultipleInputField;
