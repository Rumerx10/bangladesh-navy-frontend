"use client";

import { useState } from "react";
import { ClipboardPaste, Plus, Trash2, Users, X } from "lucide-react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { cn } from "@/src/lib/utils";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import Paragraph from "@/src/components/shared/Paragraph";
import {
  ORGANIZATION_SUGGESTIONS,
  REMARKS_SUGGESTIONS,
} from "@/src/components/alumni/types";
import { AlumniBatchFormValues } from "../Schema/alumniBatchSchema";

const EMPTY_MEMBER = {
  pNo: "",
  rankName: "",
  organization: "BN",
  remarks: "",
};

/**
 * Splits one pasted line into cells. Rosters are copied out of a Word table, so
 * the separator is a tab, a pipe, or a run of two or more spaces.
 */
const splitRow = (line: string) =>
  line
    .split(/\t|\s*\|\s*|\s{2,}/)
    .map((cell) => cell.trim())
    .filter(Boolean);

/**
 * Maps a pasted row onto the member fields. A leading "1." / "12" serial column
 * is dropped — the serial is derived from row order, not typed.
 */
const parseRow = (line: string) => {
  const cells = splitRow(line);
  if (cells.length === 0) return null;
  if (cells.length > 2 && /^\d+\.?$/.test(cells[0])) cells.shift();

  const [first, second, third, fourth] = cells;
  if (cells.length === 1) return { ...EMPTY_MEMBER, rankName: first };

  return {
    pNo: first ?? "",
    rankName: second ?? "",
    organization: third ?? "",
    remarks: fourth ?? "",
  };
};

const COLUMN_CLASSES =
  "grid grid-cols-1 gap-3 lg:grid-cols-[6rem_minmax(0,1fr)_10rem_10rem_2.5rem] lg:items-start lg:gap-3";

