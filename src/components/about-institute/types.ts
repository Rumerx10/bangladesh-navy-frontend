/**
 * Content of the public `/training-courses` page — the "About BN Hydrographic
 * Institute" block, its vision and mission cards, and the training overview.
 *
 * Served from the singleton `/about-institute` record: `GET` returns the one row
 * (`findFirst`), `POST` upserts it. There is no PATCH — posting again
 * overwrites. Per the API every `*Bn` field and the sub title are optional.
 */

export interface IAboutInstitute {
  id?: string;
  titleEn: string;
  titleBn?: string | null;
  subTitleEn?: string | null;
  subTitleBn?: string | null;
  /** Long-form "about" prose — one entry per rendered paragraph. */
  aboutParagraphsEn: string[];
  aboutParagraphsBn?: string[] | null;
  visionTitleEn: string;
  visionTitleBn?: string | null;
  visionDescriptionEn: string;
  visionDescriptionBn?: string | null;
  missionTitleEn: string;
  missionTitleBn?: string | null;
  /** Bullet list rendered in the mission card. */
  missionPointsEn: string[];
  missionPointsBn?: string[] | null;
  trainingOverviewTitleEn: string;
  trainingOverviewTitleBn?: string | null;
  /** One entry per rendered paragraph in the training overview block. */
  trainingOverviewParagraphsEn: string[];
  trainingOverviewParagraphsBn?: string[] | null;
  createdAt?: string;
  updatedAt?: string;
}
