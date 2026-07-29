import * as yup from "yup";

export const contactValidationSchema = yup.object({
  name: yup.string().required("Name is required").trim(),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email")
    .trim(),
  phone: yup.string().required("Phone number is required").trim(),
  message: yup
    .string()
    .required("Message is required")
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message cannot exceed 1000 characters")
    .trim(),
  contactType: yup
    .string()
    .oneOf(["CONTACT_INFORMATION", "QUERY_SUGGESTION"])
    .required("Contact type is required"),
});

export type ContactFormType = yup.InferType<typeof contactValidationSchema>;
