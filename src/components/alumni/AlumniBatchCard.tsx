"use client";

import { CalendarDays, Users } from "lucide-react";
import AlumniMemberTable from "./AlumniMemberTable";
import { IAlumniBatchGroup } from "./types";
import { formatPeriod, paddedSerial } from "./utils";

interface AlumniBatchCardProps {
  batch: IAlumniBatchGroup;
}

/**
 * One batch within an open course — a header (badge, name, period, headcount)
 * over its roster. Batches within a course are few, so this stays always
 * expanded rather than adding a second collapse level on top of the course.
 */
const AlumniBatchCard = ({ batch }: AlumniBatchCardProps) => {
  const period = formatPeriod(batch.startDate, batch.endDate);

  return (
    <div className="rounded-lg border border-gray-100 bg-gray-50/60 p-4 sm:p-5">
      <div className="flex flex-wrap items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-sm font-bold text-pBlue tabular-nums shadow-sm">
          {paddedSerial(batch.serial)}
        </span>

        <div className="min-w-0 flex-1">
          <h4 className="text-sm font-bold leading-snug text-pBlue sm:text-base">
            {batch.name}
          </h4>
          <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
            {period && (
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-3.5 w-3.5 shrink-0" />
                {period}
              </span>
            )}
            <span className="inline-flex items-center gap-1.5 font-semibold text-gray-600">
              <Users className="h-3.5 w-3.5 shrink-0" />
              {batch.members.length}{" "}
              {batch.members.length === 1 ? "participant" : "participants"}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <AlumniMemberTable members={batch.members} />
      </div>
    </div>
  );
};

export default AlumniBatchCard;
