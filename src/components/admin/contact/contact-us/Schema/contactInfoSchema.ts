import * as yup from "yup";
import { getPhoneError } from "@/src/utils/phoneValidation";
import { EMAIL_MAX_LENGTH, EMAIL_PATTERN } from "@/src/utils/emailValidation";

export const OFFICE_ADDRESS_MIN_LENGTH = 10;
export const OFFICE_ADDRESS_MAX_LENGTH = 300;

const phoneItemSchema = yup
  .string()
  .trim()
  .required("Phone number can't be empty")
  .test("phone", function (value) {
    const message = value ? getPhoneError(value) : undefined;
    return message ? this.createError({ message }) : true;
  });

const emailItemSchema = yup
  .string()
  .trim()
  .required("Email can't be empty")
  .max(EMAIL_MAX_LENGTH, `Email cannot exceed ${EMAIL_MAX_LENGTH} characters`)
  .email("Enter a valid email address")
  .matches(EMAIL_PATTERN, "Enter a valid email address");

/** Runs one entry through its schema — used to check a value before it is
 * added to the list, so a bad entry never reaches the form state. */
const firstError = (schema: yup.StringSchema, value: string) => {
  try {
    schema.validateSync(value);
    return undefined;
  } catch (err) {
    return err instanceof yup.ValidationError ? err.message : "Invalid value";
  }
};

export const validatePhoneItem = (value: string) =>
  firstError(phoneItemSchema, value);
export const validateEmailItem = (value: string) =>
  firstError(emailItemSchema, value);

const hasNoDuplicates = (values?: (string | undefined)[]) => {
  const normalised = (values ?? [])
    .map((value) => value?.trim().toLowerCase())
    .filter(Boolean);
  return new Set(normalised).size === normalised.length;
};

export const contactInfoSchema = yup.object({
  phones: yup
    .array()
    .of(phoneItemSchema)
    .min(1, "At least one phone number is required")
    .test("unique", "Each phone number must be different", hasNoDuplicates)
    .required(),
  emails: yup
    .array()
    .of(emailItemSchema)
    .min(1, "At least one email is required")
    .test("unique", "Each email address must be different", hasNoDuplicates)
    .required(),
  // Stored under `office_hour` by the API, but it holds the office address —
  // that is how both the admin preview and the public contact page label it.
  office_hour: yup
    .string()
    .trim()
    .required("Office address is required")
    .min(OFFICE_ADDRESS_MIN_LENGTH, "Enter the full office address")
    .max(
      OFFICE_ADDRESS_MAX_LENGTH,
      `Office address cannot exceed ${OFFICE_ADDRESS_MAX_LENGTH} characters`
    ),
});

export type ContactInfoFormValues = yup.InferType<typeof contactInfoSchema>;
