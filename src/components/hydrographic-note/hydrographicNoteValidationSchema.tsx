import * as yup from "yup";

export const hydrographicNoteValidationSchema = yup.object({
  date: yup.string().required("Date is required"),

  refNumber: yup.string().required("Reference number is required"),

  nameOfShip: yup.string().required("Name of ship or sender is required"),

  imoNumber: yup.string().ensure(),

  address: yup.string().required("Address is required"),

  email: yup
    .string()
    .email("Invalid email")
    .required("Email is required"),

  tel: yup.string().required("Telephone number is required"),

  fax: yup.string().ensure(),

  generalLocality: yup
    .string()
    .required("General locality is required"),

  subject: yup.string().required("Subject is required"),

  latitude: yup.string().required("Latitude is required"),

  longitude: yup.string().required("Longitude is required"),

  gps: yup.string().ensure(),

  datum: yup.string().ensure(),

  accuracy: yup.string().ensure(),

  bnChartsAffected: yup
    .string()
    .required("BN Charts affected is required"),

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

  detailsOfObservation: yup
    .string()
    .required("Details of observation is required"),

  nameOfObserver: yup
    .string()
    .required("Name of observer/reporter is required"),
});

export type HydrographicNoteFormType =
  yup.InferType<typeof hydrographicNoteValidationSchema>;