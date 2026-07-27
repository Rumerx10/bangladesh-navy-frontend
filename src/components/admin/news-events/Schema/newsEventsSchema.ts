import * as Yup from "yup";

const IMAGE_MAX_SIZE = 5 * 1024 * 1024;
const SUPPORTED_IMAGE_FORMATS = ["image/jpeg", "image/png", "image/webp"];

export const newsEventsSchema = Yup.object({
  titleEn: Yup.string().required("English title is required"),
  titleBn: Yup.string().default(""),
  contentEn: Yup.string().required("English content is required"),
  contentBn: Yup.string().default(""),
  newsCategoryId: Yup.string().required("Category is required"),
  image: Yup.mixed<File | string>()
    .nullable()
    .transform((value) => (value === null ? undefined : value))
    .default(undefined)
    .test("fileType", "Only JPEG, PNG, and WebP files are allowed.", (value) => {
      if (!value || typeof value === "string") return true;
      return value instanceof File ? SUPPORTED_IMAGE_FORMATS.includes(value.type) : false;
    })
    .test("fileSize", "Image size must be less than 5MB.", (value) => {
      if (!value || typeof value === "string") return true;
      return value instanceof File ? value.size <= IMAGE_MAX_SIZE : true;
    }),
});

export type NewsEventsFormValues = Yup.InferType<typeof newsEventsSchema>;
