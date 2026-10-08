import * as Yup from "yup";

/** Bangla mirrors every English field but is never required. */
const optionalText = (max?: number) => {
  const field = Yup.string().trim().default("");
  return max ? field.max(max, `Max ${max} characters`) : field;
};

const requiredList = (message: string) =>
  Yup.array()
    .of(Yup.string().trim().required("This entry cannot be empty"))
    .min(1, message)
    .required();

const optionalList = () =>
  Yup.array()
    .of(Yup.string().trim().required("This entry cannot be empty"))
    .default([]);

/**
 * Mirrors `UpsertAboutInstituteDto`. Required: `titleEn`, `aboutParagraphsEn`,
 * `visionTitleEn`, `visionDescriptionEn`, `missionTitleEn`, `missionPointsEn`,
 * `trainingOverviewTitleEn` and `trainingOverviewParagraphsEn`. The sub title
 * and every Bangla field are optional.
 */
export const instituteSchema = Yup.object({
  titleEn: Yup.string()
    .trim()
    .required("Title (English) is required")
    .max(200, "Max 200 characters"),
  titleBn: optionalText(200),
  subTitleEn: optionalText(300),
  subTitleBn: optionalText(300),

  aboutParagraphsEn: requiredList("Add at least one paragraph"),
  aboutParagraphsBn: optionalList(),

  visionTitleEn: Yup.string()
    .trim()
    .required("Vision title (English) is required")
    .max(200, "Max 200 characters"),
  visionTitleBn: optionalText(200),
  visionDescriptionEn: Yup.string()
    .trim()
    .required("Vision description (English) is required"),
  visionDescriptionBn: optionalText(),

  missionTitleEn: Yup.string()
    .trim()
    .required("Mission title (English) is required")
    .max(200, "Max 200 characters"),
  missionTitleBn: optionalText(200),
  missionPointsEn: requiredList("Add at least one mission point"),
  missionPointsBn: optionalList(),

  trainingOverviewTitleEn: Yup.string()
    .trim()
    .required("Training overview title (English) is required")
    .max(200, "Max 200 characters"),
  trainingOverviewTitleBn: optionalText(200),
  trainingOverviewParagraphsEn: requiredList("Add at least one paragraph"),
  trainingOverviewParagraphsBn: optionalList(),
});

export type InstituteSchemaForm = Yup.InferType<typeof instituteSchema>;
