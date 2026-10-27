import {
  recordMetaSection,
  ViewSection,
} from "@/src/components/shared/ViewDetailsModal/viewFields";
import { ISurveyShip } from "../types";

export const getSurveyShipViewSections = (item: ISurveyShip): ViewSection[] => [
  {
    title: "General",
    fields: [
      { label: "Image", type: "image", value: item.image },
      { label: "Name (English)", value: item.nameEn },
      // { label: "Name (Bengali)", value: item.nameBn },
      { label: "Category", value: item.surveyCategory?.nameEn },
      { label: "Status", type: "status", value: item.status },
      { label: "Position", value: item.position },
    ],
  },
  {
    title: "Basic Information",
    fields: [
      { label: "Length", value: item.length },
      { label: "Beam", value: item.beam },
      { label: "Draft", value: item.draft },
      { label: "Displacement", value: item.crew },
      { label: "Capabilities", type: "list", value: item.surveyEquipment },
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
