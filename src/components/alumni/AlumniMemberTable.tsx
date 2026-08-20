"use client";

import { cn } from "@/src/lib/utils";
import { IAlumniMember } from "./types";

/** Colour the common remarks so a roster scans at a glance. */
const remarkTone = (remarks?: string | null) => {
  const value = remarks?.trim().toLowerCase() ?? "";
  if (!value) return "bg-gray-100 text-gray-500 ring-gray-500/20";
  if (value.includes("rtd") || value.includes("retire"))
    return "bg-amber-50 text-amber-700 ring-amber-600/20";
  if (value.includes("change")) return "bg-sky-50 text-sky-700 ring-sky-600/20";
  return "bg-emerald-50 text-emerald-700 ring-emerald-600/20";
};

const RemarkBadge = ({ remarks }: { remarks?: string | null }) => (
  <span
    className={cn(
      "inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold whitespace-nowrap ring-1 ring-inset",
      remarkTone(remarks)
    )}
  >
    {remarks?.trim() || "—"}
  </span>
);

/**
 * The roster. A real table on `sm` and up (it is tabular data), stacked cards
 * below that — a five-column table never survives a 360px viewport.
 */
const AlumniMemberTable = ({ members }: { members: IAlumniMember[] }) => {
  if (members.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-gray-300 bg-gray-50 py-8 text-center text-sm text-gray-500">
        No participants recorded for this course yet.
      </p>
    );
  }

  return (
    <>
      {/* Desktop / tablet */}
      <div className="hidden overflow-x-auto rounded-lg border border-gray-200 sm:block">
        <table className="min-w-full border-collapse text-left">
          <thead>
            <tr className="bg-gray-50 text-[11px] font-bold uppercase tracking-wide text-gray-500">
              <th scope="col" className="w-14 px-4 py-3">
                Ser
              </th>
              <th scope="col" className="w-24 px-4 py-3">
                P. No
              </th>
              <th scope="col" className="px-4 py-3">
                Rank &amp; Name
              </th>
              <th scope="col" className="w-32 px-4 py-3">
                Organization
              </th>
              <th scope="col" className="w-40 px-4 py-3">
                Remarks
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {members.map((member, index) => (
              <tr
                key={member.id}
                className="bg-white transition-colors hover:bg-blue-50/40"
              >
                <td className="px-4 py-3 text-sm font-semibold text-gray-400 tabular-nums">
                  {member.serial || index + 1}.
                </td>
                <td className="px-4 py-3 text-sm font-semibold text-pBlue tabular-nums">
                  {member.pNo || "—"}
                </td>
                <td className="px-4 py-3 text-sm font-medium text-gray-800">
                  {member.rankAndName}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {member.organization || "—"}
                </td>
                <td className="px-4 py-3">
                  <RemarkBadge remarks={member.remarks} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile */}
      <ul className="space-y-3 sm:hidden">
        {members.map((member, index) => (
          <li
            key={member.id}
            className="rounded-lg border border-gray-200 bg-white p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <span className="text-xs font-bold text-gray-400 tabular-nums">
                {member.serial || index + 1}.
              </span>
              <RemarkBadge remarks={member.remarks} />
            </div>
            <p className="mt-1 text-sm font-medium leading-snug text-gray-800">
              {member.rankAndName}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] font-semibold">
              <span className="rounded-md bg-blue-50 px-2 py-1 text-pBlue">
                P. No {member.pNo || "—"}
              </span>
              <span className="rounded-md bg-gray-100 px-2 py-1 text-gray-600">
                {member.organization || "—"}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default AlumniMemberTable;
