export interface INewsEventCategory {
  id: string;
  nameEn: string;
  nameBn: string;
}

export interface INewsEvent {
  id: string;
  titleEn: string;
  titleBn: string;
  contentEn: string;
  contentBn: string;
  imageUrl: string;
  newsCategory: INewsEventCategory;
  createdAt?: string;
  updatedAt?: string;
}
