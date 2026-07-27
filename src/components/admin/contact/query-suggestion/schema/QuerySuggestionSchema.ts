import * as yup from "yup";

export const querySuggestionSchema = yup.object({
  status: yup
    .string()
    .oneOf(["PENDING", "IN_PROGRESS", "RESOLVED"])
    .required("Status is required"),
});

export type QuerySuggestionFormValues = yup.InferType<typeof querySuggestionSchema>;
