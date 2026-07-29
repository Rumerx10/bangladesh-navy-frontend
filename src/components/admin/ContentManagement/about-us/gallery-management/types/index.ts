export interface IGalleryCategory {
  id: string;
  nameEn: string;
  nameBn: string;
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;
  updatedAt: string;
}

export interface IGalleryItemCategory {
  id: string;
  nameEn: string;
  nameBn: string;
}

export interface IGalleryItem {
  id: string;
  titleEn: string;
  titleBn: string;
  imageUrl: string;
  position: number;
  galleryCategory: IGalleryItemCategory;
  createdAt?: string;
  updatedAt?: string;
}
