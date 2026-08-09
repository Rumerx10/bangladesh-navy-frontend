export interface IPartner {
  id: string;
  image: string;
  link: string | null;
  status: "ACTIVE" | "INACTIVE";
  createdAt?: string;
  updatedAt?: string;
}
