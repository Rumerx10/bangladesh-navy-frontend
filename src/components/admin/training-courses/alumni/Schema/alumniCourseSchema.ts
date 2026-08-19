import * as Yup from "yup";

export const alumniCourseSchema = Yup.object({
  nameEn: Yup.string()
    .required("English name is required")
    .max(150, "Max 150 characters"),
  nameBn: Yup.string().max(150, "Max 150 characters").default(""),
  status: Yup.string<"ACTIVE" | "INACTIVE">()
    .oneOf(["ACTIVE", "INACTIVE"])
    .default("ACTIVE"),
});

export type AlumniCourseFormValues = Yup.InferType<typeof alumniCourseSchema>;
