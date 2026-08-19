import { IAlumniBatch } from "./types";

/** 1 → "1st", 2 → "2nd", 11 → "11th", 23 → "23rd". */
export const ordinal = (value: number) => {
  if (!Number.isFinite(value)) return "—";
  const abs = Math.abs(Math.trunc(value));
  const lastTwo = abs % 100;
  if (lastTwo >= 11 && lastTwo <= 13) return `${abs}th`;
  switch (abs % 10) {
    case 1:
      return `${abs}st`;
    case 2:
      return `${abs}nd`;
    case 3:
      return `${abs}rd`;
    default:
      return `${abs}th`;
  }
};

/** "08 March 1997" — the long form used on the public batch header. */
export const formatLongDate = (value?: string) => {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

/** "08 Mar 1997" — the compact form used in the admin table. */
export const formatShortDate = (value?: string) => {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

/** "08 March 1997 — 07 August 1997". */
export const formatPeriod = (start?: string, end?: string) =>
  `${formatLongDate(start)} — ${formatLongDate(end)}`;

/** Year the batch started, for the timeline rail and the hero stats. */
export const batchYear = (batch: IAlumniBatch) => {
  const date = new Date(batch.startDate);
  return Number.isNaN(date.getTime()) ? null : date.getFullYear();
};

/**
 * Zero-padded batch number for the badge — "01", "02", "12". Keeps every card
 * badge the same width regardless of how many batches exist.
 */
export const paddedBatchNo = (value: number) =>
  Number.isFinite(value) ? String(Math.trunc(value)).padStart(2, "0") : "—";
