import * as yup from "yup";

export const courseEnrollSchema = yup.object({
  name: yup.string().required("Name is required"),
  contactNumber: yup
    .string()
    .required("Contact number is required")
    .min(7, "Please enter a valid contact number"),
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  organization: yup.string().required("Organization is required"),
  designation: yup.string().required("Designation is required"),
  selectedCourse: yup.string().required("Please select a course"),
  reason: yup
    .string()
    .required("Reason for applying is required")
    .min(10, "Please provide at least 10 characters"),
  remarks: yup.string().default(""),
});

export type CourseEnrollFormType = yup.InferType<typeof courseEnrollSchema>;
