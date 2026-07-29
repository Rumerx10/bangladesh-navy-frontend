import * as Yup from "yup";

const SUPPORTED_FORMATS = [
  "image/jpeg",
  "image/png",
  "image/jpg",
  "image/webp",
];
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export const galleryItemSchema = Yup.object({
  titleEn: Yup.string()
    .required("English title is required")
    .max(200, "Max 200 characters"),
  titleBn: Yup.string().max(200, "Max 200 characters").optional(),
  galleryCategoryId: Yup.string().required("Category is required"),
  position: Yup.number()
    .typeError("Position must be a number")
    .required("Position is required")
    .min(1, "Position must be at least 1")
    .integer("Position must be a whole number"),
  image: Yup.mixed<File | string>()
    .test("fileType", "Only JPEG, PNG, JPG, WebP allowed", (value) => {
      if (!value || typeof value === "string") return true;
      return SUPPORTED_FORMATS.includes((value as File).type);
    })
    .test("fileSize", "Max file size is 5MB", (value) => {
      if (!value || typeof value === "string") return true;
      return (value as File).size <= MAX_FILE_SIZE;
    })
    .required("Image is required"),
});

export type GalleryItemFormValues = Yup.InferType<typeof galleryItemSchema>;
