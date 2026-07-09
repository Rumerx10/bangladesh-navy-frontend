export interface IGalleryItem {
  image: File | string;
  title: string;
  category: string;
}

export interface IGalleryManagement {
  id?: string;
  title: string;
  subTitle: string;
  categories: string[];
  galleryItems: IGalleryItem[];
}
