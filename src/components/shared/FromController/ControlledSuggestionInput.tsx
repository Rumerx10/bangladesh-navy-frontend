"use client";

import { useId, useMemo, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Check, Sparkles } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { Input } from "../../ui/input";
import { Popover, PopoverAnchor, PopoverContent } from "../../ui/popover";

interface ControlledSuggestionInputProps {
  name: string;
  /** Values offered as you type. Free text is still accepted. */
  suggestions: string[];
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  maxLength?: number;
  /** Shown above the list, e.g. "From Course Statistics". */
  heading?: string;
  /** Called after a suggestion is picked (not on free typing). */
  onPick?: (value: string) => void;
}

const MAX_VISIBLE = 8;

/**
 * Text input with a styled suggestion dropdown — the type-ahead counterpart to
 * a native `<datalist>`, which can't be styled. The list portals out (Radix
 * Popover), so it isn't clipped by a scrolling dialog body.
 */
const ControlledSuggestionInput = ({
  name,
  suggestions,
  placeholder,
  className,
  disabled,
  maxLength,
  heading,
  onPick,
}: ControlledSuggestionInputProps) => {
  const { control } = useFormContext();
  const listId = useId();
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  // De-duplicated, in the order given (callers pass a meaningful order).
  const unique = useMemo(
    () => [...new Set(suggestions.map((s) => s.trim()).filter(Boolean))],
    [suggestions]
  );

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const value = String(field.value ?? "");
        const query = value.trim().toLowerCase();
        const matches = (
          query
            ? [
                ...unique.filter((s) => s.toLowerCase().startsWith(query)),
                ...unique.filter(
                  (s) =>
                    !s.toLowerCase().startsWith(query) &&
                    s.toLowerCase().includes(query)
                ),
              ]
            : unique
        ).slice(0, MAX_VISIBLE);
        // Nothing to offer once the field already holds exactly a suggestion.
        const exact =
          matches.length === 1 && matches[0].toLowerCase() === query;
        const showList = open && !disabled && matches.length > 0 && !exact;

        const pick = (suggestion: string) => {
          field.onChange(suggestion);
          setOpen(false);
          setActiveIndex(-1);
          onPick?.(suggestion);
        };

        return (
          <Popover open={showList} onOpenChange={setOpen}>
            <PopoverAnchor asChild>
              <div className="w-full">
                <Input
                  {...field}
                  value={value}
                  placeholder={placeholder}
                  className={className}
                  disabled={disabled}
                  maxLength={maxLength}
                  autoComplete="off"
                  role="combobox"
                  aria-expanded={showList}
                  aria-controls={listId}
                  aria-autocomplete="list"
                  aria-invalid={!!error}
                  error={error?.message}
                  showErrorMessage={!!error}
                  onFocus={() => setOpen(true)}
                  onBlur={() => {
                    field.onBlur();
                    setOpen(false);
                  }}
                  onChange={(event) => {
                    field.onChange(event.target.value);
                    setOpen(true);
                    setActiveIndex(-1);
                  }}
                  onKeyDown={(event) => {
                    if (!showList) {
                      if (event.key === "ArrowDown") setOpen(true);
                      return;
                    }
                    if (event.key === "ArrowDown") {
                      event.preventDefault();
                      setActiveIndex((i) => (i + 1) % matches.length);
                    } else if (event.key === "ArrowUp") {
                      event.preventDefault();
                      setActiveIndex(
                        (i) => (i - 1 + matches.length) % matches.length
                      );
                    } else if (event.key === "Enter" && activeIndex >= 0) {
                      event.preventDefault();
                      pick(matches[activeIndex]);
                    } else if (event.key === "Escape") {
                      event.preventDefault();
                      setOpen(false);
                    }
                  }}
                />
              </div>
            </PopoverAnchor>

            <PopoverContent
              align="start"
              sideOffset={6}
              // Keep focus (and the caret) in the input while the list is open.
              onOpenAutoFocus={(event) => event.preventDefault()}
              onCloseAutoFocus={(event) => event.preventDefault()}
              className="w-(--radix-popover-trigger-width) rounded-xl p-1.5 shadow-lg"
            >
              {heading && (
                <p className="flex items-center gap-1.5 px-2.5 pt-1 pb-1.5 text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
                  <Sparkles className="size-3" />
                  {heading}
                </p>
              )}
              <ul
                id={listId}
                role="listbox"
                className="max-h-64 overflow-y-auto"
              >
                {matches.map((suggestion, index) => {
                  const selected =
                    suggestion.toLowerCase() === value.trim().toLowerCase();
                  return (
                    <li
                      key={suggestion}
                      role="option"
                      aria-selected={index === activeIndex}
                      // mousedown, not click: fires before the input's blur
                      // closes the list.
                      onMouseDown={(event) => {
                        event.preventDefault();
                        pick(suggestion);
                      }}
                      onMouseEnter={() => setActiveIndex(index)}
                      className={cn(
                        "flex cursor-pointer items-center justify-between gap-3 rounded-lg px-2.5 py-2 text-sm text-foreground transition-colors",
                        index === activeIndex && "bg-accent text-pBlue"
                      )}
                    >
                      <span className="truncate">{suggestion}</span>
                      {selected && (
                        <Check className="size-4 shrink-0 text-primary" />
                      )}
                    </li>
                  );
                })}
              </ul>
            </PopoverContent>
          </Popover>
        );
      }}
    />
  );
};

export default ControlledSuggestionInput;
