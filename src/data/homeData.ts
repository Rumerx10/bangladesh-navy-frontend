import type {
  IChiefMessage,
  IHeroSlide,
  INoticeItem,
  IQuickAccessItem,
  ISearchTab,
  IStatItem,
} from "@/src/components/types";

export const heroSlides: IHeroSlide[] = [
  {
    id: 1,
    subtitle: "Official E-commerce Portal",
    title: "Bangladesh Navy",
    highlightTitle: "Hydrographic & Oceanographic Center",
    description:
      "Charting the waters of Bangladesh for safe maritime navigation. Access official nautical charts, tide tables, and navigational publications.",
    buttons: [
      {
        text: "Browse Charts",
        href: "/product-service",
        variant: "primary",
        icon: "compass",
      },
      {
        text: "Latest Notices",
        href: "#latest-notices",
        variant: "secondary",
        icon: "bell",
      },
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
      {
        text: "View Products",
        href: "/product-service",
        variant: "primary",
        icon: "map",
      },
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
      {
        text: "Explore ENCs",
        href: "/product-service?category=electronic-charts",
        variant: "primary",
        icon: "monitor",
      },
      {
        text: "Learn More",
        href: "/about/history",
        variant: "secondary",
        icon: "book",
      },
    ],
  },
];

export const searchTabs: ISearchTab[] = [
  { id: "all", label: "All" },
  { id: "charts", label: "Charts" },
  { id: "tides", label: "Tides" },
  { id: "notices", label: "Notices" },
  { id: "publication", label: "Publication" },
];

export const quickAccessItems: IQuickAccessItem[] = [
  {
    id: "qa-1",
    title: "Paper Charts",
    description: "Official nautical charts for Bangladesh waters",
    icon: "map",
    href: "/product-service/paper-charts",
  },
  {
    id: "qa-2",
    title: "Electronic Charts",
    description: "ENC & ECDIS compatible digital charts",
    icon: "monitor",
    href: "/product-service/electronic-charts",
  },
  {
    id: "qa-3",
    title: "Tide Tables",
    description: "Annual tide prediction tables",
    icon: "waves",
    href: "/product-service/tide-tables",
  },
  {
    id: "qa-4",
    title: "Notices to Mariners",
    description: "Navigation warnings & corrections",
    icon: "alert-triangle",
    href: "/product-service/notices-to-mariners",
  },
  {
    id: "qa-6",
    title: "Marine Weather",
    description: "Weather data & forecasting",
    icon: "cloud-sun",
    href: "/product-service/marine-weather",
  },
];

export const statsItems: IStatItem[] = [
  { id: "stat-1", value: 150, suffix: "+", label: "Nautical Charts" },
  { id: "stat-2", value: 3, suffix: "", label: "Survey Ships" },
  { id: "stat-3", value: 50, suffix: "+", label: "Publications" },
  { id: "stat-4", value: 500, suffix: "+", label: "Trained Personnel" },
];

export const chiefMessage: IChiefMessage = {
  title: "MESSAGE FROM BN CHIEF HYDROGRAPHER",
  content: [
    "Cdre Sheikh Firoz Ahmed, (H), NGP, psc, BN joined Bangladesh Navy as Officer Cadet on 01 July 1992 and got commissioned in the Executive Branch of Bangladesh Navy on 01 Jan 1995. Thereafter, he started his career as a hydrographic surveyor. Presently, he is appointed as Bangladesh Navy Chief Hydrographer.",
    " Cdre Sheikh Firoz Ahmed  has received extensive professional training in Hydrography and naval operations both from home and abroad. He obtained basic Hydrographic Course from BN Hydrography School and completed Category-B Hydrography Course from EPSHOM, France. He also completed Long Hydrography Course (Category-A) from National Hydrography School, India and MSc in Hydrography from Goa University, India. He is a distinguished graduate of Defence Services Command & Staff College, Mirpur and has done MBA and MSc in Defence Studies from Bangladesh University of Professionals. During his long 32 years of illustrious career, Cdre held many command, staff and instructional appointments in the Naval Headquarters as well as in the Area and Unit levels. He served as Staff Officer (Hydrography), Deputy Director & Director of Hydrography at Naval Headquarters. He commanded various BN ships namely BNS DARSHAK, BNS TALLASHI, BNS AGRADOOT, BNS SHAIBAL, BNS ANUSHANDHAN. He also commanded Bangladesh Navy Hydrographic & Oceanographic Center. Prior taking over the duties of BN Chief Hydrographer, he successfully performed the duties of Registrar of Bangladesh Maritime University. Cdre Sheikh Firoz Ahmed's experience in international arena is remarkable. He performed the duties of IHO observer in Advisory Board on Law of the Sea (ABLOS). He represented Bangladesh in various international forums like North Indian Ocean Hydrographic Commission (NIOHC), IHO Conference, International Board on Standards of Competence for Hydrographic Surveyors and Nautical Cartographers (IBSC) etc. He served in UN peace keeping mission in South Sudan as Commanding Officer of Bangladesh Navy Forces Marine Unit (BANFMU) and received the Force Commander’s Commendation for his outstanding performance in the mission area. He also served in DR Congo (MONUC) as Interpreter (French language) of BANBAT 1. Cdre Sheikh Firoz Ahmed is happily married and blessed with one son and two daughters.",
  ],
  name: "Cdre Sheikh Firoz Ahmed, (H), NGP, psc, BN",
  designation: "BN Chief Hydrographer",
  initials: "FA",
};

export const noticeItems: INoticeItem[] = [
  {
    id: "notice-1",
    title: "Temporary Obstruction — Chittagong Port Outer Anchorage",
    date: "Mar 2026",
    href: "#",
    type: "warning",
  },
  {
    id: "notice-2",
    title: "Light Characteristics Change — Kutubdia Lighthouse",
    date: "Feb 2026",
    href: "#",
    type: "update",
  },
  {
    id: "notice-3",
    title: "Updated Depths Information — Mongla Port Approach",
    date: "Feb 2026",
    href: "#",
    type: "info",
  },
  {
    id: "notice-4",
    title: "New Buoyage System — Sandwip Channel",
    date: "Dec 2025",
    href: "#",
    type: "update",
  },
  {
    id: "notice-5",
    title: "Wreck Removal Completed — Karnaphuli River Fairway",
    date: "Nov 2025",
    href: "#",
    type: "info",
  },
];
