export interface IPartner {
  image: File | string;
  name: string;
  isActive: boolean;
}

export interface IPartnerManagement {
  id?: string;
  title: string;
  description: string;
  partners: IPartner[];
}
