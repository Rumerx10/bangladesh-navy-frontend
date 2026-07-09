export interface INewsItem {
  category: string;
  title: string;
  date: string;
  shortDescription: string;
  description: string;
  image: File | string;
}

export interface INoticesManagement {
  id?: string;
  title: string;
  subTitle: string;
  categories: string[];
  news: INewsItem[];
}
