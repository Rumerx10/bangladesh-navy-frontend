export const parseCoordinate = (
  raw?: string | number | null
): number | null => {
  if (raw === null || raw === undefined) return null;
  if (typeof raw === "number") return Number.isFinite(raw) ? raw : null;

  const value = raw.trim();
  if (!value) return null;

  const decimal = Number(value);
  if (!Number.isNaN(decimal)) return decimal;

  const parts = value.match(/\d+(?:\.\d+)?/g);
  if (!parts?.length) return null;

  const [degrees, minutes = "0", seconds = "0"] = parts;
  const magnitude =
    Number(degrees) + Number(minutes) / 60 + Number(seconds) / 3600;
  if (!Number.isFinite(magnitude)) return null;

  const hemisphere = value.match(/[NSEW]/i)?.[0]?.toUpperCase();
  const negative =
    hemisphere === "S" || hemisphere === "W" || value.startsWith("-");

  return negative ? -magnitude : magnitude;
};
