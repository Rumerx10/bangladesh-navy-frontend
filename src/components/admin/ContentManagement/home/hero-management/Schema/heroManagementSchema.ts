import * as yup from "yup";

export const heroManagementSchema = yup.object({
  titleEn: yup.string().required("English title is required").trim(),
  titleBn: yup.string().trim().optional(),
  subTitleEn: yup.string().required("English subtitle is required").trim(),
  subTitleBn: yup.string().trim().optional(),
  descriptionEn: yup
    .string()
    .required("English description is required")
    .trim(),
  descriptionBn: yup.string().trim().optional(),
  images: yup
    .array()
    .of(yup.mixed<File | string>())
    .min(1, "At least one image is required"),
  status: yup
    .string()
    .oneOf(["ACTIVE", "INACTIVE"])
    .required("Status is required"),
});

export type HeroManagementSchemaForm = yup.InferType<
  typeof heroManagementSchema
>;
