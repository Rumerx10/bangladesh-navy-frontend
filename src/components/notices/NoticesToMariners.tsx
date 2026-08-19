"use client";

import { useMemo, useState } from "react";
import { FileSearch, Search } from "lucide-react";
import NoticeCard from "./NoticeCard";
import NoticesHero from "./NoticesHero";
import NoticeTypeFilter from "./NoticeTypeFilter";
import NoticeListSkeleton from "./Skeleton/NoticeListSkeleton";
import { filterNotices, useNotices } from "./useNotices";
import { NOTICE_FILTER_OPTIONS, NoticeFilterValue, NoticeType } from "./types";

const NoticesToMariners = () => {
  const [type, setType] = useState<NoticeFilterValue>("ALL");
  const [search, setSearch] = useState("");
  const { notices, isLoading } = useNotices();

  // Only published notices reach the public page; drafts stay in the admin.
  const published = useMemo(
    () => notices.filter((notice) => notice.status === "ACTIVE"),
    [notices]
  );

  const counts = useMemo(() => {
    const totals = Object.fromEntries(
      NOTICE_FILTER_OPTIONS.map((option) => [option.value, 0])
    ) as Record<NoticeFilterValue, number>;
    totals.ALL = published.length;
    for (const notice of published) {
      totals[notice.type as NoticeType] += 1;
    }
    return totals;
  }, [published]);

  const visible = useMemo(
    () => filterNotices(published, { type, search }),
    [published, type, search]
  );

  return (
    <div className="bg-white">
      <NoticesHero />

      <section className="py-10 lg:py-14">
        <div className="container px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <NoticeTypeFilter value={type} onChange={setType} counts={counts} />

            <div className="relative w-full lg:max-w-xs">
              <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by title or notice number…"
                aria-label="Search notices"
                className="h-11 w-full rounded-lg border border-gray-200 bg-white pr-3 pl-9 text-sm text-gray-800 outline-none placeholder:text-gray-400 focus:border-pBlue focus:ring-2 focus:ring-pBlue/20"
              />
            </div>
          </div>

          {/* List */}
          <div className="mt-8">
            {isLoading ? (
              <NoticeListSkeleton />
            ) : visible.length > 0 ? (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {visible.map((notice) => (
                  <NoticeCard key={notice.id} notice={notice} />
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 py-16 text-center">
                <FileSearch className="mx-auto h-8 w-8 text-gray-400" />
                <p className="mt-3 text-sm font-medium text-gray-600">
                  No notices found
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  Try a different category or clear the search.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default NoticesToMariners;
