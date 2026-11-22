import * as yup from "yup";
import { getPhoneError } from "@/src/utils/phoneValidation";
import { EMAIL_MAX_LENGTH, EMAIL_PATTERN } from "@/src/utils/emailValidation";
import { getCoordinateError } from "./coordinates";

/** Character limits per field — also passed to the inputs as `maxLength`, so
 * the browser stops typing at the same point the schema would reject it. */
export const HYDROGRAPHIC_NOTE_MAX_LENGTH = {
  refNumber: 50,
  nameOfShip: 150,
  imoNumber: 11, // "IMO 9074729"
  address: 300,
  email: EMAIL_MAX_LENGTH,
  generalLocality: 200,
  subject: 200,
  latitude: 30,
  longitude: 30,
  gps: 100,
  datum: 50,
  accuracy: 50,
  bnChartsAffected: 200,
  edition: 50,
  latestNoticesToMariners: 100,
  replacementCopyOfChartNo: 50,
  encsAffected: 200,
  latestUpdateApplied: 50,
  modelAndAgeOfECDIS: 150,
  publicationsAffected: 300,
  dateOfLatestSupplement: 200,
  detailsOfObservation: 5000,
  nameOfObserver: 100,
} as const;

export const DETAILS_OF_OBSERVATION_MIN_LENGTH = 20;

const LIMIT = HYDROGRAPHIC_NOTE_MAX_LENGTH;

/** Today as `yyyy-mm-dd` in the observer's own time zone — the format a
 * native date input uses, so the two compare as plain strings. */
export const todayIsoDate = () => {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
};

