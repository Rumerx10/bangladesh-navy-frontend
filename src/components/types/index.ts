// ─── Home Page Types ───

export interface IHeroActionItem {
  id: number;
  title: string;
  subTitle: string;
  icon: string;
  link: string;
}

export interface IHeroSlide {
  id: number;
  subtitle: string;
  title: string;
  highlightTitle?: string;
  description: string;
  buttons: IHeroButton[];
}

export interface IHeroButton {
  text: string;
  href: string;
  variant: "primary" | "secondary";
  icon?: string;
}

export interface ISearchTab {
  id: string;
  label: string;
}

export interface IQuickAccessItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  href: string;
}

export interface IStatItem {
  id: string;
  value: number;
  suffix: string;
  label: string;
}

export interface IChiefMessage {
  title: string;
  content: string[];
  name: string;
  designation: string;
  initials: string;
}

export interface INoticeItem {
  id: string;
  title: string;
  date: string;
  href: string;
  type?: "warning" | "info" | "update";
}

export interface IBiography {
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

export interface INewsCategory {
  id: string;
  nameEn: string;
  nameBn: string;
}

export interface INewsItem {
  id: string;
  titleEn: string;
  titleBn: string;
  contentEn: string;
  contentBn: string;
  imageUrl: string;
  newsCategory: INewsCategory;
}

export interface INewsListResponse {
  data: INewsItem[];
  meta?: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
    hasPagination: boolean;
  };
}
