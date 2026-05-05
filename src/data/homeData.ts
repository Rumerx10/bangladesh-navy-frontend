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
  {
    id: "news-1",
    slug: "bnhoc-completes-hydrographic-survey-payra",
    title: "BNHOC Completes Hydrographic Survey of Payra Deep Sea Port Channel",
    description: "Bangladesh Navy Hydrographic and Oceanographic Center has successfully completed an extensive hydrographic survey of the Payra Deep Sea Port Channel.",
    content: [
      "Bangladesh Navy Hydrographic and Oceanographic Center (BNHOC) has successfully completed an extensive hydrographic survey of the Payra Deep Sea Port approach channel, marking a significant milestone in ensuring safe maritime navigation for one of Bangladesh's most critical port infrastructure projects.",
      "The survey, conducted over a period of three months using state-of-the-art multibeam echo sounding equipment, has produced detailed bathymetric charts covering the entire approach channel extending 75 kilometers from the port to the Bay of Bengal.",
      "The newly acquired data will be instrumental in updating existing nautical charts and producing new Electronic Navigational Charts (ENCs) compliant with IHO S-57 standards, ensuring that mariners have access to the most accurate and up-to-date navigational information.",
      "Chief Hydrographer stated that this survey demonstrates BNHOC's commitment to maintaining the highest standards of hydrographic surveying and supports Bangladesh's vision of becoming a regional maritime hub.",
    ],
    date: "Apr 2026",
    image: "/newsImages/news1.jpg",
    category: "Survey",
    href: "/news/bnhoc-completes-hydrographic-survey-payra",
  },
  {
    id: "news-2",
    slug: "international-hydrographic-day-2026",
    title: "International Hydrographic Day 2026: BNHOC Celebrates",
    description: "BNHOC celebrated World Hydrography Day on 21 June with the theme 'Hydrography — Underpinning the Digital Twin of the Ocean.'",
    content: [
      "BNHOC celebrated World Hydrography Day on 21 June 2026 with the theme 'Hydrography — Underpinning the Digital Twin of the Ocean.' The event brought together maritime professionals, academics, and government officials to highlight the critical role of hydrography in modern ocean management.",
      "The celebration featured a seminar on the latest advances in digital hydrography, including the transition to S-100 based products and the development of digital twin technologies for maritime applications.",
      "Distinguished guests from the International Hydrographic Organization (IHO) and regional hydrographic offices participated in panel discussions on collaborative data sharing and capacity building in the Indian Ocean region.",
      "BNHOC also showcased its latest survey equipment and demonstrated the capabilities of its newly upgraded data processing center, which enables near-real-time production of nautical charts and navigational publications.",
    ],
    date: "Jun 2026",
    image: "/newsImages/news2.jpg",
    category: "Events",
    href: "/news/international-hydrographic-day-2026",
  },
  {
    id: "news-3",
    slug: "new-encs-released-bay-of-bengal",
    title: "New Electronic Navigational Charts (ENCs) Released for Bay of Bengal",
    description: "BNHOC has released 12 new Electronic Navigational Charts covering major shipping lanes in the Bay of Bengal.",
    content: [
      "BNHOC has released 12 new Electronic Navigational Charts (ENCs) covering major shipping lanes and port approach areas in the Bay of Bengal. These S-57 compliant charts are now available for download through authorized ENC distributors worldwide.",
      "The new ENCs cover critical navigation areas including the approaches to Chittagong Port, Mongla Port, and the newly developed Payra Deep Sea Port, providing comprehensive coverage for vessels operating in Bangladesh waters.",
      "Each chart has been produced to the highest IHO standards, incorporating the latest hydrographic survey data and including detailed information on depths, aids to navigation, anchorage areas, and submarine cables.",
      "BNHOC plans to release an additional 8 ENCs by the end of the year, completing its program to provide full ENC coverage of all navigable waters of Bangladesh.",
    ],
    date: "Mar 2026",
    image: "/newsImages/news3.jpg",
    category: "Publications",
    href: "/news/new-encs-released-bay-of-bengal",
  },
  {
    id: "news-4",
    slug: "bnhoc-receives-new-survey-launch",
    title: "BNHOC Receives New Hydrographic Survey Launch",
    description: "A new state-of-the-art survey launch has been commissioned to enhance BNHOC's coastal and riverine survey capabilities.",
    content: [
      "A new state-of-the-art hydrographic survey launch has been commissioned and delivered to BNHOC, significantly enhancing the organization's coastal and riverine survey capabilities.",
      "The vessel, equipped with advanced multibeam echo sounding systems, GNSS positioning, and real-time data processing capabilities, will primarily operate in the shallow waters and river systems of Bangladesh.",
      "The addition of this vessel brings BNHOC's operational fleet to four survey platforms, enabling simultaneous survey operations across multiple areas of Bangladesh's extensive coastline and inland waterways.",
    ],
    date: "Feb 2026",
    image: "/newsImages/news4.jpg",
    category: "Fleet",
    href: "/news/bnhoc-receives-new-survey-launch",
  },
  {
    id: "news-5",
    slug: "annual-tide-tables-2027-published",
    title: "Annual Tide Tables for 2027 Now Available",
    description: "BNHOC has published the official tide tables for 2027 covering all major ports and tidal stations in Bangladesh.",
    content: [
      "BNHOC has published the official tide tables for 2027, providing tide predictions for all 12 major ports and 35 secondary tidal stations across Bangladesh's coastline and major river systems.",
      "The tide tables incorporate data from BNHOC's network of permanent tidal observation stations and reflect the latest tidal harmonic constants derived from continuous observations spanning over two decades.",
      "Both print and digital versions are now available for purchase through the BNHOC e-commerce portal and authorized chart agents.",
    ],
    date: "Jan 2026",
    image: "/newsImages/news5.jpg",
    category: "Publications",
    href: "/news/annual-tide-tables-2027-published",
  },
  {
    id: "news-6",
    slug: "bnhoc-iho-capacity-building-workshop",
    title: "BNHOC Hosts IHO Capacity Building Workshop",
    description: "A week-long capacity building workshop organized jointly by BNHOC and IHO trained 25 hydrographers from the region.",
    content: [
      "A week-long capacity building workshop organized jointly by BNHOC and the International Hydrographic Organization (IHO) brought together 25 hydrographers from 8 countries in the Indian Ocean region.",
      "The workshop focused on modern hydrographic survey techniques, S-100 based product specifications, and marine spatial data infrastructure development.",
      "Participants gained hands-on experience with the latest survey technologies and data processing workflows at BNHOC's training center in Chittagong.",
    ],
    date: "Dec 2025",
    image: "/newsImages/news6.jpg",
    category: "Events",
    href: "/news/bnhoc-iho-capacity-building-workshop",
  },
];

export const noticeItems: INoticeItem[] = [
  { id: "notice-1", title: "Temporary Obstruction — Chittagong Port Outer Anchorage", date: "Mar 2026", href: "#", type: "warning" },
  { id: "notice-2", title: "Light Characteristics Change — Kutubdia Lighthouse", date: "Feb 2026", href: "#", type: "update" },
  { id: "notice-3", title: "Updated Depths Information — Mongla Port Approach", date: "Feb 2026", href: "#", type: "info" },
  { id: "notice-4", title: "New Buoyage System — Sandwip Channel", date: "Dec 2025", href: "#", type: "update" },
  { id: "notice-5", title: "Wreck Removal Completed — Karnaphuli River Fairway", date: "Nov 2025", href: "#", type: "info" },
];
