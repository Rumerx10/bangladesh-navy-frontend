"use client";

import { useMemo } from "react";
import { useGet } from "@/src/hooks/useGet";
import {
  ICourseStatistic,
  ICourseStatisticsGroup,
  ICourseStatisticsListResponse,
  ICourseStatisticTotals,
} from "./types";

/** Single source of truth for the endpoint and cache keys. */
export const COURSE_STATISTICS_ENDPOINT = "/course-statistics";
/** Paginated admin list. */
export const COURSE_STATISTICS_QUERY_KEY = ["course-statistics"];
/** `/course-statistics/list` — every row grouped by remarks, plus column totals, unpaginated. */
export const COURSE_STATISTICS_LIST_QUERY_KEY = ["course-statistics-list"];

export const EMPTY_COURSE_STATISTIC_TOTALS: ICourseStatisticTotals = {
  coursesConducted: 0,
  bn: 0,
  otherMaritimeOrg: 0,
  overseas: 0,
  totalTrainees: 0,
};

/** Table order — lowest serial first. */
export const bySerial = <T extends { serial?: number }>(a: T, b: T) =>
  (a.serial ?? 0) - (b.serial ?? 0);

/**
 * Loads every course-statistics row, grouped by `remarks`, plus the
 * pre-calculated column totals. The public table renders the groups as
 * printed; the admin table flattens them back into one sorted list.
 */
export const useCourseStatisticsList = () => {
  const { data, isLoading, isError } = useGet<ICourseStatisticsListResponse>(
    `${COURSE_STATISTICS_ENDPOINT}/list`,
    COURSE_STATISTICS_LIST_QUERY_KEY
  );

  const groups = useMemo<ICourseStatisticsGroup[]>(
    () =>
      Array.isArray(data?.data?.groups)
        ? data.data.groups.map((group) => ({
            ...group,
            rows: [...group.rows].sort(bySerial),
          }))
        : [],
    [data]
  );

  const rows = useMemo<ICourseStatistic[]>(
    () => groups.flatMap((group) => group.rows).sort(bySerial),
    [groups]
  );

  return {
    groups,
    rows,
    totals: data?.data?.total ?? EMPTY_COURSE_STATISTIC_TOTALS,
    isLoading,
    isError,
  };
};

/** `—` for a missing figure, matching the printed statistics table. */
export const formatFigure = (value?: number | null) =>
  value === null || value === undefined ? "—" : String(value);
