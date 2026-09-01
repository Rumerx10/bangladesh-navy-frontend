import * as Yup from "yup";

const SUPPORTED_FORMATS = [
  "image/jpeg",
  "image/png",
  "image/jpg",
  "image/webp",
];
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export const publicationSchema = Yup.object({
  image: Yup.mixed<File | string>()
    .required("Cover image is required")
    .test("fileType", "Only JPEG, PNG, JPG, WebP allowed", (value) => {
      if (!value || typeof value === "string") return true;
      return SUPPORTED_FORMATS.includes((value as File).type);
    })
    .test("fileSize", "Max file size is 5MB", (value) => {
      if (!value || typeof value === "string") return true;
      return (value as File).size <= MAX_FILE_SIZE;
    }),
  titleEn: Yup.string().required("Title (English) is required").max(200),
  titleBn: Yup.string().max(200).notRequired(),
  code: Yup.string().max(50, "Publication code is too long").notRequired(),
  date: Yup.string().notRequired(),
  status: Yup.string<"ACTIVE" | "INACTIVE">()
    .oneOf(["ACTIVE", "INACTIVE"])
    .notRequired(),
});

export type PublicationFormValues = Yup.InferType<typeof publicationSchema>;
