import * as Yup from "yup";
import { parseCoordinate } from "@/src/components/shared/bangladesh-map/coordinates";

type Axis = "latitude" | "longitude";

const AXIS = {
  latitude: { max: 90, hemispheres: "NS", example: `22.2417 or 22° 14.5' N` },
  longitude: { max: 180, hemispheres: "EW", example: `91.8033 or 91° 48.2' E` },
} as const;

/**
 * Accepts what the public map's `parseCoordinate` can plot: a signed decimal
 * ("22.2417", "-91.8") or degrees / minutes / seconds with an optional
 * hemisphere letter ("22° 14.5' N", "22 14 30 N"). Rejects out-of-range
 * values, minutes/seconds ≥ 60, the wrong hemisphere letter for the axis,
 * and stray text the parser would otherwise silently ignore.
 */
const coordinateError = (raw: string, axis: Axis): string | null => {
  const { max, hemispheres, example } = AXIS[axis];
  const value = raw.trim();
  const label = axis === "latitude" ? "Latitude" : "Longitude";

  const decimal = /^[+-]?\d+(\.\d+)?$/.test(value);
  const dms =
    /^[+-]?\d+(\.\d+)?\s*°?\s*(\d+(\.\d+)?\s*['′]?\s*(\d+(\.\d+)?\s*["″]?)?)?\s*[NSEW]?$/i.test(
      value
    );
  if (!decimal && !dms) return `Enter a valid ${axis}, e.g. ${example}`;

  const letter = value.match(/[NSEW]$/i)?.[0]?.toUpperCase();
  if (letter && !hemispheres.includes(letter))
    return `${label} must use ${hemispheres.split("").join(" or ")}`;
  if (letter && /^[+-]/.test(value))
    return `Use either a sign or ${hemispheres.split("").join("/")}, not both`;

  if (!decimal) {
    const [, minutes = 0, seconds = 0] = (
      value.match(/\d+(\.\d+)?/g) ?? []
    ).map(Number);
    if (minutes >= 60 || seconds >= 60)
      return "Minutes and seconds must be less than 60";
  }

  const parsed = parseCoordinate(value);
  if (parsed === null) return `Enter a valid ${axis}, e.g. ${example}`;
  if (Math.abs(parsed) > max)
    return `${label} must be between -${max} and ${max}`;

  return null;
};

const coordinate = (axis: Axis) =>
  Yup.string()
    .trim()
    .required(`${axis === "latitude" ? "Latitude" : "Longitude"} is required`)
    .test("coordinate", function (value) {
      if (!value) return true; // handled by required()
      const message = coordinateError(value, axis);
      return message ? this.createError({ message }) : true;
    });

export const tidalStationSchema = Yup.object({
  generalArea: Yup.string().required("General area is required"),
  location: Yup.string().required("Location is required"),
  latitude: coordinate("latitude"),
  longitude: coordinate("longitude"),
  productId: Yup.string().required("Product is required"),
  status: Yup.string()
    .oneOf(["ACTIVE", "INACTIVE"])
    .required("Status is required"),
});

export type TidalStationFormValues = Yup.InferType<typeof tidalStationSchema>;
