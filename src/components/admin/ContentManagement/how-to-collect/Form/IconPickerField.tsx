"use client";

import { Controller, useFormContext } from "react-hook-form";
import { cn } from "@/src/lib/utils";
import { STEP_ICON_OPTIONS } from "@/src/data/howToCollectIcons";
import { HowToCollectFormValues } from "../Schema/howToCollectSchema";

/** A grid of the icons the public page knows how to render — picking from a
 * fixed set keeps the stored identifier resolvable, which a free-text input
 * could not guarantee. */
const IconPickerField = () => {
  const { control } = useFormContext<HowToCollectFormValues>();

  return (
    <Controller
      control={control}
      name="icon"
      render={({ field, fieldState }) => (
        <div>
          <div
            role="radiogroup"
            aria-label="Step icon"
            className={cn(
              "grid grid-cols-5 gap-2 rounded-lg border bg-light/60 p-3 sm:grid-cols-7 lg:grid-cols-9",
              fieldState.error ? "border-rose-500" : "border-light-silver"
            )}
          >
            {STEP_ICON_OPTIONS.map(({ value, label, Icon }) => {
              const selected = field.value === value;
              return (
                <button
                  key={value}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  title={label}
                  onClick={() => field.onChange(value)}
                  className={cn(
                    "flex aspect-square cursor-pointer flex-col items-center justify-center gap-1 rounded-md border transition-colors",
                    selected
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-transparent bg-card text-secondary-foreground hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span className="w-full truncate px-1 text-center text-[10px] leading-tight">
                    {label}
                  </span>
                </button>
              );
            })}
          </div>
          {fieldState.error && (
            <p className="mt-1 pl-1 text-xs text-rose-500">
              {fieldState.error.message}
            </p>
          )}
        </div>
      )}
    />
  );
};

export default IconPickerField;
