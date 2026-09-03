import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { ColumnDef } from "@/src/components/ui/data-table";
import { IAlumniMember } from "@/src/components/alumni/types";

export const GetAlumniMemberColumns = (
  /** `batchId` → "Course — Batch" name; the list endpoint returns the id only. */
  batchNames: Record<string, string>,
  onEdit?: (item: IAlumniMember) => void,
  onDelete?: (item: IAlumniMember) => void
): ColumnDef<IAlumniMember>[] => [
  {
    header: "Rank & Name",
    accessorKey: "rankAndName",
    cell: (_value, row) => (
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary tabular-nums">
          {row.serial ?? "—"}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-secondary-dark">
            {row.rankAndName || "—"}
          </p>
          <p className="truncate text-xs text-secondary-gary">
            P. No {row.pNo || "—"}
          </p>
        </div>
      </div>
    ),
  },
  {
    header: "Batch",
    accessorKey: "batchId",
    cell: (_value, row) => (
      <span className="text-sm text-secondary-gary">
        {batchNames[row.batchId] || "—"}
      </span>
    ),
  },
  {
    header: "Organization",
    accessorKey: "organization",
    cell: (value) => (
      <span className="text-sm text-secondary-gary">
        {(value as string)?.trim() || "—"}
      </span>
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
          onClick={() => onEdit?.(row)}
          aria-label={`Edit ${row.rankAndName}`}
        >
          <Pencil className="h-4 w-4 text-secondary-foreground" />
        </Button>
        <Button
          className="flex min-h-9 w-9! items-center justify-center rounded-lg border border-red-100 bg-red-50 hover:bg-red-100"
          size="sm"
          onClick={() => onDelete?.(row)}
          aria-label={`Delete ${row.rankAndName}`}
        >
          <Trash2 className="h-4 w-4 text-red-500" />
        </Button>
      </div>
    ),
  },
];
