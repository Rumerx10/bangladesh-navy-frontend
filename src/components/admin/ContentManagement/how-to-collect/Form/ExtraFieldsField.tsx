"use client";

import { Plus, Trash2 } from "lucide-react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { HowToCollectFormValues } from "../Schema/howToCollectSchema";

const EMPTY_FIELD = { key: "", value: "" };

/** Repeatable label/value rows — rendered as the detail box inside a step
 * card on the public page (bank account, office hours, contact numbers…). */
const ExtraFieldsField = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<HowToCollectFormValues>();

  const { fields, append, remove } = useFieldArray<
    HowToCollectFormValues,
    "extraFields"
  >({ control, name: "extraFields" });

  // The array-level message lives on the array itself, separate from the
  // per-row field errors.
  const listError = Array.isArray(errors.extraFields)
    ? undefined
    : errors.extraFields?.message;

  return (
    <div className="space-y-4">
      {fields.length > 0 && (
        <div className="space-y-3">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="flex flex-col gap-3 rounded-lg border border-light-silver bg-light/60 p-3 sm:flex-row sm:items-start"
            >
              <div className="flex-1">
                <Controller
                  control={control}
                  name={`extraFields.${index}.key`}
                  render={({ field: input, fieldState }) => (
                    <Input
                      {...input}
                      value={input.value ?? ""}
                      placeholder="Label — e.g. Office Address"
                      className="bg-card shadow-none"
                      error={fieldState.error?.message}
                      showErrorMessage={!!fieldState.error}
                    />
                  )}
                />
              </div>
              <div className="flex-1">
                <Controller
                  control={control}
                  name={`extraFields.${index}.value`}
                  render={({ field: input, fieldState }) => (
                    <Input
                      {...input}
                      value={input.value ?? ""}
                      placeholder="Value — e.g. Sun–Thu, 09:00–17:00"
                      className="bg-card shadow-none"
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
                onClick={() => remove(index)}
                aria-label={`Remove detail row ${index + 1}`}
                className="h-10.5 w-10.5 shrink-0 cursor-pointer bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {listError && (
        <p className="pl-1 text-xs text-rose-500">{String(listError)}</p>
      )}

      <Button
        type="button"
        onClick={() => append(EMPTY_FIELD)}
        className="h-11 w-full cursor-pointer border border-dashed border-primary/40 bg-primary/5 text-primary shadow-none hover:bg-primary/10"
      >
        <Plus className="h-4 w-4" />
        Add Detail Row
      </Button>
    </div>
  );
};

export default ExtraFieldsField;
