import {
  IProduct,
  PRODUCT_CATEGORY_LABELS,
  ProductCategory,
} from "@/src/components/admin/ContentManagement/products/types";

/**
 * Public product search, shared by the products page and the header search so
 * both find the same products. Client-side on purpose: the backend ignores
 * `search`, and the active catalogue is small enough to filter in the browser.
 */

// Extra words each category answers to, so "tide", "tidal" or "enc" find
// products whose names don't contain them.
const CATEGORY_KEYWORDS: Record<ProductCategory, string> = {
  PAPPER_CHART: "paper chart charts nautical",
  ELECTRONIC_NAVIGATIONAL_CHART: "electronic navigational chart charts enc",
  TIDAL: "tidal tide tides table tables",
};

/** Lower-cased words of a query; empty for a blank one. */
export const toSearchTerms = (query: string) =>
  query.trim().toLowerCase().split(/\s+/).filter(Boolean);

const searchableText = (product: IProduct) =>
  [
    product.nameEn,
    product.nameBn,
    product.chartCode,
    product.geographicLocation,
    product.category && PRODUCT_CATEGORY_LABELS[product.category],
    product.category && CATEGORY_KEYWORDS[product.category],
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

/** Every term appears somewhere in the product's text; no terms matches all. */
export const productMatches = (product: IProduct, terms: string[]) => {
  if (terms.length === 0) return true;
  const text = searchableText(product);
  return terms.every((term) => text.includes(term));
};

/**
 * Up to `limit` active products matching every term, best first: an exact
 * chart code, then names starting with the first term, then the rest in
 * catalogue order. Nothing for an empty query.
 */
export const findProducts = (
  products: IProduct[],
  terms: string[],
  limit: number
) => {
  if (terms.length === 0) return [];
  const [first] = terms;
  const rank = (product: IProduct) => {
    if (String(product.chartCode ?? "").toLowerCase() === first) return 0;
    if (product.nameEn.toLowerCase().startsWith(first)) return 1;
    return 2;
  };
  return products
    .filter(
      (product) => product.status === "ACTIVE" && productMatches(product, terms)
    )
    .sort((a, b) => rank(a) - rank(b))
    .slice(0, limit);
};

const escapeRegExp = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * `text` cut into the runs that match a search term (case-insensitive) and
 * the runs between them, for highlighting matches in results.
 */
export const splitByTerms = (text: string, terms: string[]) => {
  if (terms.length === 0) return [{ text, match: false }];
  const pattern = new RegExp(
    `(${[...terms]
      .sort((a, b) => b.length - a.length)
      .map(escapeRegExp)
      .join("|")})`,
    "gi"
  );
  return text
    .split(pattern)
    .map((part, index) => ({ text: part, match: index % 2 === 1 }))
    .filter((part) => part.text !== "");
};
