export interface IHeroManagement {
  id?: string;
  title: string;
  slogan: string;
  description: string;
  images: (File | string)[];
}
