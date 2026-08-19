"use client";

import { cn } from "@/src/lib/utils";
import { NOTICE_FILTER_OPTIONS, NoticeFilterValue } from "./types";

interface NoticeTypeFilterProps {
  value: NoticeFilterValue;
  onChange: (value: NoticeFilterValue) => void;
  /** Per-type totals rendered next to each label; omit to hide the counts. */
  counts?: Record<NoticeFilterValue, number>;
  className?: string;
  size?: "sm" | "md";
}

/**
 * Segmented type filter shared by the public listing and the admin table, so
 * both panels always offer exactly the same set of categories.
 */
const NoticeTypeFilter = ({
  value,
  onChange,
  counts,
  className,
  size = "md",
}: NoticeTypeFilterProps) => {
  return (
    <div
      role="tablist"
      aria-label="Filter notices by type"
      className={cn("flex flex-wrap items-center gap-2", className)}
    >
      {NOTICE_FILTER_OPTIONS.map((option) => {
        const isActive = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(option.value)}
            className={cn(
              "cursor-pointer rounded-full border font-medium transition-colors",
              size === "sm"
                ? "px-3 py-1.5 text-xs"
                : "px-4 py-2 text-xs lg:text-sm",
              isActive
                ? "border-pBlue bg-pBlue text-white shadow-sm"
                : "border-gray-200 bg-white text-gray-600 hover:border-pBlue/40 hover:text-pBlue"
            )}
          >
            {option.label}
            {counts && (
              <span
                className={cn(
                  "ml-1.5 rounded-full px-1.5 py-0.5 text-[10px] font-semibold",
                  isActive ? "bg-white/20" : "bg-gray-100 text-gray-500"
                )}
              >
                {counts[option.value] ?? 0}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default NoticeTypeFilter;
