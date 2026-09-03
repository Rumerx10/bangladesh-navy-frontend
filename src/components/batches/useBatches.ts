"use client";

import { useMemo } from "react";
import { useGet } from "@/src/hooks/useGet";
import { bySerial } from "@/src/components/courses/useCourses";
import { IBatch } from "./types";

/** Single source of truth for the endpoint and cache keys. */
export const BATCHES_ENDPOINT = "/batches";
/** Paginated admin list. */
export const BATCHES_QUERY_KEY = ["batches"];
/** `/batches/list` — every batch, unpaginated — for dropdowns and client-side filtering. */
export const BATCHES_LIST_QUERY_KEY = ["batches-list"];

/**
 * Loads every batch, unpaginated. Used to populate the batch combobox on the
 * alumni member form and to filter batches by course on the admin Batches tab.
 */
export const useBatchesList = () => {
  const { data, isLoading, isError } = useGet<IBatch[]>(
    `${BATCHES_ENDPOINT}/list`,
    BATCHES_LIST_QUERY_KEY
  );

  const batches = useMemo(
    () => (Array.isArray(data?.data) ? [...data.data].sort(bySerial) : []),
    [data]
  );

  return { batches, isLoading, isError };
};

/** `batchId` → "Course — Batch", for tables that only receive the id. */
export const useBatchNameMap = () => {
  const { batches, isLoading } = useBatchesList();

  const batchNames = useMemo(
    () =>
      batches.reduce<Record<string, string>>((acc, batch) => {
        acc[batch.id] = batch.courseName
          ? `${batch.courseName} — ${batch.name}`
          : batch.name;
        return acc;
      }, {}),
    [batches]
  );

  return { batchNames, batches, isLoading };
};
