import * as Yup from "yup";

export const biographyManagementSchema = Yup.object({
  title: Yup.string()
    .required("Title is required")
    .max(100, "Title must be at most 100 characters"),
  name: Yup.string()
    .required("Name is required")
    .max(100, "Name must be at most 100 characters"),
  designation: Yup.string()
    .required("Designation is required")
    .max(100, "Designation must be at most 100 characters"),
  description: Yup.string()
    .required("Description is required")
    .max(1000, "Description must be at most 1000 characters"),
});

export type BiographyManagementSchemaForm = Yup.InferType<
  typeof biographyManagementSchema
>;
