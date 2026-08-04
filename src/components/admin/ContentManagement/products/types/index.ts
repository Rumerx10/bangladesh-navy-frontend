export interface IProductCategory {
  id: string;
  nameEn: string;
  nameBn: string;
  icon: string;
  descriptionEn: string;
  descriptionBn: string;
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;
  updatedAt: string;
}

export type ProductCategory = "PAPPER_CHART" | "ELECTRONIC_NAVIGATIONAL_CHART";

export const PRODUCT_CATEGORY_OPTIONS: {
  label: string;
  value: ProductCategory;
}[] = [
  { label: "Paper Chart", value: "PAPPER_CHART" },
  {
    label: "Electronic Navigational Chart",
    value: "ELECTRONIC_NAVIGATIONAL_CHART",
  },
];

export const PRODUCT_CATEGORY_LABELS: Record<ProductCategory, string> = {
  PAPPER_CHART: "Paper Chart",
  ELECTRONIC_NAVIGATIONAL_CHART: "Electronic Navigational Chart",
};

export interface IProduct {
  id: string;
  nameEn: string;
  nameBn: string;
  descriptionEn: string;
  descriptionBn: string;
  images: string[];
  chartCode: number;
  category: ProductCategory | null;
  isTidal?: boolean;
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
  publicationDate: string | null;
  createdAt: string;
  updatedAt: string;
}
