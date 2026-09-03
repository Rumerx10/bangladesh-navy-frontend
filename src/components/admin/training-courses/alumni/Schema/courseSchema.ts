import * as Yup from "yup";

/**
 * `<input type="number">` hands back "" when the field is cleared, and Yup would
 * otherwise cast that to NaN — treat it as "no figure recorded" instead, which
 * is what the API stores as `null`.
 */
const optionalCount = (label: string) =>
  Yup.number()
    .transform((value, original) =>
      original === "" || original === null ? undefined : value
    )
    .typeError(`${label} must be a number`)
    .integer(`${label} must be a whole number`)
    .min(0, `${label} cannot be negative`);

export const courseSchema = Yup.object({
  name: Yup.string()
    .required("Course name is required")
    .max(200, "Max 200 characters"),
  batchConducted: optionalCount("Batch conducted"),
  duration: Yup.string().max(50, "Max 50 characters").default(""),
  bn: optionalCount("BN"),
  otherMaritimeOrg: optionalCount("Other maritime org"),
  overseas: optionalCount("Overseas"),
  totalTrainees: optionalCount("Total trainees"),
  remarks: Yup.string().max(150, "Max 150 characters").default(""),
  serial: Yup.number()
    .typeError("Serial must be a number")
    .integer("Serial must be a whole number")
    .min(1, "Serial starts at 1")
    .required("Serial is required"),
  status: Yup.string<"ACTIVE" | "INACTIVE">()
    .oneOf(["ACTIVE", "INACTIVE"])
    .default("ACTIVE"),
});

export type CourseFormValues = Yup.InferType<typeof courseSchema>;
