import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { ColumnDef } from "@/src/components/ui/data-table";
import { IAlumniBatch } from "@/src/components/alumni/types";
import { formatShortDate, paddedBatchNo } from "@/src/components/alumni/utils";

export const GetAlumniBatchColumns = (
  onEdit?: (item: IAlumniBatch) => void,
  onDelete?: (item: IAlumniBatch) => void
): ColumnDef<IAlumniBatch>[] => [
  {
    header: "Batch",
    accessorKey: "titleEn",
    cell: (_value, row) => (
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary tabular-nums">
          {paddedBatchNo(row.batchNo)}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-secondary-dark">
            {row.titleEn || "—"}
          </p>
          {row.titleBn && (
            <p className="truncate text-xs text-secondary-gary">
              {row.titleBn}
            </p>
          )}
        </div>
      </div>
    ),
  },
  {
    header: "Course",
    accessorKey: "alumniCourse",
    cell: (value) => {
      const course = value as IAlumniBatch["alumniCourse"];
      return (
        <span className="text-sm text-secondary-gary">
          {course?.nameEn || "—"}
        </span>
      );
    },
  },
  {
    header: "Duration",
    accessorKey: "startDate",
    cell: (_value, row) => (
      <span className="text-sm whitespace-nowrap text-secondary-gary">
        {formatShortDate(row.startDate)} — {formatShortDate(row.endDate)}
      </span>
    ),
  },
  {
    header: "Participants",
    accessorKey: "members",
    cell: (value) => {
      const members = (value as IAlumniBatch["members"]) || [];
      return (
        <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-pBlue tabular-nums">
          {members.length}
        </span>
      );
    },
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: (value) => {
      const status = value as string;
      return (
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
            status === "ACTIVE"
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {status || "—"}
        </span>
      );
    },
  },
  {
    header: "Action",
    accessorKey: "id",
    cell: (_value, row) => (
      <div className="flex items-center gap-2">
        <Button
          className="flex min-h-9 w-9! items-center justify-center rounded-lg border border-[#E6E6E6] bg-light hover:bg-light"
          size="sm"
          onClick={() => onEdit?.(row)}
          aria-label={`Edit ${row.titleEn}`}
        >
          <Pencil className="h-4 w-4 text-secondary-foreground" />
        </Button>
        <Button
          className="flex min-h-9 w-9! items-center justify-center rounded-lg border border-red-100 bg-red-50 hover:bg-red-100"
          size="sm"
          onClick={() => onDelete?.(row)}
          aria-label={`Delete ${row.titleEn}`}
        >
          <Trash2 className="h-4 w-4 text-red-500" />
        </Button>
      </div>
    ),
  },
];
