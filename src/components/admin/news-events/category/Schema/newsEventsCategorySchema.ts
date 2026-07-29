import * as Yup from "yup";

export const newsEventsCategorySchema = Yup.object({
  nameEn: Yup.string().required("English name is required"),
  nameBn: Yup.string().required("Bangla name is required"),
});

export type NewsEventsCategoryFormValues = Yup.InferType<
  typeof newsEventsCategorySchema
>;
