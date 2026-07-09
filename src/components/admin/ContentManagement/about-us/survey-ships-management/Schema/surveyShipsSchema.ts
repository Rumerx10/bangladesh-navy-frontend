import * as Yup from "yup";

const SUPPORTED_FORMATS = [
  "image/jpeg",
  "image/png",
  "image/jpg",
  "image/webp",
];
const MAX_FILE_SIZE = 5 * 1024 * 1024;

const imageFieldSchema = Yup.mixed<File | string>()
  .test("fileType", "Only JPEG, PNG, JPG, WebP allowed", (value) => {
    if (!value || typeof value === "string") return true;
    return SUPPORTED_FORMATS.includes((value as File).type);
  })
  .test("fileSize", "Max file size is 5MB", (value) => {
    if (!value || typeof value === "string") return true;
    return (value as File).size <= MAX_FILE_SIZE;
  })
  .required("Ship image is required");

const basicInformationSchema = Yup.object({
  length: Yup.string().required("Length is required"),
  beam: Yup.string().required("Beam is required"),
  draft: Yup.string().required("Draft is required"),
  crew: Yup.string().required("Crew is required"),
});

const surveyShipSchema = Yup.object({
  image: imageFieldSchema,
  isActive: Yup.boolean().required().default(true),
  name: Yup.string()
    .required("Ship name is required")
    .max(200, "Max 200 characters"),
  type: Yup.string()
    .required("Ship type is required")
    .max(200, "Max 200 characters"),
  description: Yup.string().required("Description is required"),
  basicInformation: basicInformationSchema.required(),
  surveyEquipment: Yup.array().of(Yup.string().required()).default([]),
  detailsLink: Yup.string()
    .test("url-or-empty", "Must be a valid URL", (value) => {
      if (!value || value.trim() === "") return true;
      try {
        new URL(value);
        return true;
      } catch {
        return false;
      }
    })
    .default(""),
});

export const surveyShipsSchema = Yup.object({
  title: Yup.string()
    .required("Title is required")
    .max(200, "Max 200 characters"),
  subTitle: Yup.string()
    .required("Sub title is required")
    .max(300, "Max 300 characters"),
  shipTypes: Yup.array()
    .of(Yup.string().required())
    .min(1, "At least one ship type is required")
    .required(),
  surveyShips: Yup.array()
    .of(surveyShipSchema)
    .required()
    .min(1, "At least one survey ship is required"),
});

export type SurveyShipsSchemaForm = Yup.InferType<typeof surveyShipsSchema>;
