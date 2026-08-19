"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ChevronsDownUp,
  ChevronsUpDown,
  Search,
  UsersRound,
} from "lucide-react";
import AlumniBatchCard from "./AlumniBatchCard";
import AlumniCourseFilter from "./AlumniCourseFilter";
import AlumniHero from "./AlumniHero";
import AlumniListSkeleton from "./Skeleton/AlumniListSkeleton";
import {
  filterAlumniBatches,
  useAlumniBatches,
  useAlumniCourses,
} from "./useAlumni";
import { batchYear } from "./utils";

const AlumniDirectory = () => {
  const [courseId, setCourseId] = useState("ALL");
  const [search, setSearch] = useState("");
  const [openIds, setOpenIds] = useState<string[]>([]);
  const didAutoOpen = useRef(false);

  const { batches, isLoading } = useAlumniBatches();
  const { courses } = useAlumniCourses();

  // Only published batches reach the public page; drafts stay in the admin.
  const published = useMemo(
    () => batches.filter((batch) => batch.status === "ACTIVE"),
    [batches]
  );

  const counts = useMemo(() => {
    const totals: Record<string, number> = { ALL: published.length };
    for (const course of courses) totals[course.id] = 0;
    for (const batch of published) {
      const id = batch.alumniCourse?.id ?? batch.alumniCourseId;
      if (id) totals[id] = (totals[id] ?? 0) + 1;
    }
    return totals;
  }, [published, courses]);

  const visible = useMemo(
    () => filterAlumniBatches(published, { courseId, search }),
    [published, courseId, search]
  );

  const totalAlumni = useMemo(
    () => published.reduce((sum, batch) => sum + batch.members.length, 0),
    [published]
  );

  const yearsSpan = useMemo(() => {
    const years = published
      .map(batchYear)
      .filter((year): year is number => year !== null);
    if (years.length === 0) return null;
    const from = Math.min(...years);
    const to = Math.max(...years);
    return from === to ? String(from) : `${from} – ${to}`;
  }, [published]);

  // A search should land the reader on the matching row, not on a wall of
  // collapsed headers, so every hit opens while a query is active.
  const isSearching = search.trim().length > 0;

  useEffect(() => {
    if (!didAutoOpen.current && visible.length > 0) {
      didAutoOpen.current = true;
      setOpenIds([visible[0].id]);
    }
  }, [visible]);

  const toggleBatch = (id: string) =>
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );

  const allOpen = visible.length > 0 && openIds.length >= visible.length;

  return (
    <div className="bg-white">
      <AlumniHero
        totalBatches={published.length}
        totalAlumni={totalAlumni}
        yearsSpan={yearsSpan}
      />

      <section className="py-10 lg:py-14">
        <div className="container px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <AlumniCourseFilter
              courses={courses}
              value={courseId}
              onChange={setCourseId}
              counts={counts}
            />

            <div className="flex items-center gap-2">
              <div className="relative w-full lg:w-72">
                <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search by name, P. No or batch…"
                  aria-label="Search alumni"
                  className="h-11 w-full rounded-lg border border-gray-200 bg-white pr-3 pl-9 text-sm text-gray-800 outline-none placeholder:text-gray-400 focus:border-pBlue focus:ring-2 focus:ring-pBlue/20"
                />
              </div>

              <button
                type="button"
                onClick={() =>
                  setOpenIds(allOpen ? [] : visible.map((batch) => batch.id))
                }
                disabled={visible.length === 0}
                className="hidden h-11 shrink-0 cursor-pointer items-center gap-2 rounded-lg border border-gray-200 px-4 text-sm font-semibold text-gray-600 transition-colors hover:border-pBlue/40 hover:text-pBlue disabled:cursor-not-allowed disabled:opacity-50 lg:inline-flex"
              >
                {allOpen ? (
                  <ChevronsDownUp className="h-4 w-4" />
                ) : (
                  <ChevronsUpDown className="h-4 w-4" />
                )}
                {allOpen ? "Collapse all" : "Expand all"}
              </button>
            </div>
          </div>

          {/* Result count */}
          {!isLoading && visible.length > 0 && (
            <p className="mt-6 text-sm text-gray-500">
              Showing{" "}
              <span className="font-semibold text-gray-700">
                {visible.length}
              </span>{" "}
              {visible.length === 1 ? "batch" : "batches"}
              {isSearching && (
                <>
                  {" "}
                  matching{" "}
                  <span className="font-semibold text-gray-700">
                    “{search.trim()}”
                  </span>
                </>
              )}
            </p>
          )}

          {/* List */}
          <div className="mt-4">
            {isLoading ? (
              <AlumniListSkeleton />
            ) : visible.length > 0 ? (
              <div className="space-y-4">
                {visible.map((batch) => (
                  <AlumniBatchCard
                    key={batch.id}
                    batch={batch}
                    isOpen={isSearching || openIds.includes(batch.id)}
                    onToggle={() => toggleBatch(batch.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 py-16 text-center">
                <UsersRound className="mx-auto h-8 w-8 text-gray-400" />
                <p className="mt-3 text-sm font-medium text-gray-600">
                  No alumni found
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  Try a different course or clear the search.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AlumniDirectory;
