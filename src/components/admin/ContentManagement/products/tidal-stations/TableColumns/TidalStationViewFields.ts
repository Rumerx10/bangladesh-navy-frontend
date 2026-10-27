import {
  recordMetaSection,
  ViewSection,
} from "@/src/components/shared/ViewDetailsModal/viewFields";
import { ITidalStation } from "../types";

export const getTidalStationViewSections = (
  item: ITidalStation
): ViewSection[] => [
  {
    title: "General",
    fields: [
      { label: "General Area", value: item.generalArea },
      { label: "Location", value: item.location },
      { label: "Latitude", value: item.latitude },
      { label: "Longitude", value: item.longitude },
      { label: "Status", type: "status", value: item.status },
    ],
  },
  {
    title: "Product",
    fields: [
      { label: "Name (English)", value: item.product?.nameEn },
      // { label: "Name (Bengali)", value: item.product?.nameBn },
      {
        label: "Product Attributes",
        type: "keyValue",
        value: item.product?.productAttributes,
      },
    ],
  },
  recordMetaSection(item),
];
