/**
 * Content of the public `/about/vision-mission` page — the section heading plus
 * the mission and vision cards.
 *
 * Served from the singleton `/mission-vision` record: `GET` returns the one row
 * (`findFirst`), `POST` upserts it. There is no PATCH — posting again
 * overwrites. Per the API, `subTitle*` and every `*Bn` field are optional.
 */

export interface IMissionVision {
  id?: string;
  titleEn: string;
  titleBn?: string | null;
  subTitleEn?: string | null;
  subTitleBn?: string | null;
  missionTitleEn: string;
  missionTitleBn?: string | null;
  missionDescriptionEn: string;
  missionDescriptionBn?: string | null;
  visionTitleEn: string;
  visionTitleBn?: string | null;
  visionDescriptionEn: string;
  visionDescriptionBn?: string | null;
  createdAt?: string;
  updatedAt?: string;
}
