import * as Yup from "yup";
import {
  normalizeCoordinate,
  normalizeEdition,
  normalizePlace,
  normalizeProjection,
  normalizeScale,
  parseCoordinate,
} from "./chartFormats";

const SUPPORTED_FORMATS = [
  "image/jpeg",
  "image/png",
  "image/jpg",
  "image/webp",
];
const MAX_FILE_SIZE = 5 * 1024 * 1024;

// ── Nautical chart details ───────────────────────────────────────────────────
// All optional. Each field accepts whatever its reader in ./chartFormats can
// make sense of — "22 29.5 N", "1:12500", "3rd edition" — and is saved in the
// chart's own spelling (22°29.50'N, 1:12 500, 3rd Edition). Only input that
// can't be read at all is rejected.

/** Optional text field, validated and normalised by `normalize`. */
const chartField = (
  normalize: (value: string) => string | null,
  message: string
) =>
  Yup.string()
    .transform((value) =>
      typeof value === "string"
        ? value.trim()
          ? (normalize(value) ?? value.trim())
          : ""
        : value
    )
    .test("chart-format", message, (value) => !value || !!normalize(value))
    .optional();

const latitude = chartField(
  (value) => normalizeCoordinate(value, "lat"),
  "Enter a latitude like 22°29.00'N (or just 22 29)"
);
const longitude = chartField(
  (value) => normalizeCoordinate(value, "lon"),
  "Enter a longitude like 089°27.40'E (or just 89 27.4)"
);

const chartDate = (label: string) =>
  Yup.string()
    .test("date-valid", `${label} is not a valid date`, (value) => {
      if (!value) return true;
      const date = new Date(value);
      const year = date.getFullYear();
      return !Number.isNaN(date.getTime()) && year >= 1900 && year <= 2100;
    })
    .optional();

export const productSchema = Yup.object({
  nameEn: Yup.string()
    .required("English name is required")
    .max(200, "Max 200 characters"),
  nameBn: Yup.string().max(200, "Max 200 characters").optional(),
  descriptionEn: Yup.string().optional(),
  descriptionBn: Yup.string().optional(),
  category: Yup.string()
    .oneOf(["", "PAPPER_CHART", "ELECTRONIC_NAVIGATIONAL_CHART", "TIDAL"])
    .test("category-required", "Category is required", (value) => !!value),
  price: Yup.number()
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : value
    )
    .typeError("Price must be a number")
    .min(0, "Price must be positive")
    .optional(),
  chartCode: Yup.string().when("category", {
    is: (value: string) => value !== "TIDAL",
    then: (schema) => schema.required("Chart code is required"),
    otherwise: (schema) => schema.optional(),
  }),
  status: Yup.string<"ACTIVE" | "INACTIVE">()
    .oneOf(["ACTIVE", "INACTIVE"])
    .optional(),
  images: Yup.array()
    .of(
      Yup.mixed<File | string>()
        .test("fileType", "Only JPEG, PNG, JPG, WebP allowed", (value) => {
          if (!value || typeof value === "string") return true;
          return SUPPORTED_FORMATS.includes((value as File).type);
        })
        .test("fileSize", "Max file size is 5MB", (value) => {
          if (!value || typeof value === "string") return true;
          return (value as File).size <= MAX_FILE_SIZE;
        })
        .required()
    )
    .min(1, "At least one image is required")
    .required("Images are required"),
  geographicLocation: chartField(
    normalizePlace,
    "Enter a place name, e.g. Bay of Bengal"
  ).max(150, "Max 150 characters"),
  scale: chartField(normalizeScale, "Enter a scale like 1:12 500"),
  projection: chartField(
    normalizeProjection,
    "Enter a projection name, e.g. Mercator"
  ).max(60, "Max 60 characters"),
  northLatitude: latitude.test(
    "north-of-south",
    "North latitude must be greater than South latitude — are they swapped?",
    function (value) {
      const north = parseCoordinate(value, "lat");
      const south = parseCoordinate(this.parent.southLatitude, "lat");
      return !north || !south || north.decimal >= south.decimal;
    }
  ),
  southLatitude: latitude,
  eastLongitude: longitude.test(
    "east-of-west",
    "East longitude must be greater than West longitude — are they swapped?",
    function (value) {
      const east = parseCoordinate(value, "lon");
      const west = parseCoordinate(this.parent.westLongitude, "lon");
      return !east || !west || east.decimal >= west.decimal;
    }
  ),
  westLongitude: longitude,
  edition: chartField(
    normalizeEdition,
    "Enter the edition number, e.g. 1st Edition"
  ),
  editionDate: chartDate("Edition date"),
  publicationDate: chartDate("Publication date"),
});

export type ProductFormValues = Yup.InferType<typeof productSchema>;
