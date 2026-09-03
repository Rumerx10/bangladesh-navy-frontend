"use client";

import { useMemo } from "react";
import { useGet } from "@/src/hooks/useGet";
import { bySerial } from "@/src/components/courses/useCourses";
import { IAlumniBatchGroup, IAlumniCourseGroup } from "./types";

/** Single source of truth for the endpoints and cache keys. */
export const ALUMNI_MEMBERS_ENDPOINT = "/alumni-members";
/** Paginated admin list. */
export const ALUMNI_MEMBERS_QUERY_KEY = ["alumni-members"];
/** Unpaginated list — for client-side filtering (e.g. by batch). */
export const ALUMNI_MEMBERS_LIST_QUERY_KEY = ["alumni-members-list"];
/** `/alumni-members/tree` — courses with their batches and rosters, for the public page. */
export const ALUMNI_MEMBERS_TREE_QUERY_KEY = ["alumni-members-tree"];

/**
 * Course + text filtering runs client-side because the tree endpoint returns
 * the whole directory in one payload. A search term matches the course name,
 * a batch name, *or* any roster entry — when it matches a batch or its
 * members, the course is returned with only the matching batches (trimmed to
 * matching members where the hit is member-level) so "find my name" lands on
 * the right line.
 */
export const filterAlumniGroups = (
  groups: IAlumniCourseGroup[],
  { courseId = "ALL", search = "" }: { courseId?: string; search?: string }
): IAlumniCourseGroup[] => {
  const query = search.trim().toLowerCase();

  return groups.reduce<IAlumniCourseGroup[]>((acc, group) => {
    if (courseId !== "ALL" && group.id !== courseId) return acc;
    if (!query) {
      acc.push(group);
      return acc;
    }

    if (group.name?.toLowerCase().includes(query)) {
      acc.push(group);
      return acc;
    }

    const matchingBatches = group.batches.reduce<IAlumniBatchGroup[]>(
      (batchAcc, batch) => {
        if (batch.name?.toLowerCase().includes(query)) {
          batchAcc.push(batch);
          return batchAcc;
        }

        const matchingMembers = batch.members.filter(
          (member) =>
            member.rankAndName?.toLowerCase().includes(query) ||
            member.pNo?.toLowerCase().includes(query) ||
            member.organization?.toLowerCase().includes(query) ||
            member.remarks?.toLowerCase().includes(query)
        );

        if (matchingMembers.length > 0)
          batchAcc.push({ ...batch, members: matchingMembers });

        return batchAcc;
      },
      []
    );

    if (matchingBatches.length > 0)
      acc.push({ ...group, batches: matchingBatches });

    return acc;
  }, []);
};

/**
 * Loads every course with its batches and rosters attached. Inactive members
 * are dropped here rather than relied on being filtered server-side, so an
 * unpublished entry can never surface on the public page — the admin passes
 * `includeInactive` to see the true roster size when suggesting the next
 * serial.
 */
export const useAlumniTree = ({ includeInactive = false } = {}) => {
  const { data, isLoading, isError } = useGet<IAlumniCourseGroup[]>(
    `${ALUMNI_MEMBERS_ENDPOINT}/tree`,
    ALUMNI_MEMBERS_TREE_QUERY_KEY
  );

  const groups = useMemo<IAlumniCourseGroup[]>(() => {
    const source = Array.isArray(data?.data) ? data.data : [];

    return [...source]
      .map((group) => {
        const batches = (Array.isArray(group.batches) ? group.batches : [])
          .map((batch) => {
            const members = (
              Array.isArray(batch.members) ? batch.members : []
            ).filter((member) => includeInactive || member.status !== "INACTIVE");

            return {
              ...batch,
              members: [...members].sort(bySerial),
              totalMembers: members.length,
            };
          })
          .sort(bySerial);

        return {
          ...group,
          batches,
          totalMembers: batches.reduce(
            (sum, batch) => sum + batch.totalMembers,
            0
          ),
        };
      })
      .sort(bySerial);
  }, [data, includeInactive]);

  return { groups, isLoading, isError };
};

/**
 * Highest serial already used in a batch, so a new roster entry can continue
 * the numbering instead of restarting at 1.
 */
export const nextMemberSerial = (
  groups: IAlumniCourseGroup[],
  batchId: string
) => {
  const batch = groups
    .flatMap((group) => group.batches)
    .find((item) => item.id === batchId);
  if (!batch || batch.members.length === 0) return 1;
  return (
    batch.members.reduce(
      (max, member) => Math.max(max, member.serial ?? 0),
      0
    ) + 1
  );
};

