import {
  recordMetaSection,
  ViewSection,
} from "@/src/components/shared/ViewDetailsModal/viewFields";
import { IPublication } from "../types";

export const getPublicationViewSections = (
  item: IPublication
): ViewSection[] => [
  {
    title: "General",
    fields: [
      { label: "Image", type: "image", value: item.imageUrl },
      { label: "Title (English)", value: item.titleEn },
      // { label: "Title (Bengali)", value: item.titleBn },
      { label: "Code", value: item.code },
      { label: "Date", type: "date", value: item.date },
      { label: "Status", type: "status", value: item.status || "ACTIVE" },
    ],
  },
  recordMetaSection(item),
];
