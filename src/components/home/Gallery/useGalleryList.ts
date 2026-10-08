"use client";

import { useMemo } from "react";
import { useGet } from "@/src/hooks/useGet";
import { IGalleryItem } from "./types";

/** Single source of truth for the public gallery endpoint and cache key. */
export const GALLERY_LIST_ENDPOINT = "/gallery/list";
export const GALLERY_LIST_QUERY_KEY = ["gallery-list"];

/** Display order — lowest `position` first. */
export const byPosition = <T extends { position?: number | null }>(
  a: T,
  b: T
) => (a.position ?? 0) - (b.position ?? 0);

/**
 * Every gallery item, ordered by `position` ascending.
 *
 * `/gallery/list` returns the whole set unpaginated but in *descending*
 * position order (30 → 1), so the home section's first five were the last five
 * images and the about grid read back to front. Ordering here instead of in
 * each component keeps both pages on the same order; the sort runs on a copy so
 * the react-query cache is never mutated in place.
 */
export const useGalleryList = () => {
  const { data, isLoading, isError } = useGet<IGalleryItem[]>(
    GALLERY_LIST_ENDPOINT,
    GALLERY_LIST_QUERY_KEY
  );

  const galleryItems = useMemo(
    () => (Array.isArray(data?.data) ? [...data.data].sort(byPosition) : []),
    [data]
  );

  return { galleryItems, isLoading, isError };
};
