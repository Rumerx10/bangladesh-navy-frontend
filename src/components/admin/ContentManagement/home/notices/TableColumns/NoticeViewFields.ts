import {
  recordMetaSection,
  ViewSection,
} from "@/src/components/shared/ViewDetailsModal/viewFields";
import { INoticeManagement } from "../types";

export const getNoticeViewSections = (
  item: INoticeManagement
): ViewSection[] => [
  {
    title: "General",
    fields: [
      { label: "Name", value: item.name },
      { label: "Status", type: "status", value: item.status },
      { label: "Description", type: "longText", value: item.description },
    ],
  },
  recordMetaSection(item),
];
