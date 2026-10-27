import { siteConfig } from "@/src/config/siteConfig";
import {
  recordMetaSection,
  ViewSection,
} from "@/src/components/shared/ViewDetailsModal/viewFields";
import { IProduct, PRODUCT_CATEGORY_LABELS } from "../types";

export const getProductViewSections = (item: IProduct): ViewSection[] => [
  {
    title: "General",
    fields: [
      { label: "Images", type: "gallery", value: item.images },
      { label: "Name (English)", value: item.nameEn },
      // { label: "Name (Bengali)", value: item.nameBn },
      {
        label: "Category",
        value: item.category ? PRODUCT_CATEGORY_LABELS[item.category] : null,
      },
      { label: "Chart Code", value: item.chartCode },
      {
        label: "Price",
        value:
          item.price != null
            ? `${siteConfig.currencySymbol}${item.price}`
            : null,
      },
      { label: "Status", type: "status", value: item.status },
    ],
  },
  {
    title: "Chart Details",
    fields: [
      { label: "Geographic Location", value: item.geographicLocation },
      { label: "Scale", value: item.scale },
      { label: "Projection", value: item.projection },
      { label: "Edition", value: item.edition },
      { label: "Edition Date", type: "date", value: item.editionDate },
      { label: "Publication Date", type: "date", value: item.publicationDate },
    ],
  },
  {
    title: "Coordinates",
    fields: [
      { label: "North Latitude", value: item.northLatitude },
      { label: "South Latitude", value: item.southLatitude },
      { label: "East Longitude", value: item.eastLongitude },
      { label: "West Longitude", value: item.westLongitude },
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
