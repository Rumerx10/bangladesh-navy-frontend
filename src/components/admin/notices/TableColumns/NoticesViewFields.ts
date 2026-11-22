import {
  recordMetaSection,
  ViewSection,
} from "@/src/components/shared/ViewDetailsModal/viewFields";
import { INotice, NOTICE_TYPE_LABELS } from "@/src/components/notices/types";

export const getNoticesViewSections = (item: INotice): ViewSection[] => [
  {
    title: "General",
    fields: [
      { label: "Notice No.", value: item.noticeNumber },
      { label: "Type", value: NOTICE_TYPE_LABELS[item.type] ?? item.type },
      { label: "Published", type: "date", value: item.publishedAt },
      { label: "Status", type: "status", value: item.status },
      { label: "Title (English)", value: item.titleEn },
      // { label: "Title (Bengali)", value: item.titleBn },
      { label: "PDF", type: "file", value: item.pdfUrl },
    ],
  },
  {
    title: "Description",
    fields: [
      { label: "English", type: "longText", value: item.descriptionEn },
      // { label: "Bengali", type: "longText", value: item.descriptionBn },
    ],
  },
  recordMetaSection(item),
];
