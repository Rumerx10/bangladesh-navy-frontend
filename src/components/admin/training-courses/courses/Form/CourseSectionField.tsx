"use client";

import { BookOpen, Plus, Trash2 } from "lucide-react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import Paragraph from "@/src/components/shared/Paragraph";
import { CoursesSchemaForm } from "../Schema/coursesSchema";

const EMPTY_SECTION = { title: "", description: "" };

/** Repeatable title + prose block — one per course category on the public page. */
const CourseSectionField = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<CoursesSchemaForm>();

  const { fields, append, remove } = useFieldArray<
    CoursesSchemaForm,
    "sections"
  >({ control, name: "sections" });

  // The array-level message lives on the array itself, separate from the
  // per-row field errors.
  const listError = Array.isArray(errors.sections)
    ? undefined
    : errors.sections?.message;

  return (
    <div className="space-y-4">
      {fields.length > 0 ? (
        <div className="space-y-4">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="rounded-lg border border-light-silver bg-gray-50/60 p-4"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wide text-gray-400 tabular-nums">
                  Course {index + 1}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => remove(index)}
                  aria-label={`Remove course ${index + 1}`}
                  className="h-8 w-8 cursor-pointer bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-3">
                <Controller
                  control={control}
                  name={`sections.${index}.title`}
                  render={({ field: input, fieldState }) => (
                    <Input
                      {...input}
                      value={input.value ?? ""}
                      placeholder="e.g. Long Hydrographic (Cat A) Course"
                      className="bg-white shadow-none"
                      error={fieldState.error?.message}
                      showErrorMessage={!!fieldState.error}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name={`sections.${index}.description`}
                  render={({ field: input, fieldState }) => (
                    <div>
                      <Textarea
                        {...input}
                        value={input.value ?? ""}
                        placeholder="Describe this course..."
                        className="bg-white shadow-none resize-none h-28"
                      />
                      {fieldState.error && (
                        <p className="mt-1 pl-1 text-xs text-rose-500">
                          {fieldState.error.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 py-10 text-center">
          <BookOpen className="mx-auto h-7 w-7 text-gray-400" />
          <Paragraph className="mt-2 text-sm! text-gray-500">
            No course descriptions added yet.
          </Paragraph>
        </div>
      )}

      {listError && (
        <p className="pl-1 text-xs text-rose-500">{String(listError)}</p>
      )}

      <Button
        type="button"
        onClick={() => append(EMPTY_SECTION)}
        className="h-11 w-full cursor-pointer border border-dashed border-primary/40 bg-primary/5 text-primary shadow-none hover:bg-primary/10"
      >
        <Plus className="h-4 w-4" />
        Add Course Description
      </Button>
    </div>
  );
};

export default CourseSectionField;
