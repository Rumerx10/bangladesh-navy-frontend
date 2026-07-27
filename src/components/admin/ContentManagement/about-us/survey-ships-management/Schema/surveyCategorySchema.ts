import * as Yup from "yup";

export const surveyCategorySchema = Yup.object({
  nameEn: Yup.string()
    .required("English name is required")
    .max(200, "Max 200 characters"),
  nameBn: Yup.string().max(200, "Max 200 characters").optional(),
  status: Yup.string()
    .oneOf(["ACTIVE", "INACTIVE"] as const)
    .required("Status is required"),
});

export type SurveyCategoryFormValues = Yup.InferType<typeof surveyCategorySchema>;
