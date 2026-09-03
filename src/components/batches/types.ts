/**
 * A single run of a course — "Batch 2026-A", 05 Jan 2026 → 20 Jun 2026. Every
 * batch belongs to exactly one course (src/components/courses/types.ts) and
 * every alumni member belongs to exactly one batch.
 */

export type BatchStatus = "ACTIVE" | "INACTIVE";

export interface IBatch {
  id: string;
  courseId: string;
  name: string;
  /** ISO 8601, nullable — older batches have no recorded dates. */
  startDate?: string | null;
  endDate?: string | null;
  /** Row order within its course. */
  serial: number;
  status: BatchStatus;
  createdAt?: string;
  updatedAt?: string;
  /** Populated by the API on read; absent on write payloads. */
  courseName?: string;
}

export const BATCH_STATUS_OPTIONS: { label: string; value: BatchStatus }[] = [
  { label: "Active", value: "ACTIVE" },
  { label: "Inactive", value: "INACTIVE" },
];
