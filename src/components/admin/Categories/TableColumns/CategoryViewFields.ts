import {
  recordMetaSection,
  ViewSection,
} from "@/src/components/shared/ViewDetailsModal/viewFields";
import { ICategory } from "../types";

export const getCategoryViewSections = (item: ICategory): ViewSection[] => [
  {
    title: "General",
    fields: [
      { label: "Icon", type: "image", value: item.icon },
      { label: "English Name", value: item.nameEn },
      // { label: "Bengali Name", value: item.nameBn },
      { label: "Status", type: "status", value: item.status },
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
