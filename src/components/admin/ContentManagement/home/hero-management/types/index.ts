export interface IHeroManagement {
  id: string;
  titleEn: string;
  titleBn: string;
  subTitleEn: string;
  subTitleBn: string;
  descriptionEn: string;
  descriptionBn: string;
  imageUrls: string[];
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;
  updatedAt: string;
}