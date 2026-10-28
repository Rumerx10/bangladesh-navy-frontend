import * as Yup from "yup";

const SUPPORTED_FORMATS = [
  "image/jpeg",
  "image/png",
  "image/jpg",
  "image/webp",
];
const MAX_FILE_SIZE = 5 * 1024 * 1024;

// ── Nautical chart detail formats ──────────────────────────────────────────
// Match what the printed charts (and the existing records) use, e.g.
// scale "1:35 000", latitude "22°29.00'N", longitude "089°27.40'E".

const LOCATION_PATTERN = /^[p{L}p{M}p{N}][p{L}p{M}p{N}s,.'’()&/-]*$/u;
const SCALE_PATTERN = /^1s?:s?[1-9]d{0,2}(?:[ ,]?d{3})*$/;
const PROJECTION_PATTERN = /^[A-Za-z][A-Za-zs()-]*$/;
// degrees ° minutes(.decimals) ' hemisphere. The ° and ' are optional on
// input — "22 29.00 N" and "22-29.00N" are accepted too, since ° is awkward to
// type — and the value is saved in the canonical "22°29.00'N" form.
const COORDINATE_PATTERN =
  /^(d{1,3})(?:s*°s*|s+|-)(d{1,2}(?:.d{1,3})?)s*['′’]?s*([NSEW])$/i;

/** "22°29.00'N" → 22.483…, "089°27.40'W" → -89.45…; null if blank or malformed. */
export const toDecimalDegrees = (
  value: string | undefined | null,
  axis: "lat" | "lon"
) => {
  const match = value?.trim().match(COORDINATE_PATTERN);
  if (!match) return null;
  const [, deg, min, hemisphere] = match;
  const h = hemisphere.toUpperCase();
  if (axis === "lat" ? !"NS".includes(h) : !"EW".includes(h)) return null;
  const degrees = Number(deg);
  const minutes = Number(min);
  if (minutes >= 60 || degrees > (axis === "lat" ? 90 : 180)) return null;
  const decimal = degrees + minutes / 60;
  if (decimal > (axis === "lat" ? 90 : 180)) return null;
  return h === "S" || h === "W" ? -decimal : decimal;
};

/** Canonical spelling — "22°29.00'N" / "089°27.40'E" — or the input untouched if it can't be read. */
const toCanonicalCoordinate = (value: string, axis: "lat" | "lon") => {
  const match = value.trim().match(COORDINATE_PATTERN);
  if (!match || toDecimalDegrees(value, axis) === null) return value;
  const [, deg, min, hemisphere] = match;
  const degrees = String(Number(deg)).padStart(axis === "lat" ? 2 : 3, "0");
  const minutes = Number(min).toFixed(2).padStart(5, "0");
  return `${degrees}°${minutes}'${hemisphere.toUpperCase()}`;
};

const coordinate = (label: string, axis: "lat" | "lon") =>
  Yup.string()
    .trim()
    .transform((value) =>
      typeof value === "string" && value
        ? toCanonicalCoordinate(value, axis)
        : value
    )
    .test(
      `${axis}-format`,
      axis === "lat"
        ? `${label} must look like 22°29.00'N (0–90°, minutes under 60, N or S)`
        : `${label} must look like 089°27.40'E (0–180°, minutes under 60, E or W)`,
      (value) => !value || toDecimalDegrees(value, axis) !== null
    )
    .optional();

const latitude = (label: string) => coordinate(label, "lat");
const longitude = (label: string) => coordinate(label, "lon");

const ORDINAL_SUFFIX = (n: number) => {
  if (n % 100 >= 11 && n % 100 <= 13) return "th";
  return (
    ({ 1: "st", 2: "nd", 3: "rd" } as Record<number, string>)[n % 10] ?? "th"
  );
};

/** "1st Edition", "22nd Edition" — and the suffix has to fit the number. */
const isValidEdition = (value: string) => {
  const match = value.match(/^(d{1,3})(st|nd|rd|th)s+Edition$/i);
  if (!match) return false;
  const n = Number(match[1]);
  return n > 0 && match[2].toLowerCase() === ORDINAL_SUFFIX(n);
};

const chartDate = (label: string) =>
  Yup.string()
    .test("date-valid", `${label} is not a valid date`, (value) => {
      if (!value) return true;
      const year = new Date(value).getFullYear();
      return !Number.isNaN(year) && year >= 1900 && year <= 2100;
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
  geographicLocation: Yup.string()
    .trim()
    .max(150, "Max 150 characters")
    .test(
      "location-format",
      "Use a place name — letters, numbers and , . ' ( ) - & / only",
      (value) => !value || LOCATION_PATTERN.test(value)
    )
    .optional(),
  scale: Yup.string()
    .trim()
    .test(
      "scale-format",
      "Scale must look like 1:12 500 or 1:350 000",
      (value) => !value || SCALE_PATTERN.test(value)
    )
    .optional(),
  projection: Yup.string()
    .trim()
    .max(60, "Max 60 characters")
    .test(
      "projection-format",
      "Projection may only contain letters, spaces, hyphens and brackets",
      (value) => !value || PROJECTION_PATTERN.test(value)
    )
    .optional(),
  northLatitude: latitude("North latitude").test(
    "north-above-south",
    "North latitude must be north of (greater than) the south latitude",
    function (value) {
      const north = toDecimalDegrees(value, "lat");
      const south = toDecimalDegrees(this.parent.southLatitude, "lat");
      return north === null || south === null || north >= south;
    }
  ),
  southLatitude: latitude("South latitude"),
  eastLongitude: longitude("East longitude").test(
    "east-of-west",
    "East longitude must be east of (greater than) the west longitude",
    function (value) {
      const east = toDecimalDegrees(value, "lon");
      const west = toDecimalDegrees(this.parent.westLongitude, "lon");
      return east === null || west === null || east >= west;
    }
  ),
  westLongitude: longitude("West longitude"),
  edition: Yup.string()
    .trim()
    .test(
      "edition-format",
      "Edition must look like 1st Edition, 2nd Edition, 3rd Edition…",
      (value) => !value || isValidEdition(value)
    )
    .optional(),
  editionDate: chartDate("Edition date"),
  publicationDate: chartDate("Publication date"),
});

export type ProductFormValues = Yup.InferType<typeof productSchema>;
