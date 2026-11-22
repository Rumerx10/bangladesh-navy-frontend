/**
 * Readers for the Nautical Chart Details fields of the product form.
 *
 * Each accepts the ways people actually type a value — "22 29.5 N",
 * "22.4917", "1:12500", "3rd edition" — and returns it in the one spelling
 * the printed charts (and the public site) use, or `null` when the input
 * can't be read as that kind of value at all. The schema validates and
 * normalises with these, and the form tidies a field with them as soon as it
 * loses focus, so nobody has to type ° or ′ to get a value accepted.
 */

export type CoordinateAxis = "lat" | "lon";

const collapseSpaces = (value: string) => value.trim().replace(/\s+/g, " ");
const hasLetter = (value: string) => /\p{L}/u.test(value);

// ─── Coordinates ──────────────────────────────────────────────────────────────

const HEMISPHERES: Record<CoordinateAxis, readonly [string, string]> = {
  lat: ["N", "S"],
  lon: ["E", "W"],
};
const MAX_DEGREES: Record<CoordinateAxis, number> = { lat: 90, lon: 180 };

/** What may sit between the numbers: degree/minute/second marks (including
 *  the look-alikes keyboards produce) and the separators used instead. */
const COORDINATE_FILLER = /^[\d.\s°º˚'′’`´"″:,-]*$/;

export interface ParsedCoordinate {
  /** Signed decimal degrees — south and west are negative. */
  decimal: number;
  /** Chart spelling, e.g. 22°29.00'N or 089°27.40'E. */
  text: string;
}

/**
 * Reads a latitude or longitude written as
 * - degrees and decimal minutes: 22°29.00'N, 22 29 N, 22-29.5N, N 22 29.5
 * - degrees, minutes and seconds: 22°29'30"N, 22 29 30
 * - decimal degrees: 22.4917, -22.5
 *
 * The hemisphere letter is optional: every BNHOC chart lies north of the
 * equator and east of Greenwich, so a bare value reads as N / E (S / W when
 * negative). Returns null for anything else, or a value out of range.
 */
export const parseCoordinate = (
  input: string | null | undefined,
  axis: CoordinateAxis
): ParsedCoordinate | null => {
  let rest = (input ?? "").trim().toUpperCase();
  if (!rest) return null;

  // Hemisphere letter, before or after the numbers.
  let hemisphere: string | null = null;
  const letter = rest.match(/^([NSEW])\s*|\s*([NSEW])\.?$/);
  if (letter && letter.index !== undefined) {
    hemisphere = letter[1] ?? letter[2];
    rest =
      rest.slice(0, letter.index) + rest.slice(letter.index + letter[0].length);
  }

  const negative = rest.startsWith("-");
  if (negative) {
    if (hemisphere) return null;
    rest = rest.slice(1);
  }

  // A lone decimal comma ("22,5") is a decimal point.
  rest = rest.replace(/^(\d+),(\d+)$/, "$1.$2");

  if (!COORDINATE_FILLER.test(rest)) return null;
  const parts = rest.match(/\d+(?:\.\d+)?/g);
  if (!parts || parts.length > 3) return null;
  const [first, second, third] = parts.map(Number);

  let degrees: number;
  let minutes: number;
  // Minutes keep the precision they were typed with (2–3 decimals).
  let places = 2;

  if (parts.length === 1) {
    degrees = Math.floor(first);
    minutes = (first - degrees) * 60;
  } else {
    if (!Number.isInteger(first) || second >= 60) return null;
    degrees = first;
    if (parts.length === 2) {
      minutes = second;
      places = Math.min(3, Math.max(2, parts[1].split(".")[1]?.length ?? 0));
    } else {
      if (!Number.isInteger(second) || third >= 60) return null;
      minutes = second + third / 60;
    }
  }

  // Round, carrying 59.999′ over into the next degree.
  let rounded = Number(minutes.toFixed(places));
  if (rounded >= 60) {
    degrees += 1;
    rounded -= 60;
  }

  const decimal = degrees + rounded / 60;
  if (decimal > MAX_DEGREES[axis]) return null;

  const [positive, negativeHemisphere] = HEMISPHERES[axis];
  if (
    hemisphere &&
    hemisphere !== positive &&
    hemisphere !== negativeHemisphere
  )
    return null;
  const h = hemisphere ?? (negative ? negativeHemisphere : positive);

  const degreesText = String(degrees).padStart(axis === "lat" ? 2 : 3, "0");
  const minutesText = rounded.toFixed(places).padStart(places + 3, "0");

  return {
    decimal: h === negativeHemisphere ? -decimal : decimal,
    text: `${degreesText}°${minutesText}'${h}`,
  };
};

/** Chart spelling of a coordinate, or null when it can't be read. */
export const normalizeCoordinate = (
  input: string | null | undefined,
  axis: CoordinateAxis
) => parseCoordinate(input, axis)?.text ?? null;

// ─── Scale ────────────────────────────────────────────────────────────────────

/**
 * "1:12500", "1 : 12,500", "1/12500", "12500" → "1:12 500". Digit groups may
 * be split by spaces, commas, apostrophes or dots. Below 1:100 is rejected —
 * no chart is drawn at that scale.
 */
export const normalizeScale = (input: string | null | undefined) => {
  let value = (input ?? "").trim();
  if (!value) return null;

  value = value.replace(/[\s,'’_]/g, "").replace(/\.(?=\d{3}(?!\d))/g, "");
  const match = value.match(/^(?:1[:/])?0*(\d+)$/);
  if (!match) return null;

  const denominator = Number(match[1]);
  if (!Number.isSafeInteger(denominator) || denominator < 100) return null;
  return `1:${String(denominator).replace(/\B(?=(\d{3})+(?!\d))/g, " ")}`;
};

// ─── Edition ──────────────────────────────────────────────────────────────────

/** 1 → "1st", 2 → "2nd", 11 → "11th", 22 → "22nd". */
export const ordinal = (n: number) => {
  const lastTwo = n % 100;
  if (lastTwo >= 11 && lastTwo <= 13) return `${n}th`;
  const suffix =
    ({ 1: "st", 2: "nd", 3: "rd" } as Record<number, string>)[n % 10] ?? "th";
  return `${n}${suffix}`;
};

const ORDINAL_WORDS = [
  "first",
  "second",
  "third",
  "fourth",
  "fifth",
  "sixth",
  "seventh",
  "eighth",
  "ninth",
  "tenth",
  "eleventh",
  "twelfth",
  "thirteenth",
  "fourteenth",
  "fifteenth",
  "sixteenth",
  "seventeenth",
  "eighteenth",
  "nineteenth",
  "twentieth",
];
const EDITION_WORDS = new Set(["edition", "ed", "edn", "no"]);

/**
 * "3", "3rd", "3rd edition", "Edition 3", "third edition" → "3rd Edition".
 * A wrong suffix is corrected ("2st Edition" → "2nd Edition"). Null when
 * there is no edition number, or more than one.
 */
export const normalizeEdition = (input: string | null | undefined) => {
  const tokens = (input ?? "")
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean);

  let edition: number | null = null;
  for (const token of tokens) {
    const numeric = token.match(/^(\d{1,3})(?:st|nd|rd|th)?$/);
    const word = ORDINAL_WORDS.indexOf(token);
    if (numeric || word >= 0) {
      if (edition !== null) return null;
      edition = numeric ? Number(numeric[1]) : word + 1;
    } else if (!EDITION_WORDS.has(token)) {
      return null;
    }
  }

  return edition !== null && edition > 0 ? `${ordinal(edition)} Edition` : null;
};

export const EDITION_OPTIONS = Array.from(
  { length: 12 },
  (_, i) => `${ordinal(i + 1)} Edition`
);

// ─── Projection & place ───────────────────────────────────────────────────────

/** Common chart projections, offered in the form's dropdown. */
export const KNOWN_PROJECTIONS = [
  "Mercator",
  "Transverse Mercator",
  "Universal Transverse Mercator (UTM)",
  "Lambert Conformal Conic",
  "Gnomonic",
  "Polar Stereographic",
];

const PROJECTION_ALIASES: Record<string, string> = {
  utm: "Universal Transverse Mercator (UTM)",
  lcc: "Lambert Conformal Conic",
};

/** Any name with a letter in it; a known projection gets its proper spelling. */
export const normalizeProjection = (input: string | null | undefined) => {
  const value = collapseSpaces(input ?? "");
  if (!value || !hasLetter(value)) return null;
  const key = value.toLowerCase();
  return (
    KNOWN_PROJECTIONS.find((name) => name.toLowerCase() === key) ??
    PROJECTION_ALIASES[key] ??
    value
  );
};

/** Any place name with a letter in it (Bangla included), spaces tidied. */
export const normalizePlace = (input: string | null | undefined) => {
  const value = collapseSpaces(input ?? "");
  return value && hasLetter(value) ? value : null;
};
