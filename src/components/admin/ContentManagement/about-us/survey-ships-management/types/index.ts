export interface ISurveyCategory {
  id: string;
  nameEn: string;
  nameBn: string;
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;
  updatedAt: string;
}

export interface ISurveyShipCategory {
  id: string;
  nameEn: string;
  nameBn: string;
}

export interface ISurveyShip {
  id: string;
  nameEn: string;
  nameBn: string;
  descriptionEn: string;
  descriptionBn: string;
  length: string;
  beam: string;
  draft: string;
  crew: string;
  surveyEquipment: string[];
  image: string;
  /** Display order on the public page, ascending. Optional — may be unset. */
  position?: number | null;
  status: "ACTIVE" | "INACTIVE";
  surveyCategory: ISurveyShipCategory;
  createdAt?: string;
  updatedAt?: string;
}
