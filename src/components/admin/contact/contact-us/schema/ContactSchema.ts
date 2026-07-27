import * as yup from "yup";

export const contactSchema = yup.object({
  status: yup.string().oneOf(["PENDING", "IN_PROGRESS", "RESOLVED",]).required("Status is required"),
});

export type ContactFormValues = yup.InferType<typeof contactSchema>;