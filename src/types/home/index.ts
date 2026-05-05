// ─── Home Page Types ───

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

export interface INewsItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string[];
  date: string;
  image: string;
  category: string;
  href: string;
}

export interface INoticeItem {
  id: string;
  title: string;
  date: string;
  href: string;
  type?: "warning" | "info" | "update";
}
