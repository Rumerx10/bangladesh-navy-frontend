import * as yup from "yup";

export const biographyManagementSchema = yup.object({
  nameEn: yup.string().required("English name is required").trim(),
  nameBn: yup.string().required("Bengali name is required").trim(),
  designationEn: yup
    .string()
    .required("English designation is required")
    .trim(),
  designationBn: yup.string().nullable().optional(),
  messageEn: yup.string().required("English message is required").trim(),
  messageBn: yup.string().required("Bengali message is required").trim(),
  image: yup.mixed<File | string>().optional(),
  status: yup
    .string()
    .oneOf(["ACTIVE", "INACTIVE"])
    .required("Status is required"),
});

export type BiographyManagementSchemaForm = yup.InferType<
  typeof biographyManagementSchema
>;
