"use client";

import { cn } from "@/src/lib/utils";
import { CalendarDays, ChevronDown, Users } from "lucide-react";
import AlumniMemberTable from "./AlumniMemberTable";
import { IAlumniBatch } from "./types";
import { formatPeriod, paddedBatchNo } from "./utils";

interface AlumniBatchCardProps {
  batch: IAlumniBatch;
  isOpen: boolean;
  onToggle: () => void;
}

/**
 * One batch — a collapsible header (badge, title, period, headcount) over the
 * roster. Collapsed by default so a page with twenty batches stays scannable.
 */
const AlumniBatchCard = ({ batch, isOpen, onToggle }: AlumniBatchCardProps) => {
  const panelId = `alumni-batch-panel-${batch.id}`;
  const courseName = batch.alumniCourse?.nameEn;

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
        {/* Batch number badge */}
        <span
          className={cn(
            "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-lg font-bold tabular-nums transition-colors sm:h-14 sm:w-14 sm:text-xl",
            isOpen
              ? "bg-linear-to-br from-pBlue to-blue-600 text-white"
              : "bg-blue-50 text-pBlue"
          )}
        >
          {paddedBatchNo(batch.batchNo)}
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-bold leading-snug text-pBlue sm:text-lg">
              {batch.titleEn}
            </h3>
            {courseName && (
              <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-[11px] font-semibold text-gray-600">
                {courseName}
              </span>
            )}
          </div>

          {batch.titleBn && (
            <p className="mt-0.5 truncate text-sm text-gray-500">
              {batch.titleBn}
            </p>
          )}

          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5 shrink-0" />
              {formatPeriod(batch.startDate, batch.endDate)}
            </span>
            <span className="inline-flex items-center gap-1.5 font-semibold text-gray-600">
              <Users className="h-3.5 w-3.5 shrink-0" />
              {batch.members.length}{" "}
              {batch.members.length === 1 ? "participant" : "participants"}
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
          <div className="border-t border-gray-100 p-4 sm:p-5">
            {batch.descriptionEn && (
              <p className="mb-4 text-sm leading-relaxed text-gray-600">
                {batch.descriptionEn}
              </p>
            )}
            <AlumniMemberTable
              members={batch.members.map((member) => ({
                id: member.id ?? String(member.serial),
                courseId: batch.alumniCourseId ?? batch.id,
                serial: member.serial,
                pNo: member.pNo,
                rankAndName: member.rankName,
                organization: member.organization,
                remarks: member.remarks,
                status: "ACTIVE" as const,
              }))}
            />
          </div>
        </div>
      </div>
    </article>
  );
};

export default AlumniBatchCard;
