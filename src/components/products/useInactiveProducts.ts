"use client";

import { useMemo } from "react";
import { useGet } from "@/src/hooks/useGet";
import {
  IProduct,
  ProductCategory,
} from "@/src/components/admin/ContentManagement/products/types";

/** Chart codes arrive as "3535", 3535 or "bd5 7453" — compare them in one shape. */
export const normaliseChartCode = (code: string | number | null | undefined) =>
  code === null || code === undefined
    ? ""
    : String(code).toUpperCase().replace(/\s+/g, "");

/**
 * Products an admin has switched to INACTIVE, for the public map pages (paper
 * charts, ENCs, tide tables). Those pages draw their coverage areas and
 * stations from static/linked data, so they hide anything whose product is
 * inactive rather than only showing products that have a record — a chart
 * with no backend record yet still appears as before.
 *
 * Pass a category so a paper chart and an ENC that share a code never hide
 * each other.
 */
export const useInactiveProducts = (category?: ProductCategory) => {
  // No `limit`: the API then returns the whole matching set in one page.
  const { data, isLoading } = useGet<IProduct[]>(
    "/product",
    ["product-inactive"],
    { status: "INACTIVE", sortOrder: "asc", category }
  );

  return useMemo(() => {
    const products = Array.isArray(data?.data) ? data.data : [];
    return {
      isLoading,
      inactiveIds: new Set(products.map((product) => product.id)),
      inactiveCodes: new Set(
        products
          .map((product) => normaliseChartCode(product.chartCode))
          .filter(Boolean)
      ),
    };
  }, [data, isLoading]);
};
