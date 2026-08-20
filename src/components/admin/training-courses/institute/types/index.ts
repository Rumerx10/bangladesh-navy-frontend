export interface IInstituteManagement {
  id?: string;
  title: string;
  subTitle: string;
  /** Long-form "About the institute" prose — one entry per rendered paragraph. */
  aboutParagraphs: string[];
  visionTitle: string;
  visionDescription: string;
  missionTitle: string;
  /** Bullet list rendered under the mission card. */
  missionPoints: string[];
  trainingOverviewTitle: string;
  /** One entry per rendered paragraph in the training overview block. */
  trainingOverviewParagraphs: string[];
}
