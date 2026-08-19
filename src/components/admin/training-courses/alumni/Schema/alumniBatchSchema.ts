import * as Yup from "yup";

/**
 * One roster row. `serial` is not part of the form — it is derived from the row
 * order when the batch is submitted, so reordering never leaves gaps.
 */
export const alumniMemberSchema = Yup.object({
  pNo: Yup.string().max(20, "Max 20 characters").default(""),
  rankName: Yup.string()
    .required("Rank & name is required")
    .max(250, "Max 250 characters"),
  organization: Yup.string().max(100, "Max 100 characters").default(""),
  remarks: Yup.string().max(150, "Max 150 characters").default(""),
});

export const alumniBatchSchema = Yup.object({
  alumniCourseId: Yup.string().required("Course is required"),
  batchNo: Yup.number()
    .typeError("Batch number must be a number")
    .integer("Batch number must be a whole number")
    .min(1, "Batch number starts at 1")
    .required("Batch number is required"),
  titleEn: Yup.string()
    .required("English title is required")
    .max(200, "Max 200 characters"),
  titleBn: Yup.string().max(200, "Max 200 characters").default(""),
  startDate: Yup.string().required("Start date is required"),
  endDate: Yup.string()
    .required("End date is required")
    .test(
      "after-start",
      "End date must be on or after the start date",
      function (value) {
        const { startDate } = this.parent as { startDate?: string };
        if (!value || !startDate) return true;
        return new Date(value).getTime() >= new Date(startDate).getTime();
      }
    ),
  descriptionEn: Yup.string().default(""),
  status: Yup.string<"ACTIVE" | "INACTIVE">()
    .oneOf(["ACTIVE", "INACTIVE"])
    .default("ACTIVE"),
  members: Yup.array()
    .of(alumniMemberSchema)
    .min(1, "Add at least one participant")
    .required("Add at least one participant"),
});

export type AlumniBatchFormValues = Yup.InferType<typeof alumniBatchSchema>;
export type AlumniMemberFormValues = Yup.InferType<typeof alumniMemberSchema>;
