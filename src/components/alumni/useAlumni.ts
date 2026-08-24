"use client";

import { useMemo } from "react";
import { useGet } from "@/src/hooks/useGet";
import { bySerial } from "@/src/components/courses/useCourses";
import { IAlumniCourseGroup } from "./types";

/** Single source of truth for the endpoints and cache keys. */
export const ALUMNI_MEMBERS_ENDPOINT = "/alumni-members";
/** Paginated admin list. */
export const ALUMNI_MEMBERS_QUERY_KEY = ["alumni-members"];
/** `/alumni-members/tree` — courses with their rosters, for the public page. */
export const ALUMNI_MEMBERS_TREE_QUERY_KEY = ["alumni-members-tree"];

/**
 * Course + text filtering runs client-side because the tree endpoint returns
 * the whole directory in one payload. A search term matches the course name
 * *or* any roster entry — when it matches members, the course is returned with
 * only the matching rows so "find my name" lands on the right line.
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

    const matchingMembers = group.members.filter(
      (member) =>
        member.rankAndName?.toLowerCase().includes(query) ||
        member.pNo?.toLowerCase().includes(query) ||
        member.organization?.toLowerCase().includes(query) ||
        member.remarks?.toLowerCase().includes(query)
    );

    if (matchingMembers.length > 0)
      acc.push({ ...group, members: matchingMembers });

    return acc;
  }, []);
};

/**
 * Loads every course with its roster. Inactive members are dropped here rather
 * than relied on being filtered server-side, so an unpublished entry can never
 * surface on the public page — the admin passes `includeInactive` to see the
 * true roster size when suggesting the next serial.
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
        const members = (
          Array.isArray(group.members) ? group.members : []
        ).filter((member) => includeInactive || member.status !== "INACTIVE");

        return {
          ...group,
          members: [...members].sort(bySerial),
          totalMembers: members.length,
        };
      })
      .sort(bySerial);
  }, [data, includeInactive]);

  return { groups, isLoading, isError };
};

/**
 * Highest serial already used in a course, so a new roster entry can continue
 * the numbering instead of restarting at 1.
 */
export const nextMemberSerial = (
  groups: IAlumniCourseGroup[],
  courseId: string
) => {
  const group = groups.find((item) => item.id === courseId);
  if (!group || group.members.length === 0) return 1;
  return (
    group.members.reduce(
      (max, member) => Math.max(max, member.serial ?? 0),
      0
    ) + 1
  );
};
