export interface IPublication {
  id: string;
  code?: string;
  titleEn: string;
  titleBn?: string;
  imageUrl: string;
  date?: string;
  status?: "ACTIVE" | "INACTIVE";
  createdAt?: string;
  updatedAt?: string;
}
