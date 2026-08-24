import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { ColumnDef } from "@/src/components/ui/data-table";
import { IAlumniCourse } from "@/src/components/alumni/types";

export const GetAlumniCourseColumns = (
  onEdit?: (item: IAlumniCourse) => void,
  onDelete?: (item: IAlumniCourse) => void
): ColumnDef<IAlumniCourse>[] => [
  {
    header: "Name (English)",
    accessorKey: "nameEn",
    cell: (value) => (
      <span className="text-sm font-medium text-secondary-dark">
        {(value as string) || "—"}
      </span>
    ),
  },
  {
    header: "Name (Bengali)",
    accessorKey: "nameBn",
    cell: (value) => (
      <span className="text-sm text-secondary-gary">
        {(value as string) || "—"}
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
          aria-label={`Edit ${row.nameEn}`}
        >
          <Pencil className="h-4 w-4 text-secondary-foreground" />
        </Button>
        <Button
          className="flex min-h-9 w-9! items-center justify-center rounded-lg border border-red-100 bg-red-50 hover:bg-red-100"
          size="sm"
          onClick={() => onDelete?.(row)}
          aria-label={`Delete ${row.nameEn}`}
        >
          <Trash2 className="h-4 w-4 text-red-500" />
        </Button>
      </div>
    ),
  },
];
