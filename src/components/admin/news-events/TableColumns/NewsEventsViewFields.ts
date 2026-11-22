import {
  recordMetaSection,
  ViewSection,
} from "@/src/components/shared/ViewDetailsModal/viewFields";
import { INewsEvent } from "../types";

export const getNewsEventsViewSections = (item: INewsEvent): ViewSection[] => [
  {
    title: "General",
    fields: [
      { label: "Cover Image", type: "image", value: item.imageUrl },
      { label: "Title (English)", value: item.titleEn },
      // { label: "Title (Bengali)", value: item.titleBn },
      { label: "Category", value: item.newsCategory?.nameEn },
    ],
  },
  {
    title: "Content",
    fields: [
      { label: "English", type: "html", value: item.contentEn },
      // { label: "Bengali", type: "html", value: item.contentBn },
    ],
  },
  recordMetaSection(item),
];
