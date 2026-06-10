// ─── Product Types (matching Prisma model) ───

export enum DiscountType {
  PERCENTAGE = "PERCENTAGE",
  FLAT = "FLAT",
}

export enum ProductStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export interface INavyProductAttribute {
  id: string;
  productId: string;
  key: string;
  value: string;
  createdAt: string;
  updatedAt: string;
}

export interface INavyCategory {
  id: string;
  nameBn: string;
  nameEn: string;
  slug: string;
  image?: string;
  description?: string;
  productCount?: number;
}

export interface INavyProduct {
  id: string;
  nameBn: string;
  nameEn: string;
  images: string[];
  content?: string;
  descriptionBn?: string;
  descriptionEn?: string;
  price: number; // in smallest unit (poysha)
  discountType?: DiscountType;
  discountValue?: number;
  stock: number;
  categoryId: string;
  status: ProductStatus;
  createdAt: string;
  updatedAt: string;
  category: INavyCategory;
  productAttributes: INavyProductAttribute[];
}

// Derived helper type for cart items stored in IndexedDB
export interface INavyCartItem {
  productId: string;
  nameEn: string;
  nameBn: string;
  image: string;
  price: number;
  discountType?: DiscountType;
  discountValue?: number;
  quantity: number;
  stock: number;
}

// Filter state for product listing
export interface IProductFilter {
  categoryIds: string[];
  priceMin?: number;
  priceMax?: number;
  search?: string;
  sortBy: "relevance" | "price-asc" | "price-desc" | "newest";
}
