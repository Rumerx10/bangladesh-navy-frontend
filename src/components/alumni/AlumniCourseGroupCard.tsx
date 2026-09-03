"use client";

import { cn } from "@/src/lib/utils";
import { ChevronDown, Clock3, Users } from "lucide-react";
import AlumniBatchCard from "./AlumniBatchCard";
import { IAlumniCourseGroup } from "./types";
import { paddedSerial } from "./utils";

interface AlumniCourseGroupCardProps {
  group: IAlumniCourseGroup;
  isOpen: boolean;
  onToggle: () => void;
}

/**
 * One course — a collapsible header (serial, name, duration, headcount) over
 * its batches, each with its own roster. Collapsed by default so a page with
 * twenty courses stays scannable.
 */
const AlumniCourseGroupCard = ({
  group,
  isOpen,
  onToggle,
}: AlumniCourseGroupCardProps) => {
  const panelId = `alumni-course-panel-${group.id}`;
  const count = group.totalMembers;

  return (
    <article
      className={cn(
        "overflow-hidden rounded-xl border bg-white transition-shadow",
        isOpen
          ? "border-pBlue/30 shadow-md"
          : "border-gray-200 hover:border-pBlue/30 hover:shadow-sm"
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="flex w-full cursor-pointer items-center gap-4 p-4 text-left sm:gap-5 sm:p-5"
      >
        {/* Serial badge */}
        <span
          className={cn(
            "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-lg font-bold tabular-nums transition-colors sm:h-14 sm:w-14 sm:text-xl",
            isOpen
              ? "bg-linear-to-br from-pBlue to-blue-600 text-white"
              : "bg-blue-50 text-pBlue"
          )}
        >
          {paddedSerial(group.serial)}
        </span>

        <div className="min-w-0 flex-1">
          <h3 className="text-base font-bold leading-snug text-pBlue sm:text-lg">
            {group.name}
          </h3>

          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
            {group.duration && (
              <span className="inline-flex items-center gap-1.5">
                <Clock3 className="h-3.5 w-3.5 shrink-0" />
                {group.duration}
              </span>
            )}
            <span className="inline-flex items-center gap-1.5 font-semibold text-gray-600">
              <Users className="h-3.5 w-3.5 shrink-0" />
              {count} {count === 1 ? "participant" : "participants"}
            </span>
          </div>
        </div>

        <ChevronDown
          className={cn(
            "h-5 w-5 shrink-0 text-gray-400 transition-transform duration-300",
            isOpen && "rotate-180 text-pBlue"
          )}
        />
      </button>

      {/* Grid-rows transition keeps the open/close animation height-agnostic. */}
      <div
        id={panelId}
        className={cn(
          "grid transition-all duration-300 ease-in-out",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <div className="space-y-4 border-t border-gray-100 p-4 sm:p-5">
            {group.batches.length > 0 ? (
              group.batches.map((batch) => (
                <AlumniBatchCard key={batch.id} batch={batch} />
              ))
            ) : (
              <p className="rounded-lg border border-dashed border-gray-300 bg-gray-50 py-8 text-center text-sm text-gray-500">
                No batches recorded for this course yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default AlumniCourseGroupCard;
