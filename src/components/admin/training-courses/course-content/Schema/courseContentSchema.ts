import * as Yup from "yup";

/** Bangla mirrors every English field but is never required. */
const optionalBn = (max?: number) => {
  const field = Yup.string().trim().default("");
  return max ? field.max(max, `Max ${max} characters`) : field;
};

const courseSectionSchema = Yup.object({
  titleEn: Yup.string()
    .trim()
    .required("Section title (English) is required")
    .max(200, "Max 200 characters"),
  titleBn: optionalBn(200),
  descriptionEn: Yup.string()
    .trim()
    .required("Section description (English) is required"),
  descriptionBn: optionalBn(),
});

/**
 * Narrative copy only — mirrors the `/course-info` POST body. The statistics
 * table is a separate record set, managed on Training & Courses → Courses.
 */
export const courseContentSchema = Yup.object({
  titleEn: Yup.string()
    .trim()
    .required("Title (English) is required")
    .max(200, "Max 200 characters"),
  titleBn: optionalBn(200),
  introductionEn: Yup.string()
    .trim()
    .required("Introduction (English) is required"),
  introductionBn: optionalBn(),
  courseSequenceEn: Yup.array()
    .of(Yup.string().trim().required("Sequence item cannot be empty"))
    .min(1, "Add at least one sequence item")
    .required(),
  courseSequenceBn: Yup.array()
    .of(Yup.string().trim().required("Sequence item cannot be empty"))
    .default([]),
  sections: Yup.array()
    .of(courseSectionSchema)
    .min(1, "Add at least one course description")
    .required(),
});

export type CourseContentFormValues = Yup.InferType<typeof courseContentSchema>;
