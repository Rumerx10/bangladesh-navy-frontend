"use client";

import { Pencil, Trash2 } from "lucide-react";
import { ColumnDef } from "@/src/components/ui/data-table";
import { getStepIcon } from "@/src/data/howToCollectIcons";
import { IHowToCollectStep } from "../types";

export function GetHowToCollectColumns(
  onEdit: (item: IHowToCollectStep) => void,
  onDelete: (id: string) => void
): ColumnDef<IHowToCollectStep>[] {
  return [
    {
      header: "Serial",
      accessorKey: "serial",
      cell: (_, row) => (
        <span className="text-sm font-medium text-secondary-foreground tabular-nums">
          {row.serial}
        </span>
      ),
    },
    {
      header: "Step",
      accessorKey: "stepName",
      cell: (_, row) => {
        const Icon = getStepIcon(row.icon);
        return (
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-primary/20 bg-primary/10 text-primary">
              <Icon className="h-4 w-4" />
            </div>
            <span className="text-sm font-medium text-pBlue">
              {row.stepName}
            </span>
          </div>
        );
      },
    },
    {
      header: "Title",
      accessorKey: "title",
      cell: (_, row) => (
        <span className="line-clamp-2 block max-w-60 font-medium text-pBlue">
          {row.title}
        </span>
      ),
    },
    {
      header: "Description",
      accessorKey: "description",
      cell: (_, row) => (
        <span className="line-clamp-2 block max-w-80 text-sm text-secondary-foreground">
          {row.description}
        </span>
      ),
    },
    {
      header: "Extra Details",
      accessorKey: "extraFields",
      cell: (_, row) => {
        const count = row.extraFields?.length ?? 0;
        return (
          <span className="text-sm text-secondary-foreground">
            {count > 0 ? `${count} row${count > 1 ? "s" : ""}` : "—"}
          </span>
        );
      },
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (_, row) => (
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
            row.status === "ACTIVE"
              ? "bg-green-100 text-green-700"
              : "bg-light-dark text-secondary-foreground"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      header: "Action",
      accessorKey: "id",
      cell: (_, row) => (
        <div className="flex items-center gap-1">
          <button
            onClick={() => onEdit(row)}
            className="cursor-pointer rounded-md p-2 text-secondary-foreground transition-colors hover:bg-light-dark hover:text-pBlue"
            title="Edit"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(row.id)}
            className="cursor-pointer rounded-md p-2 text-secondary-foreground transition-colors hover:bg-red-50 hover:text-red-600"
            title="Delete"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ];
}
