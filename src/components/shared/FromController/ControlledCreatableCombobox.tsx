"use client";

import { useMemo, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Check, ChevronsUpDown, Plus, X } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { Button } from "../../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../ui/command";

interface ControlledCreatableComboboxProps {
  name: string;
  /** Values listed in the dropdown, in the order given. */
  options: string[];
  placeholder?: string;
  searchPlaceholder?: string;
  /** Heading over the option list, e.g. "Course Statistics". */
  groupLabel?: string;
  /** Longest custom value accepted. */
  maxLength?: number;
  isLoading?: boolean;
  className?: string;
  disabled?: boolean;
  /** Called after a value is chosen from the list or entered as custom. */
  onPick?: (value: string) => void;
  /**
   * Tidies a typed value before it is offered and saved, e.g. "3" →
   * "3rd Edition". Return the input unchanged when it can't be read.
   */
  normalize?: (value: string) => string;
}

/**
 * Dropdown that lists known values but also accepts one that isn't listed —
 * type it in the search box and pick "Use …". Same Popover + Command build as
 * ControlledComboboxSelect, so it behaves inside dialogs: the Popover is
 * `modal`, which keeps the list scrollable and clickable over a Dialog.
 */
const ControlledCreatableCombobox = ({
  name,
  options,
  placeholder = "Select or type…",
  searchPlaceholder = "Search or type a new value…",
  groupLabel,
  maxLength,
  isLoading = false,
  className,
  disabled,
  onPick,
  normalize,
}: ControlledCreatableComboboxProps) => {
  const { control } = useFormContext();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const unique = useMemo(
    () => [...new Set(options.map((o) => o.trim()).filter(Boolean))],
    [options]
  );

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const value = String(field.value ?? "").trim();
        const query = search.trim();
        const q = query.toLowerCase();

        // What "Use …" would save — tidied, so typing "3" offers "3rd Edition".
        const createValue = query && normalize ? normalize(query) : query;
        const listed = unique.find(
          (o) => o.toLowerCase() === createValue.toLowerCase()
        );

        // Our own filtering (cmdk's is off) so the "Use …" row can't be
        // filtered away: the option the typed text tidies into first
        // ("third" → "3rd Edition"), then starts-with, then contains.
        const matches = q
          ? [
              ...new Set([
                ...(listed ? [listed] : []),
                ...unique.filter((o) => o.toLowerCase().startsWith(q)),
                ...unique.filter((o) => o.toLowerCase().includes(q)),
              ]),
            ]
          : unique;
        const canCreate = !!createValue && !listed;

        const choose = (next: string) => {
          field.onChange(next);
          field.onBlur();
          setOpen(false);
          setSearch("");
          onPick?.(next);
        };

        return (
          <div className="w-full">
            <Popover
              modal
              open={open && !disabled}
              onOpenChange={(next) => {
                setOpen(next);
                if (!next) setSearch("");
              }}
            >
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  aria-invalid={!!error}
                  disabled={disabled}
                  className={cn(
                    "h-11 w-full cursor-pointer justify-between gap-2 px-3 text-sm font-normal hover:bg-light",
                    !value && "text-muted-foreground",
                    error && "border-rose-500",
                    className
                  )}
                >
                  <span className="truncate">{value || placeholder}</span>
                  <span className="flex shrink-0 items-center gap-1">
                    {value && !disabled && (
                      // Clear without opening the list.
                      <span
                        role="button"
                        tabIndex={-1}
                        aria-label="Clear"
                        // The trigger toggles on click, so the click itself
                        // is what has to stop here.
                        onClick={(event) => {
                          event.preventDefault();
                          event.stopPropagation();
                          field.onChange("");
                        }}
                        className="grid size-5 place-items-center rounded text-muted-foreground hover:bg-light-dark hover:text-foreground"
                      >
                        <X className="size-3.5" />
                      </span>
                    )}
                    <ChevronsUpDown className="size-4 opacity-50" />
                  </span>
                </Button>
              </PopoverTrigger>

              <PopoverContent
                align="start"
                className="w-(--radix-popover-trigger-width) min-w-64 p-0"
              >
                <Command shouldFilter={false}>
                  <CommandInput
                    value={search}
                    onValueChange={(next) =>
                      setSearch(maxLength ? next.slice(0, maxLength) : next)
                    }
                    placeholder={searchPlaceholder}
                    className="h-10"
                  />
                  <CommandList className="max-h-64">
                    <CommandEmpty>
                      {isLoading
                        ? "Loading…"
                        : "Nothing listed yet — type a value."}
                    </CommandEmpty>

                    {matches.length > 0 && (
                      <CommandGroup heading={groupLabel}>
                        {matches.map((option) => (
                          <CommandItem
                            key={option}
                            value={option}
                            onSelect={() => choose(option)}
                            className="cursor-pointer"
                          >
                            <span className="truncate">{option}</span>
                            <Check
                              className={cn(
                                "ml-auto size-4",
                                value.toLowerCase() === option.toLowerCase()
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    )}

                    {canCreate && (
                      <CommandGroup
                        heading={matches.length > 0 ? "Not listed" : undefined}
                      >
                        <CommandItem
                          value={`__create__${createValue}`}
                          onSelect={() => choose(createValue)}
                          className="cursor-pointer"
                        >
                          <Plus className="size-4" />
                          <span className="truncate">
                            Use &ldquo;{createValue}&rdquo;
                          </span>
                        </CommandItem>
                      </CommandGroup>
                    )}
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            {error && (
              <p className="mt-1 pl-2 text-xs text-rose-500">{error.message}</p>
            )}
          </div>
        );
      }}
    />
  );
};

export default ControlledCreatableCombobox;
