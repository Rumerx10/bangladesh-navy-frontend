import { SortOption } from "@/src/components/cart/types/shop";

export const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  { label: "Popularity", value: "popularity" },
  { label: "Newest First", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Avg. Rating", value: "rating" },
];
