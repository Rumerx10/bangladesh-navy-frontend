import * as yup from "yup";

export const noticeSchema = yup.object({
  name: yup.string().required("Name is required").trim(),
  description: yup.string().required("Description is required").trim(),
  status: yup.string().oneOf(["ACTIVE", "INACTIVE"]).required("Status is required"),
});

export type NoticeFormValues = yup.InferType<typeof noticeSchema>;