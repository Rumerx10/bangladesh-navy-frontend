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
  title: Yup.string().required("Title is required").max(200),
  // User only types the number after the fixed "P" prefix (e.g. "105" -> "P105").
  code: Yup.string()
    .required("Publication code is required")
    .matches(/^[0-9]+$/, "Publication code must be numeric")
    .max(20, "Publication code is too long"),
  date: Yup.string().required("Date is required"),
});

export type PublicationFormValues = Yup.InferType<typeof publicationSchema>;
