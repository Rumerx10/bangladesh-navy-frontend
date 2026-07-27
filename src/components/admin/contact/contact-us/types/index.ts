export interface IContact {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  contactType: "CONTACT_INFORMATION" | "CONTACT_SUPPORT";
  status: "PENDING" | "IN_PROGRESS" | "RESOLVED";
  createdAt: string;
  updatedAt: string;
}