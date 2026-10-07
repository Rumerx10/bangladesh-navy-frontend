"use client";

import { ListOrdered, Plus, Trash2 } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";
import { cn } from "@/src/lib/utils";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import Paragraph from "@/src/components/shared/Paragraph";

interface CourseSequenceFieldProps {
  name: string;
  placeholder?: string;
  emptyMessage?: string;
  disabled?: boolean;
}

/**
 * Ordered short-text list — the numbered "Course Sequence" card on the public
 * page. Row order is display order.
 *
 * Every row writes straight into the array through its own `Controller`, and
 * "Add Course" appends an empty row that is typed into in place. This is the
 * one thing it does differently from `MultipleStringField`, which buffers the
 * text being typed in local state until "Add More" is pressed: typing an entry
 * there and going straight to Save submits the untouched array, so the save
 * succeeds while the new entry is silently dropped.
 */
const CourseSequenceField = ({
  name,
  placeholder = "e.g. Long Hydrographic Cat-A Course",
  emptyMessage = "No courses added yet.",
  disabled,
}: CourseSequenceFieldProps) => {
  const {
    control,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const items: string[] = watch(name) || [];

  // `setValue` replaces the whole array at the path, so a removal cannot leave
  // a stale trailing index behind in the submitted values.
  const commit = (next: string[]) =>
    setValue(name, next, { shouldDirty: true });

  const handleAdd = () => commit([...items, ""]);

  const handleRemove = (index: number) =>
    commit(items.filter((_, i) => i !== index));

  // The `min(1)` message sits on the array itself, apart from the row errors.
  const fieldError = errors[name];
  const listError =
    fieldError && !Array.isArray(fieldError) ? fieldError.message : undefined;

  return (
    <div className="space-y-3">
      {items.length > 0 ? (
        <div className="space-y-2">
          {items.map((_, index) => (
            <div key={index} className="flex items-start gap-2">
              <span className="mt-2.5 w-5 shrink-0 text-right text-xs font-bold text-muted-foreground tabular-nums">
                {index + 1}.
              </span>
              <div className="flex-1">
                <Controller
                  control={control}
                  name={`${name}.${index}`}
                  render={({ field, fieldState }) => (
                    <Input
                      {...field}
                      value={field.value ?? ""}
                      placeholder={placeholder}
                      disabled={disabled}
                      className="bg-light shadow-none"
                      error={fieldState.error?.message}
                      showErrorMessage={!!fieldState.error}
                    />
                  )}
                />
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => handleRemove(index)}
                aria-label={`Remove course ${index + 1}`}
                disabled={disabled}
                className="h-10 w-10 shrink-0 cursor-pointer bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-700 duration-300"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-input bg-light py-8 text-center">
          <ListOrdered className="mx-auto h-6 w-6 text-muted-foreground" />
          <Paragraph className="mt-2 text-sm! text-secondary-foreground">
            {emptyMessage}
          </Paragraph>
        </div>
      )}

      {listError && (
        <p className="pl-1 text-xs text-rose-500">{String(listError)}</p>
      )}

      <Button
        type="button"
        onClick={handleAdd}
        disabled={disabled}
        className={cn(
          "h-11 w-full cursor-pointer border border-dashed border-primary/40",
          "bg-primary/5 text-primary shadow-none hover:bg-primary/10"
        )}
      >
        <Plus className="h-4 w-4" />
        Add Course
      </Button>
    </div>
  );
};

export default CourseSequenceField;
