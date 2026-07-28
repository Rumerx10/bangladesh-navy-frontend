import { IStationMeasure } from "./types";

/**
 * The by-id endpoint's measure shape is not settled yet, so read the common
 * spellings rather than hard-coding one. Anything unrecognisable is dropped so
 * the table shows a clean empty state instead of rows of "undefined".
 */
const pick = (row: Record<string, unknown>, keys: string[]) => {
  for (const key of keys) {
    const value = row[key];
    if (value !== undefined && value !== null && value !== "") {
      return String(value);
    }
  }
  return "";
};

export const normalizeMeasures = (raw: unknown): IStationMeasure[] => {
  if (!Array.isArray(raw)) return [];

  return raw.reduce<IStationMeasure[]>((acc, entry) => {
    if (!entry || typeof entry !== "object") return acc;
    const row = entry as Record<string, unknown>;

    const measure = pick(row, [
      "measure",
      "measure_name",
      "name",
      "code",
      "type",
    ]);
    const value = pick(row, ["value", "last_value", "val", "reading"]);
    if (!measure || value === "") return acc;

    return [
      ...acc,
      {
        measure,
        value,
        unit: pick(row, ["unit", "unit_of_measure", "uom", "measure_unit"]),
        date: pick(row, [
          "date",
          "datetime",
          "timestamp",
          "last_date",
          "measured_at",
          "updated_at",
        ]),
      },
    ];
  }, []);
};
