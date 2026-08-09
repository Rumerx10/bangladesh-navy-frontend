import * as Yup from "yup";

const SUPPORTED_FORMATS = [
  "image/jpeg",
  "image/png",
  "image/jpg",
  "image/webp",
];
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export const partnerSchema = Yup.object({
  image: Yup.mixed<File | string>()
    .required("Partner logo is required")
    .test("fileType", "Only JPEG, PNG, JPG, WebP allowed", (value) => {
      if (!value || typeof value === "string") return true;
      return SUPPORTED_FORMATS.includes((value as File).type);
    })
    .test("fileSize", "Max file size is 5MB", (value) => {
      if (!value || typeof value === "string") return true;
      return (value as File).size <= MAX_FILE_SIZE;
    }),
  link: Yup.string().url("Enter a valid URL").notRequired(),
  status: Yup.string<"ACTIVE" | "INACTIVE">()
    .oneOf(["ACTIVE", "INACTIVE"])
    .notRequired(),
});

export type PartnerFormValues = Yup.InferType<typeof partnerSchema>;
