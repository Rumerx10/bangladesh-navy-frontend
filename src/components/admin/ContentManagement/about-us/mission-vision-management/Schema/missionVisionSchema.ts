import * as Yup from "yup";

/** Bangla mirrors every English field but is never required. */
const optionalText = (max?: number) => {
  const field = Yup.string().trim().default("");
  return max ? field.max(max, `Max ${max} characters`) : field;
};

/**
 * Mirrors `UpsertMissionVisionDto`: `titleEn`, `missionTitleEn`,
 * `missionDescriptionEn`, `visionTitleEn` and `visionDescriptionEn` are
 * required; the sub title and all Bangla fields are optional.
 */
export const missionVisionSchema = Yup.object({
  titleEn: Yup.string()
    .trim()
    .required("Title (English) is required")
    .max(200, "Max 200 characters"),
  titleBn: optionalText(200),
  subTitleEn: optionalText(300),
  subTitleBn: optionalText(300),

  missionTitleEn: Yup.string()
    .trim()
    .required("Mission title (English) is required")
    .max(200, "Max 200 characters"),
  missionTitleBn: optionalText(200),
  missionDescriptionEn: Yup.string()
    .trim()
    .required("Mission description (English) is required"),
  missionDescriptionBn: optionalText(),

  visionTitleEn: Yup.string()
    .trim()
    .required("Vision title (English) is required")
    .max(200, "Max 200 characters"),
  visionTitleBn: optionalText(200),
  visionDescriptionEn: Yup.string()
    .trim()
    .required("Vision description (English) is required"),
  visionDescriptionBn: optionalText(),
});

export type MissionVisionSchemaForm = Yup.InferType<typeof missionVisionSchema>;
