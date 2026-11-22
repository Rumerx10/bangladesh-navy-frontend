"use client";

import { useGet } from "@/src/hooks/useGet";
import { IQuerySuggestion } from "@/src/components/admin/contact/query-suggestion/types";

/**
 * Count of PENDING queries & suggestions, shown beside the sidebar link.
 * The query key shares the list page's "query-suggestion-management" prefix,
 * so updating a status there (which invalidates that prefix) refreshes it.
 */
const PendingQueryBadge = () => {
  const { data } = useGet<IQuerySuggestion[]>(
    "/contact",
    ["query-suggestion-management", "pending-count"],
    {
      page: "1",
      limit: "1",
      contactType: "QUERY_SUGGESTION",
      status: "PENDING",
    }
  );

  const count = data?.meta?.totalItems ?? 0;
  if (count <= 0) return null;

  return (
    <span
      className="ml-auto inline-flex min-w-5 h-5 shrink-0 items-center justify-center rounded-full bg-rose-500 px-1.5 text-[11px] font-semibold leading-none text-white tabular-nums"
      aria-label={`${count} pending`}
    >
      {count > 99 ? "99+" : count}
    </span>
  );
};

export default PendingQueryBadge;
