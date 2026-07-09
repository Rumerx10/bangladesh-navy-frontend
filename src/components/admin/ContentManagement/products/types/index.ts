export interface IProductSpecifications {
  chartNumber: string;
  scale: string;
  projection: string;
  northLatitude: string;
  southLatitude: string;
  eastLongitude: string;
  westLongitude: string;
  edition: string;
  publicationDate: string;
}

export interface IProduct {
  image: File | string;
  title: string;
  category: string;
  shortDescription: string;
  specifications: IProductSpecifications;
  description: string;
}

export interface IProductsManagement {
  id?: string;
  title: string;
  subTitle: string;
  categories: string[];
  products: IProduct[];
}