const AlumniMemberField = () => {
  const [showBulk, setShowBulk] = useState(false);
  const [bulkText, setBulkText] = useState("");

  const {
    control,
    formState: { errors },
  } = useFormContext<AlumniBatchFormValues>();

  const { fields, append, remove } = useFieldArray<
    AlumniBatchFormValues,
    "members"
  >({ control, name: "members" });

  // The array-level message ("Add at least one participant") lives on the array
  // itself, separate from the per-row field errors.
  const listError = Array.isArray(errors.members)
    ? undefined
    : errors.members?.message;

  const handleBulkAdd = () => {
    const parsed = bulkText
      .split(/\r?\n/)
      .map(parseRow)
      .filter((row): row is NonNullable<typeof row> => row !== null);

    if (parsed.length === 0) return;
    append(parsed);
    setBulkText("");
    setShowBulk(false);
  };

  return (
    <div className="space-y-4">
      {/* Bulk paste — a roster normally arrives as a pasted Word table. */}
      <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50/60">
        <button
          type="button"
          onClick={() => setShowBulk((prev) => !prev)}
          className="flex w-full cursor-pointer items-center justify-between gap-3 px-4 py-3 text-left"
        >
          <span className="flex items-center gap-2 text-sm font-medium text-secondary-dark">
            <ClipboardPaste className="h-4 w-4 text-primary" />
            Paste a roster from Word or Excel
          </span>
          {showBulk ? (
            <X className="h-4 w-4 text-gray-400" />
          ) : (
            <Plus className="h-4 w-4 text-gray-400" />
          )}
        </button>

        {showBulk && (
          <div className="border-t border-gray-200 p-4">
            <textarea
              value={bulkText}
              onChange={(event) => setBulkText(event.target.value)}
              rows={5}
              placeholder={
                "790\tCdre A K M Mostak Sherafullah, (H1), psc, BN\tBN\tPresent Rank\n817\tLt Cdr K A Rahman, (H2), BN (Rtd)\tBN\tRtd"
              }
              className="w-full rounded-md border border-light-silver bg-white p-3 font-mono text-xs outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10"
            />
            <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
              <Paragraph className="text-xs! text-gray-500">
                One participant per line — P. No, Rank &amp; Name, Organization,
                Remarks. A leading serial column is ignored.
              </Paragraph>
              <Button
                type="button"
                onClick={handleBulkAdd}
                disabled={!bulkText.trim()}
                className="h-10 cursor-pointer bg-primary px-5 text-white hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Add rows
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Column headers (desktop only — the rows are labelled inline on mobile) */}
      {fields.length > 0 && (
        <div
          className={cn(
            COLUMN_CLASSES,
            "hidden px-1 text-[11px] font-bold uppercase tracking-wide text-gray-500 lg:grid"
          )}
        >
          <span>P. No</span>
          <span>Rank &amp; Name</span>
          <span>Organization</span>
          <span>Remarks</span>
          <span className="sr-only">Remove</span>
        </div>
      )}

      {/* Rows */}
      {fields.length > 0 ? (
        <div className="space-y-3">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="rounded-lg border border-light-silver bg-white p-3 lg:border-0 lg:bg-transparent lg:p-0"
            >
              <div className="mb-2 flex items-center justify-between lg:hidden">
                <span className="text-xs font-bold text-gray-400 tabular-nums">
                  Participant {index + 1}
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

              <div className={COLUMN_CLASSES}>
                <Controller
                  control={control}
                  name={`members.${index}.pNo`}
                  render={({ field: input, fieldState }) => (
                    <Input
                      {...input}
                      value={input.value ?? ""}
                      placeholder="790"
                      className="bg-light shadow-none"
                      error={fieldState.error?.message}
                      showErrorMessage={!!fieldState.error}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name={`members.${index}.rankName`}
                  render={({ field: input, fieldState }) => (
                    <Input
                      {...input}
                      value={input.value ?? ""}
                      placeholder="e.g. Cdre A K M Mostak Sherafullah, (H1), psc, BN"
                      className="bg-light shadow-none"
                      error={fieldState.error?.message}
                      showErrorMessage={!!fieldState.error}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name={`members.${index}.organization`}
                  render={({ field: input, fieldState }) => (
                    <Input
                      {...input}
                      value={input.value ?? ""}
                      list="alumni-organization-options"
                      placeholder="BN"
                      className="bg-light shadow-none"
                      error={fieldState.error?.message}
                      showErrorMessage={!!fieldState.error}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name={`members.${index}.remarks`}
                  render={({ field: input, fieldState }) => (
                    <Input
                      {...input}
                      value={input.value ?? ""}
                      list="alumni-remarks-options"
                      placeholder="Present Rank"
                      className="bg-light shadow-none"
                      error={fieldState.error?.message}
                      showErrorMessage={!!fieldState.error}
                    />
                  )}
                />

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => remove(index)}
                  aria-label={`Remove participant ${index + 1}`}
                  className="hidden h-11 w-10 cursor-pointer bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-700 lg:flex"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 py-10 text-center">
          <Users className="mx-auto h-7 w-7 text-gray-400" />
          <Paragraph className="mt-2 text-sm! text-gray-500">
            No participants added yet.
          </Paragraph>
        </div>
      )}

      {listError && (
        <p className="pl-1 text-xs text-rose-500">{String(listError)}</p>
      )}

      <Button
        type="button"
        onClick={() => append(EMPTY_MEMBER)}
        className="h-11 w-full cursor-pointer border border-dashed border-primary/40 bg-primary/5 text-primary shadow-none hover:bg-primary/10"
      >
        <Plus className="h-4 w-4" />
        Add Participant
      </Button>

      {/* Shared suggestion lists for the repetitive columns. */}
      <datalist id="alumni-organization-options">
        {ORGANIZATION_SUGGESTIONS.map((option) => (
          <option key={option} value={option} />
        ))}
      </datalist>
      <datalist id="alumni-remarks-options">
        {REMARKS_SUGGESTIONS.map((option) => (
          <option key={option} value={option} />
        ))}
      </datalist>
    </div>
  );
};

export default AlumniMemberField;
