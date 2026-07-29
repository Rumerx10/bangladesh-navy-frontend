import * as Yup from "yup";

export const galleryCategorySchema = Yup.object({
  nameEn: Yup.string()
    .required("English name is required")
    .max(200, "Max 200 characters"),
  nameBn: Yup.string().max(200, "Max 200 characters").optional(),
  status: Yup.string()
    .oneOf(["ACTIVE", "INACTIVE"] as const)
    .required("Status is required"),
});

export type GalleryCategoryFormValues = Yup.InferType<
  typeof galleryCategorySchema
>;
