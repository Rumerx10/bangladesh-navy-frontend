import * as yup from "yup";

export const contactInfoSchema = yup.object({
  phones: yup
    .array()
    .of(yup.string().required())
    .min(1, "At least one phone number is required")
    .required(),
  emails: yup
    .array()
    .of(yup.string().email("Enter a valid email").required())
    .min(1, "At least one email is required")
    .required(),
  office_hour: yup.string().required("Office hour is required").trim(),
});

export type ContactInfoFormValues = yup.InferType<typeof contactInfoSchema>;
