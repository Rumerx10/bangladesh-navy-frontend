/**
 * Notices to Mariners — shared between the public listing
 * (src/components/notices) and the admin panel (src/components/admin/notices).
 */

/** The stored notice categories. `ALL` is a filter-only value, never a type. */
export type NoticeType = "PERMANENT" | "TEMPORARY" | "PRELIMINARY" | "GUN_FIRE";

export type NoticeFilterValue = "ALL" | NoticeType;

export const NOTICE_TYPE_LABELS: Record<NoticeType, string> = {
  PERMANENT: "Permanent",
  TEMPORARY: "Temporary",
  PRELIMINARY: "Preliminary Notices",
  GUN_FIRE: "Gun Fire",
};

/** Badge colours for the public cards and the admin table. */
export const NOTICE_TYPE_BADGE: Record<NoticeType, string> = {
  PERMANENT: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  TEMPORARY: "bg-amber-50 text-amber-700 ring-amber-600/20",
  PRELIMINARY: "bg-sky-50 text-sky-700 ring-sky-600/20",
  GUN_FIRE: "bg-rose-50 text-rose-700 ring-rose-600/20",
};

/** Toggle options for the filter bar — "All" first, then every real type. */
export const NOTICE_FILTER_OPTIONS: {
  label: string;
  value: NoticeFilterValue;
}[] = [
  { label: "All", value: "ALL" },
  ...(Object.keys(NOTICE_TYPE_LABELS) as NoticeType[]).map((type) => ({
    label: NOTICE_TYPE_LABELS[type],
    value: type as NoticeFilterValue,
  })),
];

/** Select options for the admin form — real types only, no "All". */
export const NOTICE_TYPE_OPTIONS = (
  Object.keys(NOTICE_TYPE_LABELS) as NoticeType[]
).map((type) => ({ label: NOTICE_TYPE_LABELS[type], value: type }));

export interface INotice {
  id: string;
  /** Human-facing reference, e.g. "NM 14/2026". */
  noticeNumber: string;
  titleEn: string;
  titleBn: string;
  descriptionEn: string;
  descriptionBn: string;
  type: NoticeType;
  /** URL of the attached PDF; null when the notice has no file. */
  pdfUrl: string | null;
  /** ISO date the notice was issued. */
  publishedAt: string;
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;
  updatedAt: string;
}
