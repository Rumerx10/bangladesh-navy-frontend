export type ProductCategory =
  "PAPPER_CHART" | "ELECTRONIC_NAVIGATIONAL_CHART" | "TIDAL";

export const PRODUCT_CATEGORY_OPTIONS: {
  label: string;
  value: ProductCategory;
}[] = [
  { label: "Paper Chart", value: "PAPPER_CHART" },
  {
    label: "Electronic Navigational Chart",
    value: "ELECTRONIC_NAVIGATIONAL_CHART",
  },
  { label: "Tidal", value: "TIDAL" },
];

export const PRODUCT_CATEGORY_LABELS: Record<ProductCategory, string> = {
  PAPPER_CHART: "Paper Chart",
  ELECTRONIC_NAVIGATIONAL_CHART: "Electronic Navigational Chart",
  TIDAL: "Tidal",
};

export interface IProduct {
  id: string;
  nameEn: string;
  nameBn: string;
  descriptionEn: string;
  descriptionBn: string;
  images: string[];
  chartCode: number | null;
  category: ProductCategory | null;
  price: number | null;
  status: "ACTIVE" | "INACTIVE";
  geographicLocation: string | null;
  scale: string | null;
  projection: string | null;
  northLatitude: string | null;
  southLatitude: string | null;
  eastLongitude: string | null;
  westLongitude: string | null;
  edition: string | null;
  editionDate: string | null;
  publicationDate: string | null;
  createdAt: string;
  updatedAt: string;
}
