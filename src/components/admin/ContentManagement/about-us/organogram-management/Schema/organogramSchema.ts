import * as Yup from "yup";

export const organogramSchema = Yup.object({
  title: Yup.string()
    .required("Title is required")
    .max(200, "Max 200 characters"),
  parentId: Yup.string().nullable().optional(),
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

export type OrganogramFormValues = Yup.InferType<typeof organogramSchema>;
