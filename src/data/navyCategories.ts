import { INavyCategory } from "@/src/types/product";

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
    nameEn: "Electronic Charts",
    slug: "electronic-charts",
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
    id: "cat-4",
    nameBn: "নাবিকদের জন্য বিজ্ঞপ্তি",
    nameEn: "Notices to Mariners",
    slug: "notices-to-mariners",
    description: "Navigation warnings & corrections",
    productCount: 28,
  },
  {
    id: "cat-5",
    nameBn: "প্রকাশনা",
    nameEn: "Publications",
    slug: "publications",
    description: "Sailing directions & maritime guides",
    productCount: 18,
  },
  {
    id: "cat-6",
    nameBn: "সামুদ্রিক আবহাওয়া",
    nameEn: "Marine Weather",
    slug: "marine-weather",
    description: "Weather data & forecasting services",
    productCount: 8,
  },
];
