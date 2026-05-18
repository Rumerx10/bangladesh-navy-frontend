import {
  DiscountType,
  INavyProduct,
  ProductStatus,
} from "@/src/components/products/types";
import { navyCategories } from "./navyCategories";

const cat = (slug: string) =>
  navyCategories.find((c) => c.slug === slug) ?? navyCategories[0];

export const navyProducts: INavyProduct[] = [
  {
    id: "prod-001",
    nameBn: "কক্সবাজার রুট নটিক্যাল চার্ট",
    nameEn: "Cox's Bazar Route Nautical Chart",
    images: ["/img2.tif"],
    descriptionBn:
      "কক্সবাজার সমুদ্র রুটের বিস্তারিত নটিক্যাল চার্ট। সকল নৌ-চলাচলের জন্য অপরিহার্য।",
    descriptionEn:
      "Detailed nautical chart covering the Cox's Bazar sea route. Essential for all maritime navigation in the southeastern coastal waters of Bangladesh.",
    price: 250000, // 2500 BDT in poysha
    discountType: DiscountType.PERCENTAGE,
    discountValue: 10,
    stock: 50,
    categoryId: "cat-1",
    status: ProductStatus.ACTIVE,
    createdAt: "2025-01-15T00:00:00Z",
    updatedAt: "2025-04-20T00:00:00Z",
    category: cat("paper-charts"),
    productAttributes: [
      { id: "attr-001", productId: "prod-001", key: "Scale", value: "1:50,000", createdAt: "", updatedAt: "" },
      { id: "attr-002", productId: "prod-001", key: "Coverage Area", value: "Cox's Bazar to Teknaf", createdAt: "", updatedAt: "" },
      { id: "attr-003", productId: "prod-001", key: "Edition", value: "2025 (3rd Edition)", createdAt: "", updatedAt: "" },
      { id: "attr-004", productId: "prod-001", key: "Paper Size", value: "A0 (841 × 1189 mm)", createdAt: "", updatedAt: "" },
    ],
  },
  {
    id: "prod-002",
    nameBn: "সেন্টমার্টিন রুট নটিক্যাল চার্ট",
    nameEn: "Saint Martin Route Nautical Chart",
    images: ["/img2.tif"],
    descriptionBn:
      "সেন্টমার্টিন দ্বীপ এবং আশেপাশের সমুদ্র রুটের নটিক্যাল চার্ট।",
    descriptionEn:
      "Nautical chart for Saint Martin Island and surrounding sea routes. Covers reef areas and safe navigation channels.",
    price: 300000,
    stock: 35,
    categoryId: "cat-1",
    status: ProductStatus.ACTIVE,
    createdAt: "2025-02-10T00:00:00Z",
    updatedAt: "2025-04-18T00:00:00Z",
    category: cat("paper-charts"),
    productAttributes: [
      { id: "attr-005", productId: "prod-002", key: "Scale", value: "1:25,000", createdAt: "", updatedAt: "" },
      { id: "attr-006", productId: "prod-002", key: "Coverage Area", value: "Teknaf to Saint Martin", createdAt: "", updatedAt: "" },
      { id: "attr-007", productId: "prod-002", key: "Edition", value: "2025 (2nd Edition)", createdAt: "", updatedAt: "" },
    ],
  },
  {
    id: "prod-003",
    nameBn: "চট্টগ্রাম রুট নটিক্যাল চার্ট",
    nameEn: "Chittagong Route Nautical Chart",
    images: ["/img1.jpeg"],
    descriptionBn:
      "চট্টগ্রাম বন্দর এবং সমুদ্র রুটের বিস্তারিত নটিক্যাল চার্ট।",
    descriptionEn:
      "Comprehensive nautical chart covering Chittagong Port approach and coastal navigation routes. Includes port layout and anchorage details.",
    price: 350000,
    discountType: DiscountType.FLAT,
    discountValue: 500,
    stock: 40,
    categoryId: "cat-1",
    status: ProductStatus.ACTIVE,
    createdAt: "2025-01-20T00:00:00Z",
    updatedAt: "2025-04-15T00:00:00Z",
    category: cat("paper-charts"),
    productAttributes: [
      { id: "attr-008", productId: "prod-003", key: "Scale", value: "1:75,000", createdAt: "", updatedAt: "" },
      { id: "attr-009", productId: "prod-003", key: "Coverage Area", value: "Chittagong Port & Approaches", createdAt: "", updatedAt: "" },
      { id: "attr-010", productId: "prod-003", key: "Edition", value: "2025 (5th Edition)", createdAt: "", updatedAt: "" },
    ],
  },
  {
    id: "prod-004",
    nameBn: "মংলা বন্দর রুট নটিক্যাল চার্ট",
    nameEn: "Mongla Port Route Nautical Chart",
    images: ["/img1.jpeg"],
    descriptionBn: "মংলা বন্দর রুটের নটিক্যাল চার্ট, পশুর নদী চ্যানেল সহ।",
    descriptionEn:
      "Nautical chart for Mongla Port route including Pashur River channel navigation. Essential for cargo vessels approaching Mongla.",
    price: 280000,
    stock: 25,
    categoryId: "cat-1",
    status: ProductStatus.ACTIVE,
    createdAt: "2025-03-05T00:00:00Z",
    updatedAt: "2025-04-22T00:00:00Z",
    category: cat("paper-charts"),
    productAttributes: [
      { id: "attr-011", productId: "prod-004", key: "Scale", value: "1:50,000", createdAt: "", updatedAt: "" },
      { id: "attr-012", productId: "prod-004", key: "Coverage Area", value: "Mongla Port & Pashur River", createdAt: "", updatedAt: "" },
    ],
  },
  {
    id: "prod-005",
    nameBn: "পায়রা বন্দর রুট নটিক্যাল চার্ট",
    nameEn: "Payra Port Route Nautical Chart",
    images: ["/img1.jpeg"],
    descriptionBn: "পায়রা গভীর সমুদ্র বন্দর এবং রুটের নটিক্যাল চার্ট।",
    descriptionEn:
      "Nautical chart for Payra Deep Sea Port approach and route. Includes channel depths and navigation aids.",
    price: 320000,
    discountType: DiscountType.PERCENTAGE,
    discountValue: 15,
    stock: 30,
    categoryId: "cat-1",
    status: ProductStatus.ACTIVE,
    createdAt: "2025-02-28T00:00:00Z",
    updatedAt: "2025-04-10T00:00:00Z",
    category: cat("paper-charts"),
    productAttributes: [
      { id: "attr-013", productId: "prod-005", key: "Scale", value: "1:60,000", createdAt: "", updatedAt: "" },
      { id: "attr-014", productId: "prod-005", key: "Coverage Area", value: "Payra Port & Approaches", createdAt: "", updatedAt: "" },
    ],
  },
  {
    id: "prod-006",
    nameBn: "সন্দ্বীপ চ্যানেল নটিক্যাল চার্ট",
    nameEn: "Sandwip Channel Nautical Chart",
    images: ["/img1.jpeg"],
    descriptionBn: "সন্দ্বীপ চ্যানেল এবং আশেপাশের জলপথের চার্ট।",
    descriptionEn:
      "Detailed chart of Sandwip Channel and surrounding waterways. Critical for inland and coastal vessel traffic.",
    price: 220000,
    stock: 20,
    categoryId: "cat-1",
    status: ProductStatus.ACTIVE,
    createdAt: "2025-03-15T00:00:00Z",
    updatedAt: "2025-04-25T00:00:00Z",
    category: cat("paper-charts"),
    productAttributes: [
      { id: "attr-015", productId: "prod-006", key: "Scale", value: "1:30,000", createdAt: "", updatedAt: "" },
      { id: "attr-016", productId: "prod-006", key: "Coverage Area", value: "Sandwip Channel", createdAt: "", updatedAt: "" },
    ],
  },
  // Electronic Charts
  {
    id: "prod-007",
    nameBn: "বাংলাদেশ ENC সম্পূর্ণ প্যাকেজ",
    nameEn: "Bangladesh ENC Complete Package",
    images: ["/img1.jpeg"],
    descriptionBn:
      "বাংলাদেশের সম্পূর্ণ ইলেকট্রনিক নেভিগেশনাল চার্ট প্যাকেজ।",
    descriptionEn:
      "Complete Electronic Navigational Chart package covering all Bangladesh waters. S-57 compliant, ECDIS compatible.",
    price: 1500000,
    discountType: DiscountType.PERCENTAGE,
    discountValue: 20,
    stock: 100,
    categoryId: "cat-2",
    status: ProductStatus.ACTIVE,
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-04-28T00:00:00Z",
    category: cat("electronic-charts"),
    productAttributes: [
      { id: "attr-017", productId: "prod-007", key: "Format", value: "S-57 ENC", createdAt: "", updatedAt: "" },
      { id: "attr-018", productId: "prod-007", key: "Coverage", value: "All Bangladesh Waters", createdAt: "", updatedAt: "" },
      { id: "attr-019", productId: "prod-007", key: "Update Frequency", value: "Monthly", createdAt: "", updatedAt: "" },
      { id: "attr-020", productId: "prod-007", key: "License", value: "1 Year / 1 Vessel", createdAt: "", updatedAt: "" },
    ],
  },
  {
    id: "prod-008",
    nameBn: "চট্টগ্রাম পোর্ট ENC",
    nameEn: "Chittagong Port Approach ENC",
    images: ["/img2.tif"],
    descriptionBn: "চট্টগ্রাম বন্দরের ইলেকট্রনিক নেভিগেশনাল চার্ট।",
    descriptionEn:
      "Electronic Navigational Chart for Chittagong Port approach. High-resolution harbour-level chart with real-time update capability.",
    price: 450000,
    stock: 80,
    categoryId: "cat-2",
    status: ProductStatus.ACTIVE,
    createdAt: "2025-02-15T00:00:00Z",
    updatedAt: "2025-04-20T00:00:00Z",
    category: cat("electronic-charts"),
    productAttributes: [
      { id: "attr-021", productId: "prod-008", key: "Format", value: "S-57 ENC", createdAt: "", updatedAt: "" },
      { id: "attr-022", productId: "prod-008", key: "Scale Band", value: "Harbour (HB)", createdAt: "", updatedAt: "" },
    ],
  },
  // Tide Tables
  {
    id: "prod-009",
    nameBn: "বাংলাদেশ জোয়ার-ভাটা সারণি ২০২৬",
    nameEn: "Bangladesh Tide Table 2026",
    images: ["/img1.jpeg"],
    descriptionBn: "২০২৬ সালের বাংলাদেশের সম্পূর্ণ জোয়ার-ভাটা সারণি।",
    descriptionEn:
      "Complete tide prediction tables for Bangladesh ports and coastal stations for the year 2026. Includes secondary port corrections.",
    price: 1000,
    stock: 200,
    categoryId: "cat-3",
    status: ProductStatus.ACTIVE,
    createdAt: "2025-11-01T00:00:00Z",
    updatedAt: "2025-12-15T00:00:00Z",
    category: cat("tide-tables"),
    productAttributes: [
      { id: "attr-023", productId: "prod-009", key: "Year", value: "2026", createdAt: "", updatedAt: "" },
      { id: "attr-024", productId: "prod-009", key: "Stations", value: "15 Primary + 45 Secondary", createdAt: "", updatedAt: "" },
      { id: "attr-025", productId: "prod-009", key: "Format", value: "Printed Book (A4)", createdAt: "", updatedAt: "" },
    ],
  },
  // Notices to Mariners
  {
    id: "prod-010",
    nameBn: "নাবিকদের জন্য বিজ্ঞপ্তি - সংকলন ২০২৬",
    nameEn: "Notices to Mariners — Compilation 2026",
    images: ["/img1.jpeg"],
    descriptionBn: "২০২৬ সালের নাবিকদের জন্য সকল বিজ্ঞপ্তির সংকলন।",
    descriptionEn:
      "Annual compilation of all Notices to Mariners issued for Bangladesh waters in 2026. Includes chart corrections and navigational warnings.",
    price: 1000,
    stock: 150,
    categoryId: "cat-4",
    status: ProductStatus.ACTIVE,
    createdAt: "2026-01-10T00:00:00Z",
    updatedAt: "2026-04-30T00:00:00Z",
    category: cat("notices-to-mariners"),
    productAttributes: [
      { id: "attr-026", productId: "prod-010", key: "Year", value: "2026", createdAt: "", updatedAt: "" },
      { id: "attr-027", productId: "prod-010", key: "Issues Included", value: "Q1–Q2 2026", createdAt: "", updatedAt: "" },
    ],
  },
  // Publications
  {
    id: "prod-011",
    nameBn: "বাংলাদেশ নৌচলাচল নির্দেশিকা",
    nameEn: "Bangladesh Sailing Directions",
    images: ["/img2.tif"],
    descriptionBn:
      "বাংলাদেশের জলসীমায় নৌচলাচলের জন্য ব্যাপক নির্দেশিকা।",
    descriptionEn:
      "Comprehensive sailing directions for navigating Bangladesh waters. Includes port information, pilotage details, and coastal descriptions.",
    price: 1000,
    stock: 60,
    categoryId: "cat-5",
    status: ProductStatus.ACTIVE,
    createdAt: "2025-06-01T00:00:00Z",
    updatedAt: "2025-12-20T00:00:00Z",
    category: cat("publications"),
    productAttributes: [
      { id: "attr-028", productId: "prod-011", key: "Pages", value: "420", createdAt: "", updatedAt: "" },
      { id: "attr-029", productId: "prod-011", key: "Language", value: "English & Bangla", createdAt: "", updatedAt: "" },
    ],
  },
  {
    id: "prod-012",
    nameBn: "কর্ণফুলী নদী ফেয়ারওয়ে চার্ট",
    nameEn: "Karnaphuli River Fairway Chart",
    images: ["/img2.tif"],
    descriptionBn: "কর্ণফুলী নদী ফেয়ারওয়ের বিস্তারিত চার্ট।",
    descriptionEn:
      "Detailed fairway chart of Karnaphuli River from estuary to upstream berthing areas. Critical for port-bound vessel navigation.",
    price: 1000,
    stock: 45,
    categoryId: "cat-1",
    status: ProductStatus.ACTIVE,
    createdAt: "2025-04-10T00:00:00Z",
    updatedAt: "2025-04-28T00:00:00Z",
    category: cat("paper-charts"),
    productAttributes: [
      { id: "attr-030", productId: "prod-012", key: "Scale", value: "1:10,000", createdAt: "", updatedAt: "" },
      { id: "attr-031", productId: "prod-012", key: "Coverage Area", value: "Karnaphuli River Fairway", createdAt: "", updatedAt: "" },
    ],
  },
];

/**
 * Utility: compute the discounted price in poysha.
 */
export function getDiscountedPrice(product: INavyProduct): number {
  if (!product.discountType || !product.discountValue) return product.price;
  if (product.discountType === DiscountType.PERCENTAGE) {
    return Math.round(
      product.price * (1 - product.discountValue / 100)
    );
  }
  // FLAT discount: discountValue is in BDT, price is in poysha
  return Math.max(0, product.price - product.discountValue * 100);
}

/**
 * Utility: format poysha to BDT string.
 */
export function formatPrice(poysha: number): string {
  return `৳${(poysha / 100).toLocaleString("en-BD")}`;
}

/**
 * Utility: find product by id.
 */
export function findProductById(id: string): INavyProduct | undefined {
  return navyProducts.find((p) => p.id === id);
}

/**
 * Utility: generate a slug from the English name.
 */
export function getProductSlug(product: INavyProduct): string {
  return product.nameEn
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/**
 * Utility: find product by slug.
 */
export function findProductBySlug(slug: string): INavyProduct | undefined {
  return navyProducts.find((p) => getProductSlug(p) === slug);
}
