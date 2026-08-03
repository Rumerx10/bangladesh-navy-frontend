export interface IGalleryCategory {
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
  galleryCategory: IGalleryCategory;
}
