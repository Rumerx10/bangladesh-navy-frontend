export interface ICategory {
  id: string;
  nameBn: string;
  nameEn?: string;
  descriptionEn?: string;
  descriptionBn?: string;
  icon?: string;
  status?: "ACTIVE" | "INACTIVE";
  updatedAt?: string;
  createdAt: string;
  actions?: string;
}
