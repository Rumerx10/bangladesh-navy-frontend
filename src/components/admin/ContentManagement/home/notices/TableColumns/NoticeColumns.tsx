import StatusBadge from "@/src/components/shared/Status/Status";
import { Button } from "@/src/components/ui/button";
import { ColumnDef } from "@/src/components/ui/data-table";
import { StatusType } from "@/src/components/shared/types/common";
import { Pencil } from "lucide-react";
import { INoticeManagement } from "../types";

const GetNoticeColumns = (
  onEdit?: (item: INoticeManagement) => void
): ColumnDef<INoticeManagement>[] => {
  return [
    {
      header: "Name",
      accessorKey: "name",
      cell: (value) => {
        const name = value as string | undefined;
        return (
          <span className="text-sm font-medium text-secondary-dark">
            {name || "—"}
          </span>
        );
      },
    },
    {
      header: "Description",
      accessorKey: "description",
      cell: (value) => {
        const desc = value as string | undefined;
        return (
          <span className="text-sm text-secondary-gary line-clamp-2 max-w-80">
            {desc || "—"}
          </span>
        );
      },
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (value) => {
        const normalizedStatus =
          String(value || StatusType.INACTIVE).toUpperCase() ===
          StatusType.ACTIVE
            ? StatusType.ACTIVE
            : StatusType.INACTIVE;

        return <StatusBadge status={normalizedStatus} className="px-2 py-1" />;
      },
    },
    {
      header: "Action",
      accessorKey: "id",
      cell: (_value, row) => {
        return (
          <div className="flex items-center gap-2 w-full">
            <Button
              className="w-11! min-h-9 border border-[#E6E6E6] flex items-center justify-center rounded-lg bg-light hover:bg-light"
              size="sm"
              onClick={() => onEdit?.(row)}
            >
              <Pencil className="h-4 w-4 text-secondary-foreground" />
            </Button>
          </div>
        );
      },
    },
  ];
};

export default GetNoticeColumns;
