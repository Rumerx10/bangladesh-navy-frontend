import * as yup from "yup";

export const noticeSchema = yup.object({
  name: yup.string().required("Name is required").trim(),
  description: yup.string().trim().optional(),
  status: yup.string().oneOf(["ACTIVE", "INACTIVE"]).optional(),
});

export type NoticeFormValues = yup.InferType<typeof noticeSchema>;
