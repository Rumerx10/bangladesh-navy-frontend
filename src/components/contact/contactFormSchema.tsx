import * as yup from "yup";
import { getPhoneError } from "@/src/utils/phoneValidation";

export const NAME_MAX_LENGTH = 100;

export const contactValidationSchema = yup.object({
  name: yup
    .string()
    .trim()
    .required("Name is required")
    .max(NAME_MAX_LENGTH, `Name cannot exceed ${NAME_MAX_LENGTH} characters`),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email")
    .trim(),
  phone: yup
    .string()
    .trim()
    .required("Phone number is required")
    .test("phone", function (value) {
      const message = value ? getPhoneError(value) : undefined;
      return message ? this.createError({ message }) : true;
    }),
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
