"use client";

import { useMemo } from "react";
import { useGet } from "@/src/hooks/useGet";
import { IAlumniBatch, IAlumniCourse } from "./types";
// ⚠️ DEMO ONLY — see the marked blocks below.
import { DEMO_ALUMNI_BATCHES, DEMO_ALUMNI_COURSES } from "./data/demoAlumni";

/** Single source of truth for the endpoints and cache keys. */
export const ALUMNI_BATCHES_ENDPOINT = "/alumni-batches";
export const ALUMNI_BATCHES_QUERY_KEY = ["alumni-batches"];
export const ALUMNI_COURSES_ENDPOINT = "/alumni-courses";
export const ALUMNI_COURSES_QUERY_KEY = ["alumni-courses"];
/** Unpaginated list used to populate the course dropdown in the batch form. */
export const ALUMNI_COURSES_LIST_QUERY_KEY = ["alumni-courses-list"];

/** Oldest batch first — the order the source document uses. */
const byBatchNo = (a: IAlumniBatch, b: IAlumniBatch) =>
  (a.batchNo ?? 0) - (b.batchNo ?? 0);

const normaliseMembers = (batch: IAlumniBatch): IAlumniBatch => ({
  ...batch,
  members: Array.isArray(batch.members)
    ? [...batch.members].sort((a, b) => (a.serial ?? 0) - (b.serial ?? 0))
    : [],
});

/**
 * Course + text filtering runs client-side so it behaves identically on the
 * demo fixtures and on API data. A search term matches the batch title *or* any
 * roster entry — when it matches members, the batch is returned with only the
 * matching rows so "find my name" lands on the right line.
 */
export const filterAlumniBatches = (
  batches: IAlumniBatch[],
  { courseId = "ALL", search = "" }: { courseId?: string; search?: string }
): IAlumniBatch[] => {
  const query = search.trim().toLowerCase();

  return batches.reduce<IAlumniBatch[]>((acc, batch) => {
    const batchCourseId = batch.alumniCourse?.id ?? batch.alumniCourseId;
    if (courseId !== "ALL" && batchCourseId !== courseId) return acc;
    if (!query) {
      acc.push(batch);
      return acc;
    }

    const titleHit =
      batch.titleEn?.toLowerCase().includes(query) ||
      batch.titleBn?.toLowerCase().includes(query);

    const matchingMembers = batch.members.filter(
      (member) =>
        member.rankName?.toLowerCase().includes(query) ||
        member.pNo?.toLowerCase().includes(query) ||
        member.organization?.toLowerCase().includes(query)
    );

    if (titleHit) acc.push(batch);
    else if (matchingMembers.length > 0)
      acc.push({ ...batch, members: matchingMembers });

    return acc;
  }, []);
};

/**
 * Loads every batch with its roster. The list is small enough that the whole
 * set is fetched once and filtered in the browser, which keeps the public page
 * and the admin table on exactly the same data.
 */
export const useAlumniBatches = () => {
  const { data, isLoading, isError } = useGet<IAlumniBatch[]>(
    ALUMNI_BATCHES_ENDPOINT,
    ALUMNI_BATCHES_QUERY_KEY
  );

  const apiBatches = useMemo(
    () => (Array.isArray(data?.data) ? data.data : []),
    [data]
  );

  // ─── DEMO DATA ────────────────────────────────────────────────────────────
  // Until `/alumni-batches` is live the UI runs on fixtures. To go live: delete
  // src/components/alumni/data/demoAlumni.ts, its import above, and this block
  // — then use `apiBatches` directly in the `batches` memo below.
  const isUsingDemoData = !isLoading && apiBatches.length === 0;
  const source = isUsingDemoData ? DEMO_ALUMNI_BATCHES : apiBatches;
  // ─── END DEMO DATA ────────────────────────────────────────────────────────

  const batches = useMemo(
    () => [...source].map(normaliseMembers).sort(byBatchNo),
    [source]
  );

  return { batches, isLoading, isError, isUsingDemoData };
};

/** Course types used by the public filter bar. */
export const useAlumniCourses = () => {
  const { data, isLoading } = useGet<IAlumniCourse[]>(
    `${ALUMNI_COURSES_ENDPOINT}/list`,
    ALUMNI_COURSES_LIST_QUERY_KEY
  );

  const apiCourses = useMemo(
    () => (Array.isArray(data?.data) ? data.data : []),
    [data]
  );

  // ─── DEMO DATA ────────────────────────────────────────────────────────────
  const courses =
    !isLoading && apiCourses.length === 0 ? DEMO_ALUMNI_COURSES : apiCourses;
  // ─── END DEMO DATA ────────────────────────────────────────────────────────

  return { courses, isLoading };
};
