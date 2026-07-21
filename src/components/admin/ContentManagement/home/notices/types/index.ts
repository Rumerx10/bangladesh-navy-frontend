export interface INotice {
  message: string;
  isActive: boolean;
}

export interface INoticeManagement {
  id: string;
  name: string;
  description: string;
  status: "ACTIVE" | "INACTIVE" | "DRAFT";
  createdAt: string;
  updatedAt: string;
}
