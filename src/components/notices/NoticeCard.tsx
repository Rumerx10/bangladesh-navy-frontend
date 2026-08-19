"use client";

import { cn } from "@/src/lib/utils";
import { CalendarDays, Download } from "lucide-react";
import { INotice, NOTICE_TYPE_BADGE, NOTICE_TYPE_LABELS } from "./types";

const formatNoticeDate = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

/** Filename the browser saves as, rather than the opaque storage key. */
const downloadName = (notice: INotice) =>
  `${notice.noticeNumber.replace(/[^\w.-]+/g, "-")}.pdf`;

/**
 * Laid out for a grid cell: `h-full` + `mt-auto` on the footer keeps the
 * download buttons on one line across a row regardless of title length.
 */
const NoticeCard = ({ notice }: { notice: INotice }) => {
  return (
    <article className="group flex h-full flex-col rounded-xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-md">
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={cn(
            "rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ring-1 ring-inset",
            NOTICE_TYPE_BADGE[notice.type]
          )}
        >
          {NOTICE_TYPE_LABELS[notice.type]}
        </span>
        <span className="rounded-md bg-gray-100 px-2 py-1 text-[11px] font-semibold text-gray-600">
          {notice.noticeNumber}
        </span>
      </div>

      <span className="mt-3 inline-flex items-center gap-1.5 text-xs text-gray-500">
        <CalendarDays className="h-3.5 w-3.5 shrink-0" />
        {formatNoticeDate(notice.publishedAt)}
      </span>

      <h3 className="mt-2 line-clamp-3 text-base font-bold leading-snug text-pBlue">
        {notice.titleEn}
      </h3>
      {notice.titleBn && (
        <p className="mt-1 line-clamp-2 text-sm text-gray-500">
          {notice.titleBn}
        </p>
      )}

      {notice.descriptionEn && (
        <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-gray-600">
          {notice.descriptionEn}
        </p>
      )}

      {/* Footer — the download button only exists when a PDF is attached. */}
      <div className="mt-auto pt-5">
        {notice.pdfUrl ? (
          <a
            href={notice.pdfUrl}
            download={downloadName(notice)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-green-700"
          >
            <Download className="h-4 w-4" />
            Download PDF
          </a>
        ) : (
          <p className="py-2.5 text-center text-xs text-gray-400">
            No attachment
          </p>
        )}
      </div>
    </article>
  );
};

export default NoticeCard;
