import {
  recordMetaSection,
  ViewSection,
} from "@/src/components/shared/ViewDetailsModal/viewFields";
import { IImportantLink } from "../types";

export const getImportantLinkViewSections = (
  item: IImportantLink
): ViewSection[] => [
  {
    title: "General",
    fields: [
      { label: "Name", value: item.name },
      { label: "Status", type: "status", value: item.status },
      { label: "Link", type: "link", value: item.link, fullWidth: true },
    ],
  },
  recordMetaSection(item),
];
