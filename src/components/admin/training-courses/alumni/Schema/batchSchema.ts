import * as Yup from "yup";

export const batchSchema = Yup.object({
  courseId: Yup.string().required("Course is required"),
  name: Yup.string()
    .required("Batch name is required")
    .max(150, "Max 150 characters"),
  startDate: Yup.string().default(""),
  endDate: Yup.string()
    .default("")
    .test(
      "after-start",
      "End date must be on or after the start date",
      function (value) {
        const { startDate } = this.parent as { startDate?: string };
        if (!value || !startDate) return true;
        return new Date(value).getTime() >= new Date(startDate).getTime();
      }
    ),
  serial: Yup.number()
    .typeError("Serial must be a number")
    .integer("Serial must be a whole number")
    .min(1, "Serial starts at 1")
    .required("Serial is required"),
  status: Yup.string<"ACTIVE" | "INACTIVE">()
    .oneOf(["ACTIVE", "INACTIVE"])
    .default("ACTIVE"),
});

export type BatchFormValues = Yup.InferType<typeof batchSchema>;
