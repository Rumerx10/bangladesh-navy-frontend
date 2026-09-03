import * as Yup from "yup";

export const alumniMemberSchema = Yup.object({
  batchId: Yup.string().required("Batch is required"),
  rankAndName: Yup.string()
    .required("Rank & name is required")
    .max(250, "Max 250 characters"),
  pNo: Yup.string().max(20, "Max 20 characters").default(""),
  organization: Yup.string().max(100, "Max 100 characters").default(""),
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

export type AlumniMemberFormValues = Yup.InferType<typeof alumniMemberSchema>;
