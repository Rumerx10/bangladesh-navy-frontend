export interface IBiographyManagement {
  id: string;
  nameEn: string;
  nameBn: string;
  designationEn: string;
  designationBn: string | null;
  messageEn: string;
  messageBn: string;
  imageUrl: string;
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;
  updatedAt: string;
}