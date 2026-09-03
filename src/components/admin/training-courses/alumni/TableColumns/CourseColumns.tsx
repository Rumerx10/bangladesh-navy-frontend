import { Layers, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { ColumnDef } from "@/src/components/ui/data-table";
import { ICourse } from "@/src/components/courses/types";
import { formatFigure } from "@/src/components/courses/useCourses";

export const GetCourseColumns = (
  onEdit?: (item: ICourse) => void,
  onDelete?: (item: ICourse) => void,
  onViewBatches?: (item: ICourse) => void
): ColumnDef<ICourse>[] => [
  {
    header: "Course",
    accessorKey: "name",
    cell: (_value, row) => (
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary tabular-nums">
          {row.serial ?? "—"}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-secondary-dark">
            {row.name || "—"}
          </p>
          <p className="truncate text-xs text-secondary-gary">
            {row.duration?.trim() || "Duration not set"}
          </p>
        </div>
      </div>
    ),
  },
  {
    header: "Batch Conducted",
    accessorKey: "batchConducted",
    cell: (value) => (
      <span className="text-sm text-secondary-gary tabular-nums">
        {formatFigure(value as number | null)}
      </span>
    ),
  },
  {
    header: "Trainees (BN / Other / Overseas)",
    accessorKey: "totalTrainees",
    cell: (_value, row) => (
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-pBlue tabular-nums">
          {formatFigure(row.totalTrainees)}
        </span>
        <span className="text-xs text-secondary-gary tabular-nums">
          {formatFigure(row.bn)} / {formatFigure(row.otherMaritimeOrg)} /{" "}
          {formatFigure(row.overseas)}
        </span>
      </div>
    ),
  },
  {
    header: "Remarks",
    accessorKey: "remarks",
    cell: (value) => (
      <span className="text-sm text-secondary-gary">
        {(value as string)?.trim() || "—"}
      </span>
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
          onClick={() => onViewBatches?.(row)}
          aria-label={`View batches for ${row.name}`}
          title="View batches"
        >
          <Layers className="h-4 w-4 text-secondary-foreground" />
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
