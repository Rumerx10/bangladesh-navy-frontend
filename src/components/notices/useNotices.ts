"use client";

import { useMemo } from "react";
import { useGet } from "@/src/hooks/useGet";
import { INotice, NoticeFilterValue } from "./types";
// ⚠️ DEMO ONLY — see the marked block below.
import { DEMO_NOTICES } from "./data/demoNotices";

/** Single source of truth for the endpoint and cache key. */
export const NOTICES_ENDPOINT = "/notices";
export const NOTICES_QUERY_KEY = ["notices"];

/**
 * Type + text filtering runs client-side so it behaves identically on the demo
 * fixtures and on API data. Once `/notices` supports `type` and `search` query
 * params these can move into the request; nothing else has to change.
 */
export const filterNotices = (
  notices: INotice[],
  { type = "ALL", search = "" }: { type?: NoticeFilterValue; search?: string }
) => {
  const query = search.trim().toLowerCase();
  return notices.filter((notice) => {
    if (type !== "ALL" && notice.type !== type) return false;
    if (!query) return true;
    return (
      notice.titleEn?.toLowerCase().includes(query) ||
      notice.titleBn?.toLowerCase().includes(query) ||
      notice.noticeNumber?.toLowerCase().includes(query)
    );
  });
};

/** Newest first — the order mariners expect in a notice list. */
const byNewest = (a: INotice, b: INotice) =>
  new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();

/**
 * Loads every notice. The list is small enough that the whole set is fetched
 * once and filtered/paginated in the browser, which keeps the public page and
 * the admin table on exactly the same data.
 */
export const useNotices = () => {
  const { data, isLoading, isError } = useGet<INotice[]>(
    NOTICES_ENDPOINT,
    NOTICES_QUERY_KEY
  );

  const apiNotices = useMemo(
    () => (Array.isArray(data?.data) ? data.data : []),
    [data]
  );

  // ─── DEMO DATA ────────────────────────────────────────────────────────────
  // Until `/notices` is live the UI runs on fixtures. To go live: delete
  // src/components/notices/data/demoNotices.ts, its import above, and this
  // block — then use `apiNotices` directly in the `notices` memo below.
  const isUsingDemoData = !isLoading && apiNotices.length === 0;
  const source = isUsingDemoData ? DEMO_NOTICES : apiNotices;
  // ─── END DEMO DATA ────────────────────────────────────────────────────────

  const notices = useMemo(() => [...source].sort(byNewest), [source]);

  return { notices, isLoading, isError, isUsingDemoData };
};
