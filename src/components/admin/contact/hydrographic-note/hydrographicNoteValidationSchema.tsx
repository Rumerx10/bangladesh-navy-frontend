import * as yup from "yup";

// Every field on the Hydrographic Note is optional — observers often only
// have partial information to report, so nothing is blocked at submit time.
// `email` still validates its format when a value is entered (yup's email
// test skips empty strings).
export const hydrographicNoteValidationSchema = yup.object({
  date: yup.string().ensure(),

  refNumber: yup.string().ensure(),

  nameOfShip: yup.string().ensure(),

  imoNumber: yup.string().ensure(),

  address: yup.string().ensure(),

  email: yup.string().email("Invalid email").ensure(),

  tel: yup.string().ensure(),

  fax: yup.string().ensure(),

  generalLocality: yup.string().ensure(),

  subject: yup.string().ensure(),

  latitude: yup.string().ensure(),

  longitude: yup.string().ensure(),

  gps: yup.string().ensure(),

  datum: yup.string().ensure(),

  accuracy: yup.string().ensure(),

  bnChartsAffected: yup.string().ensure(),

  edition: yup.string().ensure(),

  latestNoticesToMariners: yup.string().ensure(),

  replacementCopyOfChartNo: yup.string().ensure(),

  replacementRequired: yup
    .mixed<"required" | "not-required">()
    .oneOf(["required", "not-required"] as const),

  encsAffected: yup.string().ensure(),

  latestUpdateApplied: yup.string().ensure(),

  modelAndAgeOfECDIS: yup.string().ensure(),

  publicationsAffected: yup.string().ensure(),

  dateOfLatestSupplement: yup.string().ensure(),

  detailsOfObservation: yup.string().ensure(),

  nameOfObserver: yup.string().ensure(),
});

export type HydrographicNoteFormType = yup.InferType<
  typeof hydrographicNoteValidationSchema
>;
