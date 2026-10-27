import {
  recordMetaSection,
  ViewSection,
} from "@/src/components/shared/ViewDetailsModal/viewFields";
import { ISurveyCategory } from "../types";

export const getSurveyCategoryViewSections = (
  item: ISurveyCategory
): ViewSection[] => [
  {
    title: "General",
    fields: [
      { label: "English Name", value: item.nameEn },
      // { label: "Bengali Name", value: item.nameBn },
      { label: "Status", type: "status", value: item.status },
    ],
  },
  recordMetaSection(item),
];
