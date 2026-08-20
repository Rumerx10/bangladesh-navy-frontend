"use client";

import { BarChart3, Plus, Trash2 } from "lucide-react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { cn } from "@/src/lib/utils";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import Paragraph from "@/src/components/shared/Paragraph";
import { CoursesSchemaForm } from "../Schema/coursesSchema";

const EMPTY_ROW = {
  course: "",
  conducted: "",
  duration: "",
  bn: "",
  otherMaritimeOrg: "",
  overseas: "",
  totalTrainees: "",
  remarks: "",
};

/** Column order matches the public statistics table left to right. */
const COLUMNS: {
  name: keyof typeof EMPTY_ROW;
  label: string;
  placeholder: string;
}[] = [
  {
    name: "course",
    label: "Course",
    placeholder: "Basic Hydrographic (Cat B)",
  },
  { name: "conducted", label: "Conducted", placeholder: "19" },
  { name: "duration", label: "Duration", placeholder: "24 weeks" },
  { name: "bn", label: "BN", placeholder: "86" },
  { name: "otherMaritimeOrg", label: "Other Org", placeholder: "20" },
  { name: "overseas", label: "Overseas", placeholder: "27" },
  { name: "totalTrainees", label: "Total", placeholder: "133" },
  { name: "remarks", label: "Remarks", placeholder: "Officers" },
];

const GRID_CLASSES =
  "grid grid-cols-1 gap-3 xl:grid-cols-[minmax(0,2fr)_5rem_6rem_5rem_6rem_6rem_5rem_minmax(0,1.2fr)_2.5rem] xl:items-start";

const CourseStatisticsField = () => {
  const { control } = useFormContext<CoursesSchemaForm>();

  const { fields, append, remove } = useFieldArray<
    CoursesSchemaForm,
    "statistics"
  >({ control, name: "statistics" });

  return (
    <div className="space-y-4">
      {/* Column headers (desktop only — rows are labelled inline on mobile) */}
      {fields.length > 0 && (
        <div
          className={cn(
            GRID_CLASSES,
            "hidden px-1 text-[11px] font-bold uppercase tracking-wide text-gray-500 xl:grid"
          )}
        >
          {COLUMNS.map((column) => (
            <span key={column.name}>{column.label}</span>
          ))}
          <span className="sr-only">Remove</span>
        </div>
      )}

      {fields.length > 0 ? (
        <div className="space-y-3">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="rounded-lg border border-light-silver bg-white p-3 xl:border-0 xl:bg-transparent xl:p-0"
            >
              <div className="mb-2 flex items-center justify-between xl:hidden">
                <span className="text-xs font-bold text-gray-400 tabular-nums">
                  Row {index + 1}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => remove(index)}
                  className="h-8 w-8 cursor-pointer bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className={GRID_CLASSES}>
                {COLUMNS.map((column) => (
                  <Controller
                    key={column.name}
                    control={control}
                    name={`statistics.${index}.${column.name}`}
                    render={({ field: input, fieldState }) => (
                      <div className="xl:contents">
                        <span className="mb-1 block text-[11px] font-bold uppercase tracking-wide text-gray-500 xl:hidden">
                          {column.label}
                        </span>
                        <Input
                          {...input}
                          value={input.value ?? ""}
                          placeholder={column.placeholder}
                          className="bg-light shadow-none"
                          error={fieldState.error?.message}
                          showErrorMessage={!!fieldState.error}
                        />
                      </div>
                    )}
                  />
                ))}

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => remove(index)}
                  aria-label={`Remove row ${index + 1}`}
                  className="hidden h-11 w-10 cursor-pointer bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-700 xl:flex"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 py-10 text-center">
          <BarChart3 className="mx-auto h-7 w-7 text-gray-400" />
          <Paragraph className="mt-2 text-sm! text-gray-500">
            No statistics rows added yet.
          </Paragraph>
        </div>
      )}

      <Paragraph className="text-xs! text-gray-500">
        Cells accept any text — use an em dash (—) where a figure is not
        available. The totals row on the public page is calculated, so it does
        not need its own row here.
      </Paragraph>

      <Button
        type="button"
        onClick={() => append(EMPTY_ROW)}
        className="h-11 w-full cursor-pointer border border-dashed border-primary/40 bg-primary/5 text-primary shadow-none hover:bg-primary/10"
      >
        <Plus className="h-4 w-4" />
        Add Row
      </Button>
    </div>
  );
};

export default CourseStatisticsField;
