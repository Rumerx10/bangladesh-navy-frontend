export interface INotice {
  message: string;
  isActive: boolean;
}

export interface IHeroManagement {
  id?: string;
  title: string;
  slogan: string;
  description: string;
  notices: INotice[];
  images: (File | string)[];
}
