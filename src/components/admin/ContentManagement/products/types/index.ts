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

export interface IProductAttribute {
  id: string;
  key: string;
  value: string;
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
  productAttributes: IProductAttribute[];
  createdAt: string;
  updatedAt: string;
}
