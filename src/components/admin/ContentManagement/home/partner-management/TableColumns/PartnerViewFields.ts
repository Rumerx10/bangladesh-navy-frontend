import {
  recordMetaSection,
  ViewSection,
} from "@/src/components/shared/ViewDetailsModal/viewFields";
import { IPartner } from "../types";

export const getPartnerViewSections = (item: IPartner): ViewSection[] => [
  {
    title: "General",
    fields: [
      { label: "Logo", type: "image", value: item.image },
      { label: "Link", type: "link", value: item.link },
      { label: "Status", type: "status", value: item.status },
    ],
  },
  recordMetaSection(item),
];
