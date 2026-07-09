import * as Yup from "yup";

const SUPPORTED_IMAGE_FORMATS = [
  "image/jpeg",
  "image/png",
  "image/jpg",
  "image/webp",
];

const IMAGE_SIZE = 5 * 1024 * 1024;

const imageFieldSchema = Yup.mixed<File | string>()
  .required("Image is required")
  .test(
    "fileType",
    "Unsupported image format. Allowed: JPG, PNG, WEBP.",
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
  );

export const historyManagementSchema = Yup.object({
  title: Yup.string()
    .required("Title is required")
    .max(100, "Title must be at most 100 characters"),
  subTitle: Yup.string()
    .required("Sub title is required")
    .max(200, "Sub title must be at most 200 characters"),
  image: imageFieldSchema,
  description: Yup.string()
    .required("Description is required")
    .max(1000, "Description must be at most 1000 characters"),
  keyMilestones: Yup.array()
    .of(
      Yup.object({
        year: Yup.string()
          .required("Year is required")
          .max(20, "Year must be at most 20 characters"),
        description: Yup.string()
          .required("Description is required")
          .test(
            "wordCount",
            "Description must be at most 100 words.",
            (value) => {
              if (!value) return false;
              return value.trim().split(/\s+/).filter(Boolean).length <= 100;
            }
          ),
      })
    )
    .default([]),
  timelineItems: Yup.array()
    .of(
      Yup.object({
        id: Yup.number().default(0),
        period: Yup.string()
          .required("Period is required")
          .max(50, "Period must be at most 50 characters"),
        title: Yup.string()
          .required("Title is required")
          .max(200, "Title must be at most 200 characters"),
        icon: imageFieldSchema,
        summary: Yup.string()
          .required("Summary is required")
          .max(500, "Summary must be at most 500 characters"),
        highlights: Yup.array().of(Yup.string().required()).default([]),
        note: Yup.string()
          .required("Note is required")
          .max(500, "Note must be at most 500 characters"),
      })
    )
    .default([]),
});

export type HistoryManagementSchemaForm = Yup.InferType<
  typeof historyManagementSchema
>;
