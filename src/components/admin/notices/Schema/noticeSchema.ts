import * as Yup from "yup";

const PDF_MAX_SIZE = 10 * 1024 * 1024;

export const noticeSchema = Yup.object({
  noticeNumber: Yup.string()
    .required("Notice number is required")
    .max(50, "Max 50 characters"),
  titleEn: Yup.string()
    .required("English title is required")
    .max(250, "Max 250 characters"),
  titleBn: Yup.string().max(250, "Max 250 characters").default(""),
  descriptionEn: Yup.string().default(""),
  descriptionBn: Yup.string().default(""),
  type: Yup.string<"PERMANENT" | "TEMPORARY" | "PRELIMINARY" | "GUN_FIRE">()
    .oneOf(["PERMANENT", "TEMPORARY", "PRELIMINARY", "GUN_FIRE"])
    .required("Notice type is required"),
  publishedAt: Yup.string().required("Published date is required"),
  status: Yup.string<"ACTIVE" | "INACTIVE">()
    .oneOf(["ACTIVE", "INACTIVE"])
    .default("ACTIVE"),
  // A string here is the URL of an already-uploaded PDF, kept as-is; a File is
  // a new upload; null/undefined means "no attachment".
  pdf: Yup.mixed<File | string>()
    .nullable()
    .transform((value) => (value === null ? undefined : value))
    .default(undefined)
    .test("fileType", "Only PDF files are allowed.", (value) => {
      if (!value || typeof value === "string") return true;
      return value instanceof File ? value.type === "application/pdf" : false;
    })
    .test("fileSize", "PDF must be smaller than 10MB.", (value) => {
      if (!value || typeof value === "string") return true;
      return value instanceof File ? value.size <= PDF_MAX_SIZE : true;
    }),
});

export type NoticeFormValues = Yup.InferType<typeof noticeSchema>;
