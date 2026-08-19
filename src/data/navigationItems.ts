import { INavyCategory } from "@/src/components/products/types";

export interface NestedSubLink {
  label: string;
  link: string;
}

export interface SubLink {
  label: string;
  link: string;
  subLinks?: NestedSubLink[];
}

export interface NavItem {
  label: string;
  link: string;
  asLink?: boolean;
  activeMatches?: string[];
  subLinks?: SubLink[];
}

export const navyCategories: INavyCategory[] = [
  {
    id: "cat-1",
    nameBn: "কাগজের চার্ট",
    nameEn: "Paper Charts",
    slug: "paper-charts",
    description: "Official nautical charts for Bangladesh waters",
    productCount: 45,
  },
  {
    id: "cat-2",
    nameBn: "ইলেক্ট্রনিক চার্ট",
    nameEn: "Electronic Navigational Charts (ENC)",
    slug: "electronic-navigational-charts",
    description: "ENC & ECDIS compatible digital charts",
    productCount: 32,
  },
  {
    id: "cat-3",
    nameBn: "জোয়ার-ভাটা সারণি",
    nameEn: "Tide Tables",
    slug: "tide-tables",
    description: "Annual tide prediction tables",
    productCount: 12,
  },
  {
    id: "cat-6",
    nameBn: "সামুদ্রিক আবহাওয়া",
    nameEn: "Marine Weather Forecast",
    slug: "marine-weather-forecast",
    description: "Weather data & forecasting services",
    productCount: 8,
  },
];

export const NavigationItems: NavItem[] = [
  { label: "Home", link: "/" },
  {
    label: "About Us",
    link: "/about",
    subLinks: [
      { label: "History", link: "/about/history" },
      { label: "Vision & Mission", link: "/about/vision-mission" },
      { label: "Organogram", link: "/about/organogram" },
      { label: "Survey Ships", link: "/about/survey-ships" },
      { label: "News & Events", link: "/about/news" },
      { label: "Gallery", link: "/about/gallery" },
    ],
  },
  {
    label: "Nautical Products",
    link: "/product-service",
    asLink: true,
    activeMatches: ["/notices-mariners", "/how-to-collect"],
    subLinks: [
      ...navyCategories.map((cat) => ({
        label: cat.nameEn,
        link: `/product-service/${cat.slug}`,
      })),
      { label: "How to Collect", link: "/how-to-collect" },
    ],
  },
  {
    label: "Training and Courses",
    link: "/skill-development",
    subLinks: [
      { label: "Alumni", link: "/training-courses/alumni" },
      { label: "Courses", link: "/training-courses/courses" },
      { label: "BN Hydrographic Institute", link: "/training-courses" },
      
    ],
  },
  {
    label: "Important Notice",
    link: "/important-notice",
    subLinks: [
      {
        label: "Notices",
        link: "/important-notice/notices",
      },
      {
        label: "Publications",
        link: "/important-notice/publications",
      },
      {
        label: "Hydrographic Note",
        link: "/important-notice/hydrographic-note",
      },
    ],
  },
  {
    label: "Contact",
    link: "/contact-us",
    subLinks: [
      { label: "Contact Information", link: "/contact-us" },
      { label: "Query & Suggestion", link: "/contact-us/query-suggestion" },
    ],
  },
];
