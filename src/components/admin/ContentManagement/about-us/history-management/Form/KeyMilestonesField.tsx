"use client";

import { cn } from "@/src/lib/utils";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { Button } from "@/src/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/src/components/ui/tooltip";
import { Plus, X } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";
import { IKeyMilestone } from "../types";

interface KeyMilestonesFieldProps {
  name: string;
  disabled?: boolean;
}

const getWordCount = (text: string) =>
  text.trim().split(/\s+/).filter(Boolean).length;

const KeyMilestonesField = ({ name, disabled }: KeyMilestonesFieldProps) => {
  const { control, setValue, watch } = useFormContext();
  const milestones: IKeyMilestone[] = watch(name) || [];

  const lastMilestone = milestones[milestones.length - 1];
  const canAdd =
    milestones.length === 0 ||
    (lastMilestone.year.trim() !== "" &&
      lastMilestone.description.trim() !== "");
  const isAddDisabled = !canAdd || !!disabled;

  const handleAdd = () => {
    if (!canAdd) return;
    const newMilestone: IKeyMilestone = { year: "", description: "" };
    setValue(name, [...milestones, newMilestone]);
  };

  const handleRemove = (index: number) => {
    setValue(
      name,
      milestones.filter((_, i) => i !== index)
    );
  };

  const handleUpdate = (
    index: number,
    field: keyof IKeyMilestone,
    value: string
  ) => {
    const updated = [...milestones];
    updated[index] = { ...updated[index], [field]: value };
    setValue(name, updated);
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ fieldState: { error } }) => (
        <div className="space-y-3">
          {milestones.length > 0 && (
            <div className="space-y-3">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row items-start gap-3 p-4 border border-gray-200 rounded-lg bg-gray-50"
                >
                  <div className="w-full sm:w-28 shrink-0">
                    <Input
                      value={milestone.year}
                      onChange={(e) =>
                        handleUpdate(index, "year", e.target.value)
                      }
                      placeholder="e.g. 1971"
                      disabled={disabled}
                      className={cn(
                        "bg-light shadow-none",
                        error && "border-rose-500"
                      )}
                    />
                  </div>

                  <div className="flex-1">
                    <Textarea
                      value={milestone.description}
                      onChange={(e) =>
                        handleUpdate(index, "description", e.target.value)
                      }
                      placeholder="Milestone description (max 100 words)..."
                      disabled={disabled}
                      className={cn(
                        "bg-light shadow-none resize-none h-24",
                        error && "border-rose-500"
                      )}
                    />
                    <p
                      className={cn(
                        "text-xs mt-1 text-right",
                        getWordCount(milestone.description) > 100
                          ? "text-rose-500"
                          : "text-gray-400"
                      )}
                    >
                      {getWordCount(milestone.description)} / 100 words
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemove(index)}
                    className="flex items-center justify-center rounded-md h-10 w-10 shrink-0 text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 duration-300"
                    disabled={disabled}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-end">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="inline-block">
                    <Button
                      type="button"
                      onClick={handleAdd}
                      disabled={isAddDisabled}
                      className="cursor-pointer h-10 px-4 bg-primary hover:bg-primary/90 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Plus size={20} className="w-5 h-5 mr-1" />
                      Add Milestone
                    </Button>
                  </span>
                </TooltipTrigger>
                {isAddDisabled && !disabled && (
                  <TooltipContent side="bottom" className="text-xs mt-1">
                    Please fill the previous milestone first
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

export default KeyMilestonesField;
