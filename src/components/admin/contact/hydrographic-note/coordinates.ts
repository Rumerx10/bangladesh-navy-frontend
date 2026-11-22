export type CoordinateAxis = "latitude" | "longitude";

const AXIS = {
  latitude: {
    max: 90,
    hemispheres: "NS",
    label: "Latitude",
    example: "22° 20.5′ N",
  },
  longitude: {
    max: 180,
    hemispheres: "EW",
    label: "Longitude",
    example: "91° 48.2′ E",
  },
} as const;

const NUMBER = /^\d+(\.\d+)?$/;
const SIGNED_DECIMAL = /^[+-]?\d+(\.\d+)?$/;

/**
 * Why a typed position is not a usable latitude/longitude, or `undefined`
 * when it is. Accepts what observers actually write:
 *   - degrees, minutes, seconds: `22° 20′ 30″ N`, `22 20 30 N`, `N 22°20'30"`
 *   - degrees and decimal minutes: `22° 20.5′ N`
 *   - decimal degrees: `22.3417 N`, or signed `-22.3417` (negative = S / W)
 */
export const getCoordinateError = (
  raw: string,
  axis: CoordinateAxis
): string | undefined => {
  const { max, hemispheres, label, example } = AXIS[axis];
  const formatHint = `Enter ${label.toLowerCase()} like ${example}`;
  const value = raw.trim().toUpperCase();
  if (!value) return undefined;
  if (!/\d/.test(value)) return formatHint;

  // Signed decimal degrees, no hemisphere letter.
  if (SIGNED_DECIMAL.test(value)) {
    return Math.abs(Number(value)) > max
      ? `${label} must be between -${max}° and ${max}°`
      : undefined;
  }

  // Hemisphere letter at either end.
  const leading = /^[NSEW]/.exec(value)?.[0];
  const trailing = /[NSEW]$/.exec(value)?.[0];
  if (leading && trailing) return formatHint;
  const hemisphere = leading ?? trailing;
  if (!hemisphere) {
    return `Add the hemisphere (${hemispheres.split("").join(" or ")}), e.g. ${example}`;
  }
  if (!hemispheres.includes(hemisphere)) {
    return `${label} must be ${hemispheres.split("").join(" or ")}, not ${hemisphere}`;
  }

  // Degree / minute / second marks (and ":" separators) become spaces.
  const parts = value
    .replace(/[NSEW]/g, "")
    .replace(/[°º'′’"″”:]/g, " ")
    .trim()
    .split(/\s+/);
  if (parts.length > 3 || parts.some((part) => !NUMBER.test(part))) {
    return formatHint;
  }
  // Only the last part may carry decimals (22° 20.5′ is fine, 22.5° 20′ isn't).
  if (parts.slice(0, -1).some((part) => part.includes("."))) {
    return formatHint;
  }

  const [degrees, minutes = 0, seconds = 0] = parts.map(Number);
  if (minutes >= 60) return "Minutes must be less than 60";
  if (seconds >= 60) return "Seconds must be less than 60";
  if (degrees + minutes / 60 + seconds / 3600 > max) {
    return `${label} cannot be more than ${max}°`;
  }
  return undefined;
};
