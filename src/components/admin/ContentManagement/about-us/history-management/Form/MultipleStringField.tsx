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
import { Plus, X } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";

interface MultipleStringFieldProps {
  name: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

const MultipleStringField = ({
  name,
  placeholder = "Add an item...",
  className,
  disabled,
}: MultipleStringFieldProps) => {
  const { control, setValue, watch } = useFormContext();
  const items: string[] = watch(name) || [];
  const [currentInput, setCurrentInput] = useState("");

  const handleAdd = () => {
    const trimmed = currentInput.trim();
    if (trimmed) {
      setValue(name, [...items, trimmed]);
      setCurrentInput("");
    }
  };

  const handleRemove = (index: number) => {
    setValue(
      name,
      items.filter((_, i) => i !== index)
    );
  };

  const handleUpdate = (index: number, value: string) => {
    const updated = [...items];
    updated[index] = value;
    setValue(name, updated);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  };

  const isAddDisabled = !currentInput.trim() || disabled;

  return (
    <Controller
      name={name}
      control={control}
      render={({ fieldState: { error } }) => (
        <div className="space-y-3">
          {items.length > 0 && (
            <div className="space-y-2">
              {items.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={item}
                    onChange={(e) => handleUpdate(index, e.target.value)}
                    placeholder={`Highlight ${index + 1}`}
                    disabled={disabled}
                    className={cn(
                      "bg-light shadow-none flex-1",
                      className,
                      error && "border-rose-500"
                    )}
                  />
                  <Button
                    type="button"
                    onClick={() => handleRemove(index)}
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

          <div className="flex items-center gap-2">
            <Input
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                items.length > 0 ? "Add another highlight..." : placeholder
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
                      onClick={handleAdd}
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

          {error && (
            <div className="text-rose-500 text-xs pl-2">{error.message}</div>
          )}
        </div>
      )}
    />
  );
};

export default MultipleStringField;
