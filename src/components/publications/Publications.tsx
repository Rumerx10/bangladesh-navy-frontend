"use client";

import { useState } from "react";
import { FileSearch, Search } from "lucide-react";
import { useGet } from "@/src/hooks/useGet";
import { useSearchDebounce } from "@/src/hooks/useSearchDebounce";
import Pagination from "@/src/components/shared/Pagination";
import { IPublication } from "@/src/components/admin/ContentManagement/publications/types";
import PublicationCard from "./PublicationCard";
import PublicationsHero from "./PublicationsHero";
import PublicationListSkeleton from "./Skeleton/PublicationListSkeleton";

const PAGE_SIZE = 8;

const Publications = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { search, handleSearchChange, debouncedSearch } =
    useSearchDebounce(300);

  const { data, isLoading } = useGet<IPublication[]>(
    "/publication",
    ["publication-public", currentPage.toString(), debouncedSearch],
    {
      page: currentPage.toString(),
      limit: PAGE_SIZE.toString(),
      search: debouncedSearch,
      status: "ACTIVE",
    }
  );

  const visible = Array.isArray(data?.data) ? data.data : [];
  const totalItems = data?.meta?.totalItems || 0;
  const totalPages = Math.max(1, data?.meta?.totalPages || 1);

  // A narrower result set can have fewer pages than the one currently
  // shown, so every search keystroke jumps back to page 1.
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPage(1);
    handleSearchChange(event);
  };

  return (
    <div className="bg-white">
      <PublicationsHero />

      <section className="py-10 lg:py-14">
        <div className="container px-4 sm:px-6 lg:px-8">
          {/* Search */}
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-end">
            <div className="relative w-full lg:max-w-xs">
              <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={handleSearch}
                placeholder="Search by title or publication code…"
                aria-label="Search publications"
                className="h-11 w-full rounded-lg border border-gray-200 bg-white pr-3 pl-9 text-sm text-gray-800 outline-none placeholder:text-gray-400 focus:border-pBlue focus:ring-2 focus:ring-pBlue/20"
              />
            </div>
          </div>

          {/* List */}
          <div className="mt-8">
            {isLoading ? (
              <PublicationListSkeleton />
            ) : visible.length > 0 ? (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {visible.map((publication) => (
                  <PublicationCard
                    key={publication.id}
                    publication={publication}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 py-16 text-center">
                <FileSearch className="mx-auto h-8 w-8 text-gray-400" />
                <p className="mt-3 text-sm font-medium text-gray-600">
                  No publications found
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  Try a different search term.
                </p>
              </div>
            )}
          </div>

          {!isLoading && totalPages > 1 && (
            <div className="mt-6 rounded-xl border border-gray-200">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(nextPage) => {
                  setCurrentPage(nextPage);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                itemsPerPage={PAGE_SIZE}
                totalItems={totalItems}
              />
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Publications;
