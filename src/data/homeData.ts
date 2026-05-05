import type {
  IChiefMessage,
  IHeroSlide,
  INewsItem,
  INoticeItem,
  IQuickAccessItem,
  ISearchTab,
  IStatItem,
} from "@/src/types/home";

export const heroSlides: IHeroSlide[] = [
  {
    id: 1,
    subtitle: "Official E-commerce Portal",
    title: "Bangladesh Navy",
    highlightTitle: "Hydrographic & Oceanographic Center",
    description:
      "Charting the waters of Bangladesh for safe maritime navigation. Access official nautical charts, tide tables, and navigational publications.",
    buttons: [
      { text: "Browse Charts", href: "/product-service", variant: "primary", icon: "compass" },
      { text: "Latest Notices", href: "#latest-notices", variant: "secondary", icon: "bell" },
    ],
  },
  {
    id: 2,
    subtitle: "Nautical Charts & Publications",
    title: "Navigate with",
    highlightTitle: "Precision & Confidence",
    description:
      "Access the most up-to-date nautical charts covering Bangladesh's vast maritime territory — from Chittagong to the Sundarbans.",
    buttons: [
      { text: "View Products", href: "/product-service", variant: "primary", icon: "map" },
      { text: "About Us", href: "/about", variant: "secondary", icon: "info" },
    ],
  },
  {
    id: 3,
    subtitle: "Electronic Navigational Charts",
    title: "Digital Solutions for",
    highlightTitle: "Modern Maritime Navigation",
    description:
      "S-57 compliant Electronic Navigational Charts (ENCs) for ECDIS systems. Monthly updates ensure accuracy and compliance with IHO standards.",
    buttons: [
      { text: "Explore ENCs", href: "/product-service?category=electronic-charts", variant: "primary", icon: "monitor" },
      { text: "Learn More", href: "/about/history", variant: "secondary", icon: "book" },
    ],
  },
];

export const searchTabs: ISearchTab[] = [
  { id: "all", label: "All" },
  { id: "charts", label: "Charts" },
  { id: "tides", label: "Tides" },
  { id: "notices", label: "Notices" },
  { id: "pubs", label: "Pubs" },
];

export const quickAccessItems: IQuickAccessItem[] = [
  { id: "qa-1", title: "Paper Charts", description: "Official nautical charts for Bangladesh waters", icon: "map", href: "/product-service?category=paper-charts" },
  { id: "qa-2", title: "Electronic Charts", description: "ENC & ECDIS compatible digital charts", icon: "monitor", href: "/product-service?category=electronic-charts" },
  { id: "qa-3", title: "Tide Tables", description: "Annual tide prediction tables", icon: "waves", href: "/product-service?category=tide-tables" },
  { id: "qa-4", title: "Notices to Mariners", description: "Navigation warnings & corrections", icon: "alert-triangle", href: "/product-service?category=notices-to-mariners" },
  { id: "qa-5", title: "Publications", description: "Sailing directions & maritime guides", icon: "book-open", href: "/product-service?category=publications" },
  { id: "qa-6", title: "Marine Weather", description: "Weather data & forecasting", icon: "cloud-sun", href: "/product-service?category=marine-weather" },
];

export const statsItems: IStatItem[] = [
  { id: "stat-1", value: 150, suffix: "+", label: "Nautical Charts" },
  { id: "stat-2", value: 3, suffix: "", label: "Survey Ships" },
  { id: "stat-3", value: 50, suffix: "+", label: "Publications" },
  { id: "stat-4", value: 500, suffix: "+", label: "Trained Personnel" },
];

export const chiefMessage: IChiefMessage = {
  title: "Message from Chief Hydrographer",
  content: [
    "Welcome to the Bangladesh Navy Hydrographic and Oceanographic Center. Our mission is to provide mariners with accurate and up-to-date nautical information for safe navigation in Bangladesh waters.",
    "As the national hydrographic authority, we are committed to continuously enhancing our products. Our dedicated team works tirelessly to ensure that all maritime stakeholders have access to reliable navigational products and services.",
    "I invite you to explore our website and discover the range of products and services we offer. Your feedback is invaluable to us as we continue to improve and serve the maritime community better.",
  ],
  name: "Rear Admiral",
  designation: "Chief Hydrographer",
  initials: "CH",
};

export const newsItems: INewsItem[] = [
  { id: "news-1", title: "BNHOC Completes Hydrographic Survey of Payra Deep Sea Port Channel", description: "Bangladesh Navy Hydrographic and Oceanographic Center has successfully completed an extensive hydrographic survey of the Payra Deep Sea Port Channel.", date: "Apr 2026", href: "#" },
  { id: "news-2", title: "International Hydrographic Day 2026: BNHOC Celebrates", description: "BNHOC celebrated World Hydrography Day on 21 June with the theme 'Hydrography — Underpinning the Digital Twin of the Ocean.'", date: "Jun 2026", href: "#" },
  { id: "news-3", title: "New Electronic Navigational Charts (ENCs) Released for Bay of Bengal", description: "BNHOC has released 12 new Electronic Navigational Charts for Bay of Bengal.", date: "Mar 2026", href: "#" },
];

export const noticeItems: INoticeItem[] = [
  { id: "notice-1", title: "Temporary Obstruction — Chittagong Port Outer Anchorage", date: "Mar 2026", href: "#", type: "warning" },
  { id: "notice-2", title: "Light Characteristics Change — Kutubdia Lighthouse", date: "Feb 2026", href: "#", type: "update" },
  { id: "notice-3", title: "Updated Depths Information — Mongla Port Approach", date: "Feb 2026", href: "#", type: "info" },
  { id: "notice-4", title: "New Buoyage System — Sandwip Channel", date: "Dec 2025", href: "#", type: "update" },
  { id: "notice-5", title: "Wreck Removal Completed — Karnaphuli River Fairway", date: "Nov 2025", href: "#", type: "info" },
];
