export interface IImportantLink {
  id: string;
  name: string;
  link: string;
  status: "ACTIVE" | "INACTIVE";
  createdAt?: string;
  updatedAt?: string;
}
