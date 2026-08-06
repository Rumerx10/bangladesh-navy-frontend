import * as Yup from "yup";

export const importantLinkSchema = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .max(150, "Max 150 characters"),
  link: Yup.string().required("Link is required").url("Enter a valid URL"),
  status: Yup.string<"ACTIVE" | "INACTIVE">()
    .oneOf(["ACTIVE", "INACTIVE"])
    .required("Status is required"),
});

export type ImportantLinkFormValues = Yup.InferType<typeof importantLinkSchema>;
