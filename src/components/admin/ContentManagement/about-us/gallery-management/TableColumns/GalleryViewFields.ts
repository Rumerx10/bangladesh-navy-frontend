import {
  recordMetaSection,
  ViewSection,
} from "@/src/components/shared/ViewDetailsModal/viewFields";
import { IGalleryItem } from "../types";

export const getGalleryViewSections = (item: IGalleryItem): ViewSection[] => [
  {
    title: "General",
    fields: [
      { label: "Image", type: "image", value: item.imageUrl },
      { label: "Title (English)", value: item.titleEn },
      // { label: "Title (Bengali)", value: item.titleBn },
      { label: "Category", value: item.galleryCategory?.nameEn },
      { label: "Position", value: item.position },
    ],
  },
  recordMetaSection(item),
];
