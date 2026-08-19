import { Download, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { ColumnDef } from "@/src/components/ui/data-table";
import { cn } from "@/src/lib/utils";
import {
  INotice,
  NOTICE_TYPE_BADGE,
  NOTICE_TYPE_LABELS,
} from "@/src/components/notices/types";

const formatDate = (value?: string | null) => {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const GetNoticesColumns = (
  onEdit?: (item: INotice) => void,
  onDelete?: (item: INotice) => void
): ColumnDef<INotice>[] => [
  {
    header: "Notice No.",
    accessorKey: "noticeNumber",
    cell: (value) => (
      <span className="text-sm font-semibold text-secondary-dark">
        {(value as string) || "—"}
      </span>
    ),
  },
  {
    header: "Title (English)",
    accessorKey: "titleEn",
    cell: (value) => (
      <span className="text-sm font-medium text-secondary-dark line-clamp-2 max-w-72">
        {(value as string) || "—"}
      </span>
    ),
  },
  {
    header: "Type",
    accessorKey: "type",
    cell: (value) => {
      const type = value as INotice["type"];
      return (
        <span
          className={cn(
            "rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ring-1 ring-inset",
            NOTICE_TYPE_BADGE[type]
          )}
        >
          {NOTICE_TYPE_LABELS[type] ?? "—"}
        </span>
      );
    },
  },
  {
    header: "Published",
    accessorKey: "publishedAt",
    cell: (value) => (
      <span className="text-sm text-secondary-gary">
        {formatDate(value as string)}
      </span>
    ),
  },
  {
    header: "PDF",
    accessorKey: "pdfUrl",
    cell: (value) => {
      const url = value as string | null;
      return url ? (
        <a
          href={url}
          download
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-md border border-[#E6E6E6] bg-light px-2.5 py-1.5 text-xs font-medium text-secondary-foreground hover:bg-gray-100"
        >
          <Download className="h-3.5 w-3.5" />
          Download
        </a>
      ) : (
        <span className="text-sm text-secondary-gary">—</span>
      );
    },
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: (value) => {
      const status = value as INotice["status"];
      return (
        <span
          className={cn(
            "rounded-full px-2.5 py-1 text-[11px] font-semibold",
            status === "ACTIVE"
              ? "bg-emerald-50 text-emerald-700"
              : "bg-gray-100 text-gray-500"
          )}
        >
          {status === "ACTIVE" ? "Active" : "Inactive"}
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
          className="w-9! min-h-9 border border-[#E6E6E6] flex items-center justify-center rounded-lg bg-light hover:bg-light"
          size="sm"
          onClick={() => onEdit?.(row)}
          aria-label={`Edit ${row.noticeNumber}`}
        >
          <Pencil className="h-4 w-4 text-secondary-foreground" />
        </Button>
        <Button
          className="w-9! min-h-9 border border-[#E6E6E6] flex items-center justify-center rounded-lg bg-light hover:bg-red-50"
          size="sm"
          onClick={() => onDelete?.(row)}
          aria-label={`Delete ${row.noticeNumber}`}
        >
          <Trash2 className="h-4 w-4 text-red-500" />
        </Button>
      </div>
    ),
  },
];
