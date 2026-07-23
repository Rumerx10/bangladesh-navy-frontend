import * as yup from "yup";

export const heroManagementSchema = yup.object({
  titleEn: yup.string().required("English title is required").trim(),
  titleBn: yup.string().required("Bengali title is required").trim(),
  subTitleEn: yup.string().required("English subtitle is required").trim(),
  subTitleBn: yup.string().required("Bengali subtitle is required").trim(),
  descriptionEn: yup.string().required("English description is required").trim(),
  descriptionBn: yup.string().required("Bengali description is required").trim(),
  images: yup.array().of(yup.mixed<File | string>()).min(1, "At least one image is required"),
  status: yup.string().oneOf(["ACTIVE", "INACTIVE"]).required("Status is required"),
});

export type HeroManagementSchemaForm = yup.InferType<typeof heroManagementSchema>;