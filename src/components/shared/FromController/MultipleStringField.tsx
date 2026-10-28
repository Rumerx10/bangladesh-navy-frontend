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
import { Controller, get, useFormContext } from "react-hook-form";

interface MultipleStringFieldProps {
  name: string;
  placeholder?: string;
  itemLabel?: string;
  className?: string;
  disabled?: boolean;
  /** Returns why a value can't be added (e.g. "Enter a valid email"), or
   * `undefined` when it's fine. Checked before a new entry joins the list. */
  validateItem?: (value: string) => string | undefined;
  /** Cleans raw input as it's typed — e.g. strip letters from a phone. */
  sanitize?: (raw: string) => string;
  /** Reject an entry that's already in the list (case-insensitive). */
  unique?: boolean;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
}

const MultipleStringField = ({
  name,
  placeholder = "Add an item...",
  itemLabel = "Item",
  className,
  disabled,
  validateItem,
  sanitize,
  unique = false,
  inputMode,
}: MultipleStringFieldProps) => {
  const {
    control,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();
  const items: string[] = watch(name) || [];
  const [currentInput, setCurrentInput] = useState("");
  const [addError, setAddError] = useState<string>();

  // Array-level errors ("At least one…", "Each … must be different") sit on
  // the list itself; an invalid entry's error sits on its index.
  const fieldErrors = get(errors, name);
  const listError: string | undefined =
    fieldErrors?.message ?? fieldErrors?.root?.message;
  const itemError = (index: number): string | undefined =>
    get(errors, `${name}.${index}`)?.message;

  const updateItems = (next: string[]) =>
    setValue(name, next, { shouldValidate: true, shouldDirty: true });

  const clean = (raw: string) => (sanitize ? sanitize(raw) : raw);

  const handleAdd = () => {
    const trimmed = currentInput.trim();
    if (!trimmed) return;

    const invalid = validateItem?.(trimmed);
    if (invalid) {
      setAddError(invalid);
      return;
    }
    if (
      unique &&
      items.some((item) => item.trim().toLowerCase() === trimmed.toLowerCase())
    ) {
      setAddError(`This ${itemLabel.toLowerCase()} is already added`);
      return;
    }

    updateItems([...items, trimmed]);
    setCurrentInput("");
    setAddError(undefined);
  };

  const handleRemove = (index: number) => {
    updateItems(items.filter((_, i) => i !== index));
  };

  const handleUpdate = (index: number, value: string) => {
    const updated = [...items];
    updated[index] = clean(value);
    updateItems(updated);
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
      render={() => (
        <div className="space-y-3">
          {items.length > 0 && (
            <div className="space-y-2">
              {items.map((item, index) => {
                const error = itemError(index);
                return (
                  <div key={index}>
                    <div className="flex items-center gap-2">
                      <Input
                        value={item}
                        onChange={(e) => handleUpdate(index, e.target.value)}
                        placeholder={`${itemLabel} ${index + 1}`}
                        disabled={disabled}
                        inputMode={inputMode}
                        aria-invalid={!!error}
                        className={cn(
                          "bg-light shadow-none flex-1 min-w-0",
                          className,
                          error && "border-rose-500"
                        )}
                      />
                      <Button
                        type="button"
                        onClick={() => handleRemove(index)}
                        variant="ghost"
                        size="icon"
                        aria-label={`Remove ${itemLabel.toLowerCase()} ${index + 1}`}
                        className="h-10 w-10 shrink-0 text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 duration-300"
                        disabled={disabled}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    {error && (
                      <p className="mt-1 pl-2 text-xs text-rose-500 wrap-break-word">
                        {error}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          <div>
            <div className="flex items-center gap-2">
              <Input
                value={currentInput}
                onChange={(e) => {
                  setCurrentInput(clean(e.target.value));
                  setAddError(undefined);
                }}
                onKeyDown={handleKeyDown}
                placeholder={
                  items.length > 0
                    ? `Add another ${itemLabel.toLowerCase()}...`
                    : placeholder
                }
                disabled={disabled}
                inputMode={inputMode}
                aria-invalid={!!addError}
                className={cn(
                  "bg-light shadow-none flex-1 min-w-0",
                  className,
                  (addError || (listError && items.length === 0)) &&
                    "border-rose-500"
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
                        aria-label={`Add ${itemLabel.toLowerCase()}`}
                        className="cursor-pointer h-10 px-3 sm:px-4 bg-primary hover:bg-primary/90 text-white shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Plus size={20} className="w-5 h-5" />
                        {/* Icon-only on phones so the input keeps its room. */}
                        <span className="hidden sm:inline">Add More</span>
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
            {addError && (
              <p className="mt-1 pl-2 text-xs text-rose-500 wrap-break-word">
                {addError}
              </p>
            )}
          </div>

          {listError && (
            <p className="pl-2 text-xs text-rose-500 wrap-break-word">
              {listError}
            </p>
          )}
        </div>
      )}
    />
  );
};

export default MultipleStringField;
