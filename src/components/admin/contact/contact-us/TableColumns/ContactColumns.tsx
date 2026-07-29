import { Eye } from "lucide-react";
import { IContact } from "../types";
import { Button } from "@/src/components/ui/button";
import { ColumnDef } from "@/src/components/ui/data-table";
import StatusBadge from "@/src/components/shared/Status/Status";
import { StatusType } from "@/src/components/shared/types/common";

const statusVariantMap: Record<string, StatusType> = {
  PENDING: StatusType.PENDING,
  IN_PROGRESS: StatusType.IN_PROGRESS,
  RESOLVED: StatusType.ACTIVE,
};

const GetContactColumns = (
  onView?: (item: IContact) => void
): ColumnDef<IContact>[] => {
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
      header: "Email",
      accessorKey: "email",
      cell: (value) => {
        const email = value as string | undefined;
        return (
          <span className="text-sm text-secondary-gary">{email || "—"}</span>
        );
      },
    },
    {
      header: "Phone",
      accessorKey: "phone",
      cell: (value) => {
        const phone = value as string | undefined;
        return (
          <span className="text-sm text-secondary-gary">{phone || "—"}</span>
        );
      },
    },
    {
      header: "Type",
      accessorKey: "contactType",
      cell: (value) => {
        const type = value as string | undefined;
        return (
          <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-700 font-medium">
            {type === "CONTACT_INFORMATION" ? "Information" : "Support"}
          </span>
        );
      },
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (value) => {
        const status = value as string | undefined;
        const variant = statusVariantMap[status || ""] || StatusType.INACTIVE;
        return <StatusBadge status={variant} className="px-2 py-1" />;
      },
    },
    {
      header: "Date",
      accessorKey: "createdAt",
      cell: (value) => {
        const date = value as string | undefined;
        return (
          <span className="text-sm text-secondary-gary">
            {date ? new Date(date).toLocaleDateString() : "—"}
          </span>
        );
      },
    },
    {
      header: "Action",
      accessorKey: "id",
      cell: (_value, row) => {
        return (
          <div className="flex items-center gap-2 w-full">
            <Button
              className="w-9! min-h-9 border border-[#E6E6E6] flex items-center justify-center rounded-lg bg-light hover:bg-light"
              size="sm"
              onClick={() => onView?.(row)}
            >
              <Eye className="h-4 w-4 text-secondary-foreground" />
            </Button>
          </div>
        );
      },
    },
  ];
};

export default GetContactColumns;
