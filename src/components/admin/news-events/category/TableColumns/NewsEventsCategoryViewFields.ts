import { ViewSection } from "@/src/components/shared/ViewDetailsModal/viewFields";
import { INewsEventsCategory } from "../types";

export const getNewsEventsCategoryViewSections = (
  item: INewsEventsCategory
): ViewSection[] => [
  {
    title: "General",
    fields: [
      { label: "English Name", value: item.nameEn },
      // { label: "Bengali Name", value: item.nameBn },
    ],
  },
];
