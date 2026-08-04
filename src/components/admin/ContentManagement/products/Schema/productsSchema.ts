import * as Yup from "yup";

const SUPPORTED_FORMATS = [
  "image/jpeg",
  "image/png",
  "image/jpg",
  "image/webp",
];
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export const productSchema = Yup.object({
  nameEn: Yup.string()
    .required("English name is required")
    .max(200, "Max 200 characters"),
  nameBn: Yup.string().max(200, "Max 200 characters").optional(),
  descriptionEn: Yup.string().required("English description is required"),
  descriptionBn: Yup.string().optional(),
  isTidal: Yup.boolean().default(false),
  category: Yup.string()
    .oneOf(["", "PAPPER_CHART", "ELECTRONIC_NAVIGATIONAL_CHART"])
    .when("isTidal", {
      is: false,
      then: (schema) =>
        schema.test(
          "category-required",
          "Category is required",
          (value) => !!value
        ),
      otherwise: (schema) => schema.optional(),
    }),
  price: Yup.number()
    .typeError("Price must be a number")
    .required("Price is required")
    .min(0, "Price must be positive"),
  chartCode: Yup.string().required("Chart code is required"),
  status: Yup.string<"ACTIVE" | "INACTIVE">()
    .oneOf(["ACTIVE", "INACTIVE"])
    .required("Status is required"),
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
  geographicLocation: Yup.string().optional(),
  scale: Yup.string().optional(),
  projection: Yup.string().optional(),
  northLatitude: Yup.string().optional(),
  southLatitude: Yup.string().optional(),
  eastLongitude: Yup.string().optional(),
  westLongitude: Yup.string().optional(),
  edition: Yup.string().optional(),
  publicationDate: Yup.string().optional(),
});

export type ProductFormValues = Yup.InferType<typeof productSchema>;
