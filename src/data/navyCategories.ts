import { INavyCategory } from "@/src/components/products/types";

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
