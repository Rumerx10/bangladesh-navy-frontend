import * as Yup from "yup";

export const categorySchema = Yup.object({
  nameEn: Yup.string()
    .required("English name is required")
    .max(200, "Max 200 characters"),
  nameBn: Yup.string().max(200, "Max 200 characters").optional(),
  icon: Yup.string().default(""),
  descriptionEn: Yup.string().required("English description is required"),
  descriptionBn: Yup.string().optional(),
  status: Yup.string<"ACTIVE" | "INACTIVE">()
    .oneOf(["ACTIVE", "INACTIVE"])
    .required("Status is required"),
});

export type CategoryFormValues = Yup.InferType<typeof categorySchema>;
