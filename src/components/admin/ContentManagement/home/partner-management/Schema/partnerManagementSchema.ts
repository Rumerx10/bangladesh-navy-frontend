import * as Yup from "yup";

const SUPPORTED_IMAGE_FORMATS = [
  "image/jpeg",
  "image/png",
  "image/jpg",
  "image/webp",
];

const IMAGE_SIZE = 5 * 1024 * 1024;

export const partnerManagementSchema = Yup.object({
  title: Yup.string()
    .required("Title is required")
    .max(100, "Title must be at most 100 characters"),
  description: Yup.string()
    .required("Description is required")
    .max(500, "Description must be at most 500 characters"),
  partners: Yup.array()
    .of(
      Yup.object({
        image: Yup.mixed<File | string>()
          .required("Partner image is required")
          .test(
            "validImage",
            "Must provide a valid image or image URL.",
            (value) => {
              if (typeof value === "string") return value.trim() !== "";
              if (value instanceof File)
                return SUPPORTED_IMAGE_FORMATS.includes(value.type);
              return false;
            }
          )
          .test("fileSize", "Image size must be less than 5MB.", (value) =>
            typeof value === "string"
              ? true
              : value instanceof File
                ? value.size <= IMAGE_SIZE
                : false
          ),
        name: Yup.string()
          .required("Partner name is required")
          .max(100, "Name must be at most 100 characters"),
        isActive: Yup.boolean().default(true),
      })
    )
    .default([]),
});

export type PartnerManagementSchemaForm = Yup.InferType<
  typeof partnerManagementSchema
>;
