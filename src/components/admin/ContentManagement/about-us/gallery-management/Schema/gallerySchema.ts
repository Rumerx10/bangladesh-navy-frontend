import * as Yup from "yup";

const SUPPORTED_FORMATS = [
  "image/jpeg",
  "image/png",
  "image/jpg",
  "image/webp",
];
const MAX_FILE_SIZE = 5 * 1024 * 1024;

const imageFieldSchema = Yup.mixed<File | string>()
  .test("fileType", "Only JPEG, PNG, JPG, WebP allowed", (value) => {
    if (!value || typeof value === "string") return true;
    return SUPPORTED_FORMATS.includes((value as File).type);
  })
  .test("fileSize", "Max file size is 5MB", (value) => {
    if (!value || typeof value === "string") return true;
    return (value as File).size <= MAX_FILE_SIZE;
  })
  .required("Image is required");

export const gallerySchema = Yup.object({
  title: Yup.string()
    .required("Title is required")
    .max(200, "Max 200 characters"),
  subTitle: Yup.string()
    .required("Sub title is required")
    .max(300, "Max 300 characters"),
  categories: Yup.array()
    .of(Yup.string().required())
    .min(1, "At least one category is required")
    .required(),
  galleryItems: Yup.array()
    .of(
      Yup.object({
        image: imageFieldSchema,
        title: Yup.string()
          .required("Title is required")
          .max(200, "Max 200 characters"),
        category: Yup.string().required("Category is required"),
      })
    )
    .default([]),
});

export type GallerySchemaForm = Yup.InferType<typeof gallerySchema>;
