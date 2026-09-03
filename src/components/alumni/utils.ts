/** "08 March 1997" — the long form used on the public course header. */
export const formatLongDate = (value?: string | null) => {
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
export const formatShortDate = (value?: string | null) => {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

/**
 * "08 March 1997 — 07 August 1997", or `null` when neither date is recorded —
 * the API leaves both null for courses that predate the record keeping.
 */
export const formatPeriod = (start?: string | null, end?: string | null) => {
  if (!start && !end) return null;
  return `${formatLongDate(start)} — ${formatLongDate(end)}`;
};

/** Year a batch started, for the hero stats. */
export const yearOf = (value?: string | null) => {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.getFullYear();
};

/**
 * Zero-padded serial for the card badge — "01", "02", "12". Keeps every badge
 * the same width regardless of how many courses exist.
 */
export const paddedSerial = (value: number) =>
  Number.isFinite(value) ? String(Math.trunc(value)).padStart(2, "0") : "—";