// Rejects entries made only of punctuation ("---", "...").
const HAS_LETTER_OR_DIGIT = /[\p{L}\p{N}]/u;
const REF_NUMBER_PATTERN = /^[A-Za-z0-9][A-Za-z0-9/\-_. ]*$/;
// Letters plus what names and ranks use: "Lt Cdr. A. Rahman (H)", "O'Brien".
const PERSON_NAME_PATTERN = /^[\p{L}\p{M}][\p{L}\p{M}\s.,'’()-]*$/u;
const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

const tooLong = (label: string, max: number) =>
  `${label} cannot exceed ${max} characters`;

const requiredText = (label: string, max: number) =>
  yup
    .string()
    .trim()
    .required(`${label} is required`)
    .max(max, tooLong(label, max))
    .matches(HAS_LETTER_OR_DIGIT, `Enter a valid ${label.toLowerCase()}`);

const optionalText = (label: string, max: number) =>
  yup.string().trim().ensure().max(max, tooLong(label, max));

/** IMO ship numbers are 7 digits; the last is a check digit (the first six
 * weighted 7…2, summed, last digit of the sum). */
const isValidImoNumber = (value: string) => {
  const digits = value.replace(/^IMO\s*/i, "");
  if (!/^\d{7}$/.test(digits)) return false;
  const sum = [...digits.slice(0, 6)].reduce(
    (total, digit, index) => total + Number(digit) * (7 - index),
    0
  );
  return sum % 10 === Number(digits[6]);
};

const coordinate = (axis: "latitude" | "longitude", label: string) =>
  yup
    .string()
    .trim()
    .required(`${label} is required`)
    .max(LIMIT[axis], tooLong(label, LIMIT[axis]))
    .test(axis, function (value) {
      const message = value ? getCoordinateError(value, axis) : undefined;
      return message ? this.createError({ message }) : true;
    });

const phone = (label: string) =>
  yup
    .string()
    .trim()
    .test("phone", function (value) {
      const message = value ? getPhoneError(value, label) : undefined;
      return message ? this.createError({ message }) : true;
    });

// Required fields mirror what the API enforces (and the non-optional fields
// of `IHydrographicNote`) — relaxing them here only moves the failure to the
// server, where it surfaces as a generic "validation failed". Everything else
// stays optional because observers often only have partial information.
export const hydrographicNoteValidationSchema = yup.object({
  // ── Sender information ──
  date: yup
    .string()
    .trim()
    .required("Date is required")
    .matches(ISO_DATE_PATTERN, "Enter a valid date")
    .test(
      "valid-date",
      "Enter a valid date",
      (value) => !value || !Number.isNaN(Date.parse(value))
    )
    .test(
      "not-future",
      "Date cannot be in the future",
      (value) => !value || value <= todayIsoDate()
    ),

  refNumber: requiredText("Reference number", LIMIT.refNumber).matches(
    REF_NUMBER_PATTERN,
    "Reference number can only contain letters, digits, spaces and / - _ ."
  ),

  nameOfShip: requiredText("Name of ship or sender", LIMIT.nameOfShip),

  imoNumber: optionalText("IMO number", LIMIT.imoNumber).test(
    "imo",
    "Enter a valid 7-digit IMO number, e.g. IMO 9074729",
    (value) => !value || isValidImoNumber(value)
  ),

  address: requiredText("Address", LIMIT.address).min(
    10,
    "Enter the full address"
  ),

  email: yup
    .string()
    .trim()
    .required("Email is required")
    .max(LIMIT.email, tooLong("Email", LIMIT.email))
    .email("Enter a valid email address")
    .matches(EMAIL_PATTERN, "Enter a valid email address"),

  tel: phone("Telephone number").required("Telephone number is required"),

  fax: phone("Fax number").ensure(),

  // ── Locality & subject ──
  generalLocality: requiredText("General locality", LIMIT.generalLocality),

  subject: requiredText("Subject", LIMIT.subject).min(
    3,
    "Subject must be at least 3 characters"
  ),

  // ── Position ──
  latitude: coordinate("latitude", "Latitude"),

  longitude: coordinate("longitude", "Longitude"),

  gps: optionalText("GPS details", LIMIT.gps),

  datum: optionalText("Datum", LIMIT.datum),

  accuracy: optionalText("Accuracy", LIMIT.accuracy),

  // ── BN charts ──
  bnChartsAffected: requiredText("BN charts affected", LIMIT.bnChartsAffected),

  edition: optionalText("Edition", LIMIT.edition),

  latestNoticesToMariners: optionalText(
    "Latest notices to mariners",
    LIMIT.latestNoticesToMariners
  ),

  replacementCopyOfChartNo: optionalText(
    "Replacement chart number",
    LIMIT.replacementCopyOfChartNo
  ),

  replacementRequired: yup
    .mixed<"required" | "not-required">()
    .oneOf(["required", "not-required"] as const, "Select a valid option"),

  // ── ENCs & ECDIS ──
  encsAffected: optionalText("ENCs affected", LIMIT.encsAffected),

  latestUpdateApplied: optionalText(
    "Latest update applied",
    LIMIT.latestUpdateApplied
  ),

  modelAndAgeOfECDIS: optionalText(
    "Model and age of ECDIS",
    LIMIT.modelAndAgeOfECDIS
  ),

  // ── Publications ──
  publicationsAffected: optionalText(
    "Publications affected",
    LIMIT.publicationsAffected
  ),

  dateOfLatestSupplement: optionalText(
    "Latest supplement details",
    LIMIT.dateOfLatestSupplement
  ),

  // ── Observation details ──
  detailsOfObservation: requiredText(
    "Details of observation",
    LIMIT.detailsOfObservation
  ).min(
    DETAILS_OF_OBSERVATION_MIN_LENGTH,
    `Describe the observation in at least ${DETAILS_OF_OBSERVATION_MIN_LENGTH} characters`
  ),

  nameOfObserver: requiredText(
    "Name of observer / reporter",
    LIMIT.nameOfObserver
  ).matches(
    PERSON_NAME_PATTERN,
    "Name can only contain letters, spaces and . , ' ( ) -"
  ),
});

export type HydrographicNoteFormType = yup.InferType<
  typeof hydrographicNoteValidationSchema
>;
