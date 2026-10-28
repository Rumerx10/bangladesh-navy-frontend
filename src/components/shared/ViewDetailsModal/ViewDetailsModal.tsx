"use client";

import Image from "next/image";
import { ExternalLink, FileText } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { sanitizeRichText } from "@/src/utils/sanitize";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { ViewField, ViewSection } from "./viewFields";

interface ViewDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  /** Build with the row being viewed; pass `[]` while nothing is selected. */
  sections: ViewSection[];
}

const FULL_WIDTH_TYPES = new Set<ViewField["type"]>([
  "longText",
  "html",
  "image",
  "gallery",
  "list",
  "keyValue",
]);

const isEmptyValue = (value: unknown) =>
  value === null ||
  value === undefined ||
  (typeof value === "string" && value.trim() === "") ||
  (Array.isArray(value) && value.length === 0);

const formatDate = (value: string, withTime: boolean) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };
  return withTime
    ? date.toLocaleString("en-GB", {
        ...options,
        hour: "2-digit",
        minute: "2-digit",
      })
    : date.toLocaleDateString("en-GB", options);
};

/** "IN_PROGRESS" → "In Progress" */
const formatEnum = (value: string) =>
  value
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const FieldValue = ({ field }: { field: ViewField }) => {
  if (field.type !== "custom" && isEmptyValue(field.value)) {
    return <p className="text-sm font-medium text-secondary-dark">—</p>;
  }

  switch (field.type) {
    case "longText":
      return (
        <p className="text-sm text-secondary-dark whitespace-pre-wrap wrap-break-word">
          {field.value}
        </p>
      );

    case "html":
      return (
        <div
          className="text-sm leading-relaxed text-secondary-dark [&_p]:mb-3 [&_p:last-child]:mb-0 [&_ul]:list-disc [&_ol]:list-decimal [&_ul]:pl-5 [&_ol]:pl-5 [&_li]:mb-1 [&_a]:text-liteBlue [&_a]:underline [&_img]:rounded-lg [&_img]:max-w-full after:content-[''] after:table after:clear-both"
          dangerouslySetInnerHTML={{ __html: sanitizeRichText(field.value!) }}
        />
      );

    case "image":
      return (
        <a
          href={field.value!}
          target="_blank"
          rel="noopener noreferrer"
          className="relative block w-full aspect-video max-h-96 rounded-md overflow-hidden border border-border bg-card"
        >
          <Image
            src={field.value!}
            alt={field.label}
            fill
            sizes="(min-width: 640px) 60vw, 100vw"
            className="object-contain"
          />
        </a>
      );

    case "gallery":
      return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {field.value!.map((src, index) => (
            <a
              key={`${src}-${index}`}
              href={src}
              target="_blank"
              rel="noopener noreferrer"
              className="relative block aspect-square rounded-md overflow-hidden border border-border bg-card"
            >
              <Image
                src={src}
                alt={`${field.label} ${index + 1}`}
                fill
                sizes="(min-width: 640px) 15vw, 50vw"
                className="object-cover"
              />
            </a>
          ))}
        </div>
      );

    case "list":
      return (
        <ul className="list-disc pl-5 space-y-1 text-sm text-secondary-dark">
          {field.value!.map((item, index) => (
            <li key={`${item}-${index}`}>{item}</li>
          ))}
        </ul>
      );

    case "keyValue":
      return (
        <div className="overflow-hidden rounded-md border border-border bg-card">
          {field.value!.map((row, index) => (
            <div
              key={`${row.key}-${index}`}
              className="grid grid-cols-2 gap-3 px-3 py-2 text-sm border-b border-border last:border-b-0"
            >
              <span className="font-medium text-secondary-foreground">
                {row.key || "—"}
              </span>
              <span className="text-secondary-dark wrap-break-word">
                {row.value || "—"}
              </span>
            </div>
          ))}
        </div>
      );

    case "status":
      return (
        <span
          className={cn(
            "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
            field.value === "ACTIVE"
              ? "bg-green-100 text-green-800"
              : "bg-light-dark text-secondary-foreground"
          )}
        >
          {formatEnum(field.value!)}
        </span>
      );

    case "link":
      return (
        <a
          href={field.value!}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-start gap-1.5 text-sm text-liteBlue hover:underline break-all"
        >
          {field.value}
          <ExternalLink className="h-3.5 w-3.5 shrink-0 mt-0.5" />
        </a>
      );

    case "file":
      return (
        <a
          href={field.value!}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1.5 text-xs font-medium text-secondary-foreground hover:bg-light-dark"
        >
          <FileText className="h-3.5 w-3.5" />
          Open file
        </a>
      );

    case "date":
    case "datetime":
      return (
        <p className="text-sm font-medium text-secondary-dark">
          {formatDate(field.value!, field.type === "datetime")}
        </p>
      );

    case "custom":
      return <div className="text-sm text-secondary-dark">{field.value}</div>;

    default:
      return (
        <p className="text-sm font-medium text-secondary-dark wrap-break-word">
          {field.value}
        </p>
      );
  }
};

/**
 * Read-only "view everything" dialog opened from the Eye button in admin
 * table action columns. Each feature describes its record as sections of
 * labelled fields (see `viewFields.ts`); this component only handles layout
 * and how each field type is displayed.
 */
const ViewDetailsModal = ({
  isOpen,
  onClose,
  title,
  sections,
}: ViewDetailsModalProps) => {
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent
        aria-describedby={undefined}
        className="bg-card sm:min-w-[60vw] max-h-[90vh] flex flex-col"
      >
        <DialogHeader className="shrink-0">
          <DialogTitle className="text-secondary text-xl font-semibold">
            {title}
          </DialogTitle>
        </DialogHeader>

        <div className="overflow-y-auto scrollbar-modern flex-1 mt-2 pr-2 pb-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {sections.map((section, sectionIndex) => (
              <div key={section.title ?? sectionIndex} className="contents">
                {section.title && (
                  <div className="border-l-4 border-primary bg-primary/5 px-3 py-2 sm:col-span-2">
                    <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                      {section.title}
                    </p>
                  </div>
                )}
                {section.fields.map((field) => (
                  <div
                    key={field.label}
                    className={cn(
                      "bg-light rounded-lg p-3 border border-border min-w-0",
                      (field.fullWidth || FULL_WIDTH_TYPES.has(field.type)) &&
                        "sm:col-span-2"
                    )}
                  >
                    <p className="text-xs text-secondary-foreground uppercase tracking-wider mb-1">
                      {field.label}
                    </p>
                    <FieldValue field={field} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewDetailsModal;
