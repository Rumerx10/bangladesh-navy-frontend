import * as Yup from "yup";

const courseSectionSchema = Yup.object({
  title: Yup.string()
    .trim()
    .required("Section title is required")
    .max(200, "Max 200 characters"),
  description: Yup.string().trim().required("Section description is required"),
});

/**
 * Narrative copy only. The statistics table is a separate record set, managed
 * on Training & Courses → Alumni → Courses and served from `/courses`.
 */
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
});

export type CoursesSchemaForm = Yup.InferType<typeof coursesSchema>;
