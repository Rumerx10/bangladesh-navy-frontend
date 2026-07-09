export interface INotice {
  message: string;
  isActive: boolean;
}

export interface INoticeManagement {
  id?: string;
  notices: INotice[];
}
