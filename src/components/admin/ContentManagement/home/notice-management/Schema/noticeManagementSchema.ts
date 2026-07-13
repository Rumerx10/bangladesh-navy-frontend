import * as Yup from "yup";

export const noticeManagementSchema = Yup.object({
  notices: Yup.array()
    .of(
      Yup.object({
        message: Yup.string().required("Notice message is required"),
        isActive: Yup.boolean().default(true),
      })
    )
    .default([]),
});

export type NoticeManagementSchemaForm = Yup.InferType<
  typeof noticeManagementSchema
>;
