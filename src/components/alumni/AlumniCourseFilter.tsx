"use client";

import { cn } from "@/src/lib/utils";

interface AlumniCourseFilterProps {
  courses: { id: string; name: string }[];
  value: string;
  onChange: (value: string) => void;
  /** Member count per course id, plus an `ALL` total. */
  counts: Record<string, number>;
  className?: string;
}

/**
 * Pill filter over the courses. "All" is always first and is a UI-only value —
 * it is never stored on a member.
 */
const AlumniCourseFilter = ({
  courses,
  value,
  onChange,
  counts,
  className,
}: AlumniCourseFilterProps) => {
  const options = [
    { id: "ALL", label: "All Courses" },
    ...courses.map((course) => ({ id: course.id, label: course.name })),
  ];

  return (
    <div
      className={cn("flex flex-wrap items-center gap-2", className)}
      role="tablist"
      aria-label="Filter alumni by course"
    >
      {options.map((option) => {
        const isActive = value === option.id;
        const count = counts[option.id] ?? 0;

        return (
          <button
            key={option.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(option.id)}
            className={cn(
              "inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
              isActive
                ? "border-pBlue bg-pBlue text-white"
                : "border-gray-200 bg-white text-gray-600 hover:border-pBlue/40 hover:text-pBlue"
            )}
          >
            {option.label}
            <span
              className={cn(
                "rounded-full px-1.5 py-0.5 text-[11px] font-bold tabular-nums",
                isActive
                  ? "bg-white/20 text-white"
                  : "bg-gray-100 text-gray-500"
              )}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default AlumniCourseFilter;
