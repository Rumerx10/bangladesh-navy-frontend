"use client";

import { cn } from "@/src/lib/utils";
import { Plus, Trash2 } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";
import { Button } from "@/src/components/ui/button";
import { Textarea } from "@/src/components/ui/textarea";
import Paragraph from "@/src/components/shared/Paragraph";

interface ParagraphListFieldProps {
  name: string;
  placeholder?: string;
  itemLabel?: string;
  emptyMessage?: string;
  disabled?: boolean;
}

/**
 * Repeatable long-text field. `MultipleStringField` is the equivalent for short
 * values — this one uses a textarea per row because each entry is a full
 * paragraph rendered on the public page.
 */
const ParagraphListField = ({
  name,
  placeholder = "Write a paragraph...",
  itemLabel = "Paragraph",
  emptyMessage = "No paragraphs added yet.",
  disabled,
}: ParagraphListFieldProps) => {
  const { control, setValue, watch } = useFormContext();
  const items: string[] = watch(name) || [];

  const handleAdd = () => setValue(name, [...items, ""]);

  const handleRemove = (index: number) =>
    setValue(
      name,
      items.filter((_, i) => i !== index)
    );

  const handleUpdate = (index: number, value: string) => {
    const updated = [...items];
    updated[index] = value;
    setValue(name, updated);
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ fieldState: { error } }) => (
        <div className="space-y-3">
          {items.length > 0 ? (
            items.map((item, index) => (
              <div key={index} className="flex items-start gap-2">
                <div className="flex-1">
                  <Paragraph className="text-xs! text-gray-400 mb-1">
                    {itemLabel} {index + 1}
                  </Paragraph>
                  <Textarea
                    value={item}
                    onChange={(e) => handleUpdate(index, e.target.value)}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={cn(
                      "bg-light shadow-none resize-none h-28",
                      error && "border-rose-500"
                    )}
                  />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemove(index)}
                  aria-label={`Remove ${itemLabel.toLowerCase()} ${index + 1}`}
                  className="mt-6 h-10 w-10 shrink-0 cursor-pointer bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-700 duration-300"
                  disabled={disabled}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))
          ) : (
            <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 py-8 text-center">
              <Paragraph className="text-sm! text-gray-500">
                {emptyMessage}
              </Paragraph>
            </div>
          )}

          <Button
            type="button"
            onClick={handleAdd}
            disabled={disabled}
            className="h-11 w-full cursor-pointer border border-dashed border-primary/40 bg-primary/5 text-primary shadow-none hover:bg-primary/10"
          >
            <Plus className="h-4 w-4" />
            Add {itemLabel}
          </Button>

          {error && (
            <div className="text-rose-500 text-xs pl-2">{error.message}</div>
          )}
        </div>
      )}
    />
  );
};

export default ParagraphListField;
