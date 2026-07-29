export interface IProductAttribute {
  id: string;
  productId: string;
  key: string;
  value: string;
  createdAt: string;
  updatedAt: string;
}

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

export interface IProductItemCategory {
  id: string;
  nameEn: string;
  nameBn: string;
}

export interface IProduct {
  id: string;
  nameEn: string;
  nameBn: string;
  descriptionEn: string;
  descriptionBn: string;
  images: string[];
  chartCode: number;
  status: "ACTIVE" | "INACTIVE";
  category: IProductItemCategory;
  geographicLocation: string | null;
  scale: string | null;
  projection: string | null;
  northLatitude: string | null;
  southLatitude: string | null;
  eastLongitude: string | null;
  westLongitude: string | null;
  edition: string | null;
  publicationDate: string | null;
  productAttributes?: IProductAttribute[];
  createdAt: string;
  updatedAt: string;
}
