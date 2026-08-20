import * as Yup from "yup";

const courseSectionSchema = Yup.object({
  title: Yup.string()
    .trim()
    .required("Section title is required")
    .max(200, "Max 200 characters"),
  description: Yup.string().trim().required("Section description is required"),
});

/**
 * Every statistics cell is a string — the table mixes counts ("19"), spans
 * ("44 weeks") and placeholders ("—"), so it is never treated as a number.
 */
const courseStatisticSchema = Yup.object({
  course: Yup.string().trim().required("Course name is required"),
  conducted: Yup.string().trim().default(""),
  duration: Yup.string().trim().default(""),
  bn: Yup.string().trim().default(""),
  otherMaritimeOrg: Yup.string().trim().default(""),
  overseas: Yup.string().trim().default(""),
  totalTrainees: Yup.string().trim().default(""),
  remarks: Yup.string().trim().default(""),
});

export const coursesSchema = Yup.object({
  title: Yup.string()
    .required("Title is required")
    .max(200, "Max 200 characters"),
  introduction: Yup.string().required("Introduction is required"),
  courseSequence: Yup.array()
    .of(Yup.string().trim().required("Sequence item cannot be empty"))
    .min(1, "Add at least one sequence item")
    .required(),
  sections: Yup.array()
    .of(courseSectionSchema)
    .min(1, "Add at least one course description")
    .required(),
  statisticsTitle: Yup.string()
    .required("Statistics title is required")
    .max(200, "Max 200 characters"),
  statistics: Yup.array().of(courseStatisticSchema).default([]),
});

export type CoursesSchemaForm = Yup.InferType<typeof coursesSchema>;
