import * as Yup from "yup";

export const instituteSchema = Yup.object({
  title: Yup.string()
    .required("Title is required")
    .max(200, "Max 200 characters"),
  subTitle: Yup.string()
    .required("Sub title is required")
    .max(300, "Max 300 characters"),
  aboutParagraphs: Yup.array()
    .of(Yup.string().trim().required("Paragraph cannot be empty"))
    .min(1, "Add at least one paragraph")
    .required(),
  visionTitle: Yup.string()
    .required("Vision title is required")
    .max(200, "Max 200 characters"),
  visionDescription: Yup.string().required("Vision description is required"),
  missionTitle: Yup.string()
    .required("Mission title is required")
    .max(200, "Max 200 characters"),
  missionPoints: Yup.array()
    .of(Yup.string().trim().required("Mission point cannot be empty"))
    .min(1, "Add at least one mission point")
    .required(),
  trainingOverviewTitle: Yup.string()
    .required("Training overview title is required")
    .max(200, "Max 200 characters"),
  trainingOverviewParagraphs: Yup.array()
    .of(Yup.string().trim().required("Paragraph cannot be empty"))
    .min(1, "Add at least one paragraph")
    .required(),
});

export type InstituteSchemaForm = Yup.InferType<typeof instituteSchema>;
