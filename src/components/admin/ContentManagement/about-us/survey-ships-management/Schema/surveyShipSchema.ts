import * as Yup from "yup";

const SUPPORTED_FORMATS = [
  "image/jpeg",
  "image/png",
  "image/jpg",
  "image/webp",
];
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export const surveyShipSchema = Yup.object({
  nameEn: Yup.string()
    .required("English name is required")
    .max(200, "Max 200 characters"),
  nameBn: Yup.string().max(200, "Max 200 characters").optional(),
  descriptionEn: Yup.string().required("English description is required"),
  descriptionBn: Yup.string().optional(),
  surveyCategoryId: Yup.string().required("Category is required"),
  length: Yup.string().required("Length is required"),
  beam: Yup.string().required("Beam is required"),
  draft: Yup.string().required("Draft is required"),
  crew: Yup.string().required("Crew is required"),
  surveyEquipment: Yup.array()
    .of(Yup.string().required())
    .min(1, "At least one survey equipment item is required")
    .required("Survey equipment is required"),
  // Optional: `<input type="number">` returns "" when cleared, which Yup would
  // otherwise cast to NaN — treat it as "no position set" instead.
  position: Yup.number()
    .transform((value, original) =>
      original === "" || original === null ? undefined : value
    )
    .typeError("Position must be a number")
    .integer("Position must be a whole number")
    .min(1, "Position must be at least 1")
    .optional(),
  status: Yup.string()
    .oneOf(["ACTIVE", "INACTIVE"] as const)
    .required("Status is required"),
  image: Yup.mixed<File | string>()
    .test("fileType", "Only JPEG, PNG, JPG, WebP allowed", (value) => {
      if (!value || typeof value === "string") return true;
      return SUPPORTED_FORMATS.includes((value as File).type);
    })
    .test("fileSize", "Max file size is 5MB", (value) => {
      if (!value || typeof value === "string") return true;
      return (value as File).size <= MAX_FILE_SIZE;
    })
    .required("Image is required"),
});

export type SurveyShipFormValues = Yup.InferType<typeof surveyShipSchema>;
