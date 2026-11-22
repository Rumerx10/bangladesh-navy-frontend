import {
  recordMetaSection,
  ViewSection,
} from "@/src/components/shared/ViewDetailsModal/viewFields";
import { IBatch } from "@/src/components/batches/types";

export const getBatchViewSections = (
  item: IBatch,
  /** Used when the row doesn't carry the API-populated `courseName`. */
  fallbackCourseName?: string
): ViewSection[] => [
  {
    title: "General",
    fields: [
      { label: "Serial", value: item.serial },
      { label: "Batch Name", value: item.name },
      { label: "Course", value: item.courseName || fallbackCourseName },
      { label: "Status", type: "status", value: item.status },
      { label: "Start Date", type: "date", value: item.startDate },
      { label: "End Date", type: "date", value: item.endDate },
    ],
  },
  recordMetaSection(item),
];
