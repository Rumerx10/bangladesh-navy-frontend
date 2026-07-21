export interface ICategory {
  id: string;
  nameBn: string;
  nameEn: string;
  icon: string;
  descriptionEn: string;
  descriptionBn: string;
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;
  updatedAt: string;
}
