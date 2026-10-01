import * as Yup from "yup";

const extraFieldSchema = Yup.object({
  key: Yup.string()
    .trim()
    .required("Label is required")
    .max(120, "Max 120 characters"),
  value: Yup.string()
    .trim()
    .required("Value is required")
    .max(500, "Max 500 characters"),
});

export const howToCollectSchema = Yup.object({
  icon: Yup.string().required("Pick an icon").max(80, "Max 80 characters"),
  stepName: Yup.string()
    .trim()
    .required("Step name is required")
    .max(255, "Max 255 characters"),
  title: Yup.string()
    .trim()
    .required("Title is required")
    .max(255, "Max 255 characters"),
  description: Yup.string().trim().required("Description is required"),
  // Optional on the API, but kept non-nullable here so `useFieldArray` gets a
  // concrete array type — an empty list is sent as `[]`.
  extraFields: Yup.array().of(extraFieldSchema).required(),
  serial: Yup.number()
    .transform((value, original) =>
      original === "" || original === null ? undefined : value
    )
    .typeError("Serial must be a number")
    .integer("Serial must be a whole number")
    .min(1, "Serial must be at least 1")
    .required("Serial is required"),
  status: Yup.string()
    .oneOf(["ACTIVE", "INACTIVE"] as const)
    .required("Status is required"),
});

export type HowToCollectFormValues = Yup.InferType<typeof howToCollectSchema>;
