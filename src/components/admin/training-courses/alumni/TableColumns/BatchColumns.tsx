import { GraduationCap, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { ColumnDef } from "@/src/components/ui/data-table";
import { IBatch } from "@/src/components/batches/types";
import { formatShortDate } from "@/src/components/alumni/utils";

export const GetBatchColumns = (
  onEdit?: (item: IBatch) => void,
  onDelete?: (item: IBatch) => void,
  onViewMembers?: (item: IBatch) => void
): ColumnDef<IBatch>[] => [
  {
    header: "Batch",
    accessorKey: "name",
    cell: (_value, row) => (
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary tabular-nums">
          {row.serial ?? "—"}
        </span>
        <p className="truncate text-sm font-medium text-secondary-dark">
          {row.name || "—"}
        </p>
      </div>
    ),
  },
  {
    header: "Course",
    accessorKey: "courseName",
    cell: (value) => (
      <span className="text-sm text-secondary-gary">
        {(value as string) || "—"}
      </span>
    ),
  },
  {
    header: "Period",
    accessorKey: "startDate",
    cell: (_value, row) =>
      row.startDate || row.endDate ? (
        <span className="text-sm whitespace-nowrap text-secondary-gary">
          {formatShortDate(row.startDate)} — {formatShortDate(row.endDate)}
        </span>
      ) : (
        <span className="text-sm text-secondary-gary">—</span>
      ),
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
          onClick={() => onViewMembers?.(row)}
          aria-label={`View members for ${row.name}`}
          title="View members"
        >
          <GraduationCap className="h-4 w-4 text-secondary-foreground" />
        </Button>
        <Button
          className="flex min-h-9 w-9! items-center justify-center rounded-lg border border-[#E6E6E6] bg-light hover:bg-light"
          size="sm"
          onClick={() => onEdit?.(row)}
          aria-label={`Edit ${row.name}`}
        >
          <Pencil className="h-4 w-4 text-secondary-foreground" />
        </Button>
        <Button
          className="flex min-h-9 w-9! items-center justify-center rounded-lg border border-red-100 bg-red-50 hover:bg-red-100"
          size="sm"
          onClick={() => onDelete?.(row)}
          aria-label={`Delete ${row.name}`}
        >
          <Trash2 className="h-4 w-4 text-red-500" />
        </Button>
      </div>
    ),
  },
];
