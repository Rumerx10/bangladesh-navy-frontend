import * as Yup from "yup";

const SUPPORTED_ICON_FORMATS = ["image/svg+xml", "image/png"];
const ICON_MAX_SIZE = 2 * 1024 * 1024;

export const categorySchema = Yup.object({
  nameBn: Yup.string().required("Bangla name is required"),
  nameEn: Yup.string().default(""),
  descriptionEn: Yup.string().default(""),
  descriptionBn: Yup.string().default(""),
  icon: Yup.mixed<File | string>()
    .nullable()
    .transform((value) => (value === null ? undefined : value))
    .default(undefined)
    .test("fileType", "Only SVG and PNG files are allowed.", (value) => {
      if (!value || typeof value === "string") return true;
      if (value instanceof File) {
        return SUPPORTED_ICON_FORMATS.includes(value.type);
      }
      return false;
    })
    .test("fileSize", "Icon size must be less than 2MB.", (value) => {
      if (!value || typeof value === "string") return true;
      return value instanceof File ? value.size <= ICON_MAX_SIZE : true;
    }),
  status: Yup.string()
    .oneOf(["ACTIVE", "INACTIVE"])
    .default("ACTIVE")
    .required("Status is required"),
});

export type CategoryFormValues = Yup.InferType<typeof categorySchema>;
