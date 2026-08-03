import * as Yup from "yup";

export const newsEventsCategorySchema = Yup.object({
  nameEn: Yup.string().required("English name is required"),
  nameBn: Yup.string().optional(),
});

export type NewsEventsCategoryFormValues = Yup.InferType<
  typeof newsEventsCategorySchema
>;
