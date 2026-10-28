import {
  CountryCode,
  isValidPhoneNumber,
  parsePhoneNumberFromString,
  validatePhoneNumberLength,
} from "libphonenumber-js/max";

/** Numbers typed without a "+" country code are read as Bangladeshi. */
export const DEFAULT_PHONE_COUNTRY: CountryCode = "BD";

const PHONE_CHARACTERS = /^\+?\d+$/;

const regionNames = new Intl.DisplayNames(["en"], { type: "region" });

/** Why a phone value ("01712345678", "+447911123456") is not a real number,
 * or `undefined` when it is valid. `label` names the field in the message —
 * pass "Fax number" for a fax. */
export const getPhoneError = (
  value: string,
  label = "Phone number"
): string | undefined => {
  if (!PHONE_CHARACTERS.test(value)) {
    return `${label} can only contain digits and a leading +`;
  }
  if (isValidPhoneNumber(value, DEFAULT_PHONE_COUNTRY)) return undefined;

  const length = validatePhoneNumberLength(value, DEFAULT_PHONE_COUNTRY);
  if (length === "TOO_SHORT") return `${label} is too short`;
  if (length === "TOO_LONG") return `${label} is too long`;
  const country = parsePhoneNumberFromString(
    value,
    DEFAULT_PHONE_COUNTRY
  )?.country;
  const noun = label.toLowerCase();
  return country
    ? `Enter a valid ${regionNames.of(country) ?? country} ${noun}`
    : `Enter a valid ${noun}`;
};
