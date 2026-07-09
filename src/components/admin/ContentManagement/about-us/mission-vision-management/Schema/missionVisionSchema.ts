import * as Yup from "yup";

const sectionSchema = Yup.object({
  title: Yup.string()
    .required("Title is required")
    .max(200, "Max 200 characters"),
  description: Yup.string().required("Description is required"),
});

export const missionVisionSchema = Yup.object({
  title: Yup.string()
    .required("Title is required")
    .max(200, "Max 200 characters"),
  subTitle: Yup.string()
    .required("Sub title is required")
    .max(300, "Max 300 characters"),
  vision: sectionSchema.required(),
  mission: sectionSchema.required(),
});

export type MissionVisionSchemaForm = Yup.InferType<typeof missionVisionSchema>;
